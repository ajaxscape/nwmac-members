import { getMemberById } from '#repos/member.repository.js'
import defaultBankReference from '#nunjucks-filters/default-bank-reference.js'
import { FEES } from '#constants/fees.js'

export default async ({ memberId, currentRenewalYear }) => {
  const { memberSubscriptions, membershipNumber } =
    await getMemberById(memberId)
  if (!memberSubscriptions?.length) {
    return null
  }
  const memberSubscription =
    memberSubscriptions?.length &&
    memberSubscriptions.find(
      ({ subscriptionYear }) => subscriptionYear === currentRenewalYear
    )
  const {
    amountPaid = 0,
    confirmed = false,
    confirmedWithBmfa = false,
    confirmedWithCaa = false,
    paymentMethod = '',
    paymentReference = defaultBankReference(membershipNumber)
  } = memberSubscription || {}
  const fees = {}
  const feeSubTotals = {
    bmfa: 0,
    club: 0,
    caa: 0
  }
  const totalDue = memberSubscription
    ? FEES.reduce((acc, cur) => {
        const value = memberSubscription[cur]
        if (value) {
          fees[cur] = value
          switch (cur.substring(0, 3)) {
            case 'clu':
              feeSubTotals.club += value
              break
            case 'bmf':
              feeSubTotals.bmfa += value
              break
            case 'caa':
              feeSubTotals.caa += value
              break
          }
        }
        return acc + value
      }, 0)
    : 0
  fees.total = totalDue
  return {
    amountPaid: amountPaid / 100,
    totalDue: totalDue / 100,
    confirmed,
    confirmedWithBmfa,
    confirmedWithCaa,
    fees,
    feeSubTotals,
    paymentMethod,
    paymentReference
  }
}

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
    paymentMethod = '',
    paymentReference = defaultBankReference(membershipNumber)
  } = memberSubscription || {}
  const fees = {}
  const totalDue = memberSubscription
    ? FEES.reduce((acc, cur) => {
        const value = memberSubscription[cur]
        if (value) {
          fees[cur] = value
        }
        return acc + value
      }, 0)
    : 0
  fees.total = totalDue
  return {
    amountPaid: amountPaid / 100,
    totalDue: totalDue / 100,
    confirmed,
    fees,
    paymentMethod,
    paymentReference
  }
}

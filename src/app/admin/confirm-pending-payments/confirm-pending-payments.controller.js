import { validationResult } from 'express-validator'
import { getMembers } from '#repos/member.repository.js'
import { FEES } from '#constants/fees.js'
import formatName from '#nunjucks-filters/format-name.js'

async function getMembersWithPayments(subscriptionYear) {
  return (await getMembers()).map((member) => {
    const memberName = formatName(member)
    const { id: memberId, membershipNumber, memberSubscriptions } = member
    const memberSubscription = memberSubscriptions.find(
      (memberSubscription) =>
        memberSubscription.subscriptionYear === subscriptionYear
    )
    const { amountPaid = 0, confirmed = false } = memberSubscription || {}
    const totalAmount = memberSubscription
      ? FEES.reduce((acc, cur) => {
          return acc + memberSubscription[cur]
        }, 0)
      : 0
    return {
      memberId,
      membershipNumber,
      memberName,
      amountPaid,
      totalAmount,
      confirmed
    }
  })
}

export const viewPaymentsConfirmed = async (req, res) => {
  const { data } = res.locals
  const membersWithPayments = await getMembersWithPayments(
    req.session.nextRenewalYear
  )
  res.render('pages/admin/confirm-pending-payments', {
    locals: res.locals,
    membersWithPayments,
    data
  })
}

export const postPaymentsConfirmed = async (req, res) => {
  const { data } = res.locals
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/admin/confirm-pending-payments', {
      locals: res.locals,
      data,
      errors: errors.array()
    })
  }
}

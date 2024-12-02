import { validationResult } from 'express-validator'
import { getMembers } from '#repos/member.repository.js'
import { FEES } from '#constants/fees.js'
import formatName from '#nunjucks-filters/format-name.js'
import renewalYear from '#utils/current-renewal-year.js'

async function getMembersWithPayments(subscriptionYear) {
  return (await getMembers())
    .sort((a, b) => a.membershipNumber - b.membershipNumber)
    .map((member) => {
      const memberName = formatName(member)
      const { id: memberId, membershipNumber, memberSubscriptions } = member
      const memberSubscription = memberSubscriptions.find(
        (memberSubscription) =>
          memberSubscription.subscriptionYear === subscriptionYear
      )
      const {
        amountPaid = 0,
        confirmed = false,
        paymentReference = '',
        paymentMethod
      } = memberSubscription || {}
      const totalDue = memberSubscription
        ? FEES.reduce((acc, cur) => {
            return acc + memberSubscription[cur]
          }, 0)
        : 0
      return {
        memberId,
        membershipNumber,
        memberName,
        amountPaid,
        paymentMethod,
        paymentReference,
        totalDue,
        confirmed
      }
    })
}

export const viewPaymentsConfirmed = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const { data } = res.locals
  const membersWithPayments = await getMembersWithPayments(currentRenewalYear)
  res.render('pages/admin/confirm-pending-payments', {
    locals: res.locals,
    membersPendingPayments: membersWithPayments.filter(
      ({ paymentMethod }) => paymentMethod
    ),
    remainingMembers: membersWithPayments.filter(
      ({ paymentMethod }) => !paymentMethod
    ),
    data,
    currentRenewalYear
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

import { getMembers } from '#repos/member.repository.js'
import formatName from '#nunjucks-filters/format-name.js'
import renewalYear from '#utils/current-renewal-year.js'
import buildMemberSubscription from '#utils/build-member-subscription.js'

async function getMembersWithPayments(subscriptionYear) {
  return await Promise.all(
    (await getMembers())
      .sort((a, b) => a.membershipNumber - b.membershipNumber)
      .map(async (member) => {
        const memberName = formatName(member)
        const { id: memberId, membershipNumber } = member
        const {
          amountPaid = 0,
          totalDue = 0,
          confirmed = false,
          paymentReference = '',
          paymentMethod
        } = (await buildMemberSubscription({
          memberId,
          currentRenewalYear: subscriptionYear
        })) || {}
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
  )
}

export const viewPaymentsConfirmed = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const { data } = res.locals
  const membersWithPayments = await getMembersWithPayments(currentRenewalYear)

  res.render('pages/admin/confirm-pending-payments', {
    locals: res.locals,
    membersPendingPayments: membersWithPayments.filter(
      ({ paymentMethod, confirmed }) => paymentMethod && !confirmed
    ),
    membersConfirmedPaid: membersWithPayments.filter(
      ({ confirmed }) => confirmed
    ),
    remainingMembers: membersWithPayments.filter(
      ({ paymentMethod }) => !paymentMethod
    ),
    data,
    currentRenewalYear
  })
}

export const postPaymentsConfirmed = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const membersWithPayments = await getMembersWithPayments(currentRenewalYear)

  console.log(JSON.stringify({ data: req.body, membersWithPayments }, null, 2))

  res.redirect('confirm-pending-payments')
}

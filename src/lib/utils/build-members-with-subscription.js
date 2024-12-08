import { getMembers } from '#repos/member.repository.js'
import formatName from '#nunjucks-filters/format-name.js'
import buildMemberSubscription from '#utils/build-member-subscription.js'

export default async (subscriptionYear, memberIds) => {
  return await Promise.all(
    (await getMembers())
      .filter((member) => !memberIds || memberIds.includes(member.id))
      .sort((a, b) => a.membershipNumber - b.membershipNumber)
      .map(async (member) => {
        const memberName = formatName(member)
        const {
          id: memberId,
          membershipNumber,
          bmfaNumber,
          operatorId,
          email
        } = member
        const {
          amountPaid = 0,
          totalDue = 0,
          fees = {},
          feeSubTotals = {},
          confirmed = false,
          confirmedWithBmfa = false,
          confirmedWithCaa = false,
          paymentReference = '',
          paymentMethod,
          paymentNotificationSent = true
        } = (await buildMemberSubscription({
          memberId,
          currentRenewalYear: subscriptionYear
        })) || { paymentNotificationSent: false }
        return {
          memberId,
          membershipNumber,
          memberName,
          bmfaNumber,
          operatorId,
          email,
          paymentNotificationSent,
          amountPaid: amountPaid * 100,
          paymentMethod,
          paymentReference,
          totalDue: totalDue * 100,
          fees,
          feeSubTotals,
          confirmed,
          confirmedWithBmfa,
          confirmedWithCaa
        }
      })
  )
}

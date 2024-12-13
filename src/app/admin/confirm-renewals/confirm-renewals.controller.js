import renewalYear from '#utils/current-renewal-year.js'
import buildMembersWithSubscription from '#utils/build-members-with-subscription.js'
import { upsertMemberSubscription } from '#repos/member-subscription.repository.js'
import logger from '../../../logger/logger.js'

export const viewConfirmRenewals = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const { data } = res.locals
  const membersWithPayments = (
    await buildMembersWithSubscription(currentRenewalYear)
  ).filter(({ confirmed }) => confirmed)

  const bmfaPayments = membersWithPayments.filter(({ feeSubTotals }) => {
    return !!feeSubTotals.bmfa
  })

  const caaPayments = membersWithPayments.filter(({ feeSubTotals }) => {
    return !!feeSubTotals.caa
  })

  const clubPayments = membersWithPayments.filter(({ feeSubTotals }) => {
    return !!feeSubTotals.club
  })

  res.render('pages/admin/confirm-renewals', {
    locals: res.locals,
    bmfaPayments,
    caaPayments,
    clubPayments,
    data,
    currentRenewalYear
  })
}

export const postConfirmRenewals = async (req, res) => {
  const { data } = res.locals
  const memberSubscriptions = []
  Object.keys(data).forEach((key) => {
    if (
      key.startsWith('confirmedWithBmfa-') ||
      key.startsWith('confirmedWithCaa-')
    ) {
      const memberId = Number(key.split('-')[1])
      const member = memberSubscriptions.find(
        (member) => member.memberId === memberId
      ) || { memberId }
      if (key.startsWith('confirmedWithBmfa-')) {
        member.confirmedWithBmfa = true
      } else {
        member.confirmedWithCaa = true
      }
      if (!member.subscriptionYear) {
        member.subscriptionYear = data.currentRenewalYear
        memberSubscriptions.push(member)
      }
    }
  })
  try {
    await Promise.all(
      memberSubscriptions.map((data) => upsertMemberSubscription(data))
    )
  } catch (error) {
    logger.error(
      { error },
      `Failed to update some member subscriptions to database`
    )
    return res
      .status(500)
      .render('pages/error/unhandled-exception.njk', { error })
  }

  res.redirect('confirm-renewals')
}

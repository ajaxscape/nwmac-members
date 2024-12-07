import renewalYear from '#utils/current-renewal-year.js'
import buildMembersWithSubscription from '#utils/build-members-with-subscription.js'

export const viewPaymentsBreakdown = async (req, res) => {
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

  res.render('pages/admin/payments-breakdown', {
    locals: res.locals,
    bmfaPayments,
    caaPayments,
    clubPayments,
    data,
    currentRenewalYear
  })
}

import currentRenewalYear from '#utils/current-renewal-year.js'
import { getSubscription } from '#repos/subscription.repository.js'
import { getMemberById } from '#repos/member.repository.js'

export default async (memberId) => {
  const renewalYear = currentRenewalYear()
  const { available = false } = (await getSubscription(renewalYear)) || {}
  const { memberSubscriptions = [] } = (await getMemberById(memberId)) || {}
  const {
    subscriptionAvailable = available,
    amountPaid = 0,
    confirmed = false
  } = memberSubscriptions.find(
    ({ subscriptionYear }) => subscriptionYear === renewalYear
  ) || { subscriptionAvailable: false }
  const subscriptionPaymentRequired = subscriptionAvailable && !amountPaid
  const subscriptionPaymentPending =
    subscriptionAvailable && !!amountPaid && !confirmed
  const subscriptionPaymentConfirmed =
    subscriptionAvailable && !!amountPaid && !!confirmed

  return {
    subscriptionAvailable,
    subscriptionPaymentRequired,
    subscriptionPaymentPending,
    subscriptionPaymentConfirmed,
    subscriptionPaymentMade:
      subscriptionPaymentPending || subscriptionPaymentConfirmed
  }
}

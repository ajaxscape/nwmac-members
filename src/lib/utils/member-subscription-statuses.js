import currentRenewalYear from '#utils/current-renewal-year.js'
import { getSubscription } from '#repos/subscription.repository.js'
import { getMemberById } from '#repos/member.repository.js'

export default async (memberId) => {
  const renewalYear = currentRenewalYear()
  const { available = false } = (await getSubscription(renewalYear)) || {}
  const { memberSubscriptions = [] } = (await getMemberById(memberId)) || {}
  const {
    subscriptionExists = available,
    amountPaid = 0,
    confirmed = false
  } = memberSubscriptions.find(
    ({ subscriptionYear }) => subscriptionYear === renewalYear
  ) || { subscriptionExists: false }
  const subscriptionPaymentRequired = subscriptionExists && !amountPaid
  const subscriptionPaymentPending =
    subscriptionExists && !!amountPaid && !confirmed
  const subscriptionPaymentConfirmed =
    subscriptionExists && !!amountPaid && !!confirmed

  return {
    subscriptionAvailable: subscriptionExists || available,
    subscriptionPaymentRequired,
    subscriptionPaymentPending,
    subscriptionPaymentConfirmed,
    subscriptionPaymentMade:
      subscriptionPaymentPending || subscriptionPaymentConfirmed
  }
}

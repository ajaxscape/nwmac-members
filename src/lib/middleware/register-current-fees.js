import { getSubscription } from '#repos/subscription.repository.js'
import currentRenewalYear from '#utils/current-renewal-year.js'

export default async (req, res, next) => {
  req.session.fees = await getSubscription(currentRenewalYear())
  next()
}

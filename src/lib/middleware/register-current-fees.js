import { getLatestSubscription } from '#repos/subscription.repository.js'

export default async (req, res, next) => {
  // req.session.fees = await getSubscription(currentRenewalYear())
  req.session.fees = await getLatestSubscription()
  next()
}

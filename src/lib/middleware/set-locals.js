import currentRenewalYear from '#utils/current-renewal-year.js'
import { getSubscription } from '#repos/subscription.repository.js'

export default async (req, res, next) => {
  switch (req.method.toLowerCase()) {
    case 'get':
      res.locals.data = { ...res.locals.data, ...req.session }
      break
    case 'post':
      res.locals.data = {
        ...req.body,
        isSecretary: req.session.isSecretary,
        isTreasurer: req.session.isTreasurer
      }
      break
    default:
      break
  }
  const { operatorId, flyerId, achievements } = res.locals.data
  if (operatorId) {
    res.locals.data.operatorId = operatorId.toUpperCase()
  }
  if (flyerId) {
    res.locals.data.flyerId = flyerId.toUpperCase()
  }
  if (achievements) {
    res.locals.data.achievements = [achievements].flat()
  }
  res.locals.data.currentRenewalYear = currentRenewalYear()
  const { available = false } =
    (await getSubscription(res.locals.data.currentRenewalYear)) || {}
  res.locals.feesAvailable = available
  next()
}

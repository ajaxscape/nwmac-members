import mapToErrorSummary from './map-to-error-summary.js'
import mapAchievementsToItems from './map-achievements-to-items.js'
import formatName from './format-name.js'
import formatAddress from './format-address.js'
import formatBmfaMembership from './format-bmfa-membership.js'
import formatPhoneNumbers from './format-phone-numbers.js'
import formatFlyerId from './format-flyer-id.js'
import formatOperatorId from './format-operator-id.js'

const filters = {
  mapToErrorSummary,
  mapAchievementsToItems,
  formatName,
  formatAddress,
  formatBmfaMembership,
  formatPhoneNumbers,
  formatFlyerId,
  formatOperatorId
}

export default (env) => {
  Object.keys(filters).forEach((filterName) => {
    env.addFilter(filterName, filters[filterName])
  })
}

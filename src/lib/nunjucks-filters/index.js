import mapToErrorSummary from './map-to-error-summary.js'
import mapAchievementsToItems from './map-achievements-to-items.js'
import formatFullName from './format-full-name.js'
import formatName from './format-name.js'
import formatAddress from './format-address.js'
import formatBmfaMembership from './format-bmfa-membership.js'
import formatPhoneNumbers from './format-phone-numbers.js'
import formatFlyerId from './format-flyer-id.js'
import formatOperatorId from './format-operator-id.js'
import formatAmount from '#nunjucks-filters/format-amount.js'
import defaultBankReference from '#nunjucks-filters/default-bank-reference.js'
import mapBmfaTable from '#nunjucks-filters/map-bmfa-table.js'
import mapCaaTable from '#nunjucks-filters/map-caa-table.js'

const filters = {
  mapToErrorSummary,
  mapAchievementsToItems,
  mapBmfaTable,
  mapCaaTable,
  formatFullName,
  formatName,
  formatAddress,
  formatBmfaMembership,
  formatPhoneNumbers,
  formatFlyerId,
  formatOperatorId,
  formatAmount,
  defaultBankReference
}

export default (env) => {
  Object.keys(filters).forEach((filterName) => {
    env.addFilter(filterName, filters[filterName])
  })
}

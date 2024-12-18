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
import mapBmfaPaymentsTable from '#nunjucks-filters/map-bmfa-payments-table.js'
import mapCaaPaymentsTable from '#nunjucks-filters/map-caa-payments-table.js'
import mapBmfaRenewalTable from '#nunjucks-filters/map-bmfa-renewal-table.js'
import mapCaaRenewalTable from '#nunjucks-filters/map-caa-renewal-table.js'
import formatDate from '#nunjucks-filters/format-date.js'
import cacheBust from '#nunjucks-filters/cache-bust.js'

const filters = {
  mapToErrorSummary,
  mapAchievementsToItems,
  mapBmfaPaymentsTable,
  mapCaaPaymentsTable,
  mapBmfaRenewalTable,
  mapCaaRenewalTable,
  cacheBust,
  formatFullName,
  formatName,
  formatAddress,
  formatBmfaMembership,
  formatPhoneNumbers,
  formatFlyerId,
  formatOperatorId,
  formatAmount,
  formatDate,
  defaultBankReference
}

export default (env) => {
  Object.keys(filters).forEach((filterName) => {
    env.addFilter(filterName, filters[filterName])
  })
}

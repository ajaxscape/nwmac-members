import formatAmount from '#nunjucks-filters/format-amount.js'

export default (members) => {
  let total = 0
  const rows = members.map(({ memberName, operatorId, feeSubTotals }) => {
    total += feeSubTotals.caa
    return [
      { text: memberName },
      { text: 'GBR-OP-' + operatorId },
      {
        text: formatAmount(feeSubTotals.caa, '£'),
        classes: 'govuk-!-text-align-right  nwmac-amount-column'
      }
    ]
  })
  rows.push([
    { text: '' },
    { text: 'Total', classes: 'govuk-!-font-weight-bold' },
    {
      text: formatAmount(total, '£'),
      classes:
        'govuk-!-font-weight-bold govuk-!-text-align-right  nwmac-amount-column'
    }
  ])
  return rows
}

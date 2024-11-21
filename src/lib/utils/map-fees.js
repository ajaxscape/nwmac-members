import formatAmount from '#nunjucks-filters/format-amount.js'

export default function mapFees(req, subscriptions) {
  const { clubFee = 0, bmfaFee = 0, caaReg = 0 } = subscriptions
  const items = [{ key: 'NWMAC', value: formatAmount(clubFee) }]
  if (req.session.bmfaThroughClub) {
    items.push({ key: 'BMFA', value: formatAmount(bmfaFee) })
    items.push({ key: 'CAA', value: formatAmount(caaReg) })
  }
  return items
}

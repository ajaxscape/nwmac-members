import formatAmount from '#nunjucks-filters/format-amount.js'

export default function mapFees(req, subscriptions) {
  const { clubFee, bmfaFee, caaReg } = subscriptions
  const items = [{ key: 'NWMAC', value: formatAmount(clubFee) }]
  if (req.session.bmfaThroughClub) {
    items.push({ key: 'BMFA', value: formatAmount(bmfaFee) })
    items.push({ key: 'CAA', value: formatAmount(caaReg) })
  }
  return items
}

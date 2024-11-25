import formatAmount from '#nunjucks-filters/format-amount.js'

export default function mapFees(req, subscriptions) {
  const { clubSeniorFee, bmfaSeniorFee, caaOperatorRegistration } =
    subscriptions
  const items = [{ key: 'NWMAC', value: formatAmount(clubSeniorFee) }]
  if (req.session.bmfaThroughClub) {
    items.push({ key: 'BMFA', value: formatAmount(bmfaSeniorFee) })
    items.push({ key: 'CAA', value: formatAmount(caaOperatorRegistration) })
  }
  return items
}

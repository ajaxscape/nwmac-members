import config from '#config/config.js'
import defaultBankReference from '#nunjucks-filters/default-bank-reference.js'
export default function mapBankDetails(req) {
  const { sortcode, account, name } = config.bankDetails
  return [
    { key: 'Sortcode', value: sortcode },
    { key: 'Account number', value: account },
    { key: 'Account name', value: name },
    {
      key: 'Reference',
      value: defaultBankReference(req.session.membershipNumber)
    }
  ]
}

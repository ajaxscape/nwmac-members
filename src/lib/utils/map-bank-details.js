import config from '#config/config.js'
export default function mapBankDetails(req) {
  const { sortcode, account, name } = config.bankDetails
  return [
    { key: 'Sortcode', value: sortcode },
    { key: 'Account number', value: account },
    { key: 'Account name', value: name },
    {
      key: 'Reference',
      value: `NWMAC${req.session.membershipNumber}`
    }
  ]
}

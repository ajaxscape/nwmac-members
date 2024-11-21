import formatName from '#nunjucks-filters/format-name.js'
import formatAddress from '#nunjucks-filters/format-address.js'
import formatPhoneNumbers from '#nunjucks-filters/format-phone-numbers.js'
import formatBmfaMembership
  from '#nunjucks-filters/format-bmfa-membership.js'
import formatOperatorId from '#nunjucks-filters/format-operator-id.js'
import formatFlyerId from '#nunjucks-filters/format-flyer-id.js'

export default function mapAnswers(req) {
  return [
    { key: 'Membership number', value: req.session.membershipNumber },
    { key: 'Name', value: formatName(req.session) },
    {
      key: 'Address',
      value: formatAddress(req.session).replace(/\n/g, ',<br>')
    },
    {
      key: 'Phone numbers',
      value: formatPhoneNumbers(req.session).replace(/\n/g, ',<br>')
    },
    { key: 'Membership type', value: req.session.membershipType },
    { key: 'Age group', value: req.session.ageGroup },
    { key: 'BMFA Membership', value: formatBmfaMembership(req.session) },
    { key: 'Operator ID', value: formatOperatorId(req.session) },
    { key: 'Flyer ID', value: formatFlyerId(req.session) }
  ]
}
import sendEmail from '#utils/send-email.js'
import nunjucks from 'nunjucks'
import formatName from '#nunjucks-filters/format-name.js'
import { redirectUrl } from '#utils/redirect-url.js'
import formatAddress from '#nunjucks-filters/format-address.js'
import formatPhoneNumbers from '#nunjucks-filters/format-phone-numbers.js'
import formatBmfaMembership from '#nunjucks-filters/format-bmfa-membership.js'
import formatOperatorId from '#nunjucks-filters/format-operator-id.js'
import formatFlyerId from '#nunjucks-filters/format-flyer-id.js'

export const sendRenewalConfirmationEmail = async (req, res) => {
  const recipient = { email: req.session.email, name: formatName(req.session) }
  const answers = [
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
  const emailTemplate = nunjucks.render(
    'email-templates/renewal-confirmation-template.njk',
    {
      ...req.session,
      answers,
      fullName: formatName(req.session)
    }
  )
  const success =
    process.env.SKIP_SECURITY_CODE_EMAIL ??
    (await sendEmail({
      subject: 'North Wilts Model Aircraft Club Membership Renewal',
      content: emailTemplate,
      recipients: [recipient]
    }))
  if (!success) {
    throw new Error('Failed to send renewal confirmation email')
  } else {
    res.redirect(redirectUrl('renewal-confirmation', res))
  }
}

import sendEmail from '#utils/send-email.js'
import nunjucks from 'nunjucks'
import formatName from '../../../lib/nunjucks-filters/format-name.js'
import { redirectUrl } from '#utils/redirect-url.js'

export const sendConfirmationEmail = async (req, res) => {
  const recipient = { email: req.session.email, name: 'Club member' }
  const emailTemplate = nunjucks.render(
    'email-templates/renewal-confirmation-template.njk',
    {
      ...req.session,
      fullName: formatName(req.session)
    }
  )
  const success =
    process.env.SKIP_SECURITY_CODE_EMAIL ??
    (await sendEmail({
      subject: 'North Wilts Model Aircraft Club Security Token',
      content: emailTemplate,
      recipients: [recipient]
    }))
  if (!success) {
    throw new Error('Failed to send email')
  } else if (req.session.membershipNumber) {
    res.redirect(redirectUrl('renewal-confirmation', res))
  } else {
    res.redirect(redirectUrl('application-confirmation', res))
  }
}

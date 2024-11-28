import sendEmail from '#utils/send-email.js'
import nunjucks from 'nunjucks'
import formatFullName from '#nunjucks-filters/format-full-name.js'
import { redirectUrl } from '#utils/redirect-url.js'

export const sendApplicationConfirmationEmail = async (req, res) => {
  const recipient = {
    email: req.session.email,
    name: formatFullName(req.session)
  }
  const emailTemplate = nunjucks.render(
    'email-templates/application-confirmation-template.njk',
    {
      ...req.session,
      fullName: formatFullName(req.session)
    }
  )
  const success = await sendEmail({
    subject: 'North Wilts Model Aircraft Club Membership Application',
    content: emailTemplate,
    recipients: [recipient]
  })
  if (!success) {
    throw new Error('Failed to send application confirmation email')
  } else {
    res.redirect(redirectUrl('application-confirmation', res))
  }
}

import sendEmail from '../../../lib/utils/send-email.js'

export const sendConfirmationEmail = async (req, res) => {
  const recipient = { email: req.session.email, name: 'Club member' }
  req.session.securityCode =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  const success =
    process.env.SKIP_SECURITY_CODE_EMAIL ??
    (await sendEmail({
      subject: 'North Wilts Model Aircraft Club Security Token',
      content: `
    Dear ${recipient.name},<br>
    Your one time security code is <strong>${req.session.securityCode}</strong>.<br>
    Kind regards, <br>
    NWMAC club secretary
    `,
      recipients: [recipient]
    }))
  if (success) {
    res.redirect('/auth/security-code')
  } else {
    res.redirect('/auth')
  }
}

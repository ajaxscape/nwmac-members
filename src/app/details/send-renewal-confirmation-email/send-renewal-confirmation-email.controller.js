import sendEmail from '#utils/send-email.js'
import nunjucks from 'nunjucks'
import formatName from '#nunjucks-filters/format-name.js'
import { redirectUrl } from '#utils/redirect-url.js'
import clubSecretaryName from '#utils/club-secretary-name.js'
import formatAmount from '#nunjucks-filters/format-amount.js'
import mapAnswers from '#utils/map-answers.js'
import mapBankDetails from '#utils/map-bank-details.js'
import mapFees from '#utils/map-fees.js'

export const sendRenewalConfirmationEmail = async (req, res) => {
  const recipient = { email: req.session.email, name: formatName(req.session) }
  const { clubFee, bmfaFee, caaReg } = req.session.fees

  let total = clubFee
  if (req.session.bmfaThroughClub) {
    total += bmfaFee + caaReg
  }

  const answers = mapAnswers(req)
  const bankDetails = mapBankDetails(req)
  const items = mapFees(req, req.session.fees)

  const emailTemplate = nunjucks.render(
    'email-templates/renewal-confirmation-template.njk',
    {
      ...req.session,
      answers,
      bankDetails,
      items,
      total: formatAmount(total),
      fullName: formatName(req.session),
      clubSecretaryName: await clubSecretaryName()
    }
  )

  const success = await sendEmail({
        subject: 'North Wilts Model Aircraft Club Membership Renewal',
        content: emailTemplate,
        recipients: [recipient]
      })
  if (!success) {
    throw new Error('Failed to send renewal confirmation email')
  } else {
    res.redirect(redirectUrl('renewal-confirmation', res))
  }
}

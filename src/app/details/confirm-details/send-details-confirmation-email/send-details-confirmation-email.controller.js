import sendEmail from '#utils/send-email.js'
import nunjucks from 'nunjucks'
import formatName from '#nunjucks-filters/format-name.js'
import { redirectUrl } from '#utils/redirect-url.js'
import clubSecretaryName from '#utils/club-secretary-name.js'
import mapAnswers from '#utils/map-answers.js'
import mapBankDetails from '#utils/map-bank-details.js'
import mapFees from '#utils/map-fees.js'
import calculateFees from '#utils/calculate-fees.js'

export const sendDetailsConfirmationEmail = async (req, res) => {
  const recipient = {
    email: req.session.email,
    name: formatName(req.session)
  }

  const answers = mapAnswers(req)
  const bankDetails = mapBankDetails(req)
  const calculatedFees = calculateFees(req.session)
  const fees = mapFees(calculatedFees)

  const emailTemplate = nunjucks.render(
    'email-templates/details-confirmation-template.njk',
    {
      ...req.session,
      answers,
      bankDetails,
      fees,
      total: calculatedFees.total,
      fullName: formatName(req.session),
      clubSecretaryName: await clubSecretaryName(),
      confirmPaymentUrl: `${req.protocol}://${req.get('host')}/details/confirm-payment`
    }
  )

  const success = await sendEmail({
    subject: 'North Wilts Model Aircraft Club Membership Details',
    content: emailTemplate,
    recipients: [recipient]
  })
  if (!success) {
    throw new Error('Failed to send details confirmation email')
  } else {
    res.redirect(redirectUrl('details-confirmation', res))
  }
}

import calculateFees from '#utils/calculate-fees.js'
import config from '#config/config.js'

export const viewRenewalConfirmation = (req, res) => {
  res.render('pages/details/renewal-confirmation', {
    locals: res.locals,
    ...calculateFees(req.session),
    ...config.bankDetails,
    reference: `NWMAC${req.session.membershipNumber}`
  })
}

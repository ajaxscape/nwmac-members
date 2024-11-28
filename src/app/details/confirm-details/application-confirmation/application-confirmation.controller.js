import calculateFees from '#utils/calculate-fees.js'
import config from '#config/config.js'

export const viewApplicationConfirmation = (req, res) => {
  const { total } = calculateFees(req.session)
  res.render('pages/details/application-confirmation', {
    locals: res.locals,
    total,
    ...config.bankDetails,
    reference: `NWMAC${req.session.membershipNumber}`
  })
}

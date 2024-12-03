import calculateFees from '#utils/calculate-fees.js'
import config from '#config/config.js'
import defaultBankReference from '#nunjucks-filters/default-bank-reference.js'

export const viewRenewalConfirmation = (req, res) => {
  const { total } = calculateFees(req.session)
  res.render('pages/details/renewal-confirmation', {
    locals: res.locals,
    total,
    ...config.bankDetails,
    reference: defaultBankReference(req.session.membershipNumber)
  })
}

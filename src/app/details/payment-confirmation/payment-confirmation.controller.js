export const viewPaymentConfirmation = async (req, res) => {
  res.render('pages/details/payment-confirmation', { locals: res.locals })
}

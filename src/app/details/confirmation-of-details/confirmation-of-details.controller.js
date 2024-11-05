/**
 * Confirmation
 */

// redirect-url.js
export const viewConfirmation = (req, res) => {
  res.render('pages/details/confirmation', { locals: res.locals })
}

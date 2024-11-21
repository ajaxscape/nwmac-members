import { redirectUrl } from '#utils/redirect-url.js'
import { storeData } from '#utils/store-session-data.js'
import { validationResult } from 'express-validator'

export const viewEnterConfirmPayment = (req, res) => {
  res.render('pages/details/confirm-payment', {
    locals: res.locals
  })
}

export const postEnterConfirmPayment = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/confirm-payment', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('check-details', res))
}

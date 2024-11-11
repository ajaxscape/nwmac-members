import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'

export const viewEnterPhoneNumbers = (req, res) => {
  res.render('pages/details/phone-numbers', { locals: res.locals })
}

export const postEnterPhoneNumbers = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/phone-numbers', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('membership-type', res))
}

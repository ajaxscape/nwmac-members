import { validationResult } from 'express-validator'
import { storeData } from '../../../lib/utils/store-session-data.js'
import { redirectUrl } from '../middleware/redirect-url.js'

export const viewEnterAddress = (req, res) => {
  res.render('pages/details/address', { locals: res.locals })
}

export const postEnterAddress = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/address', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('phone-numbers', res))
}

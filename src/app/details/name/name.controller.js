import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'

export const viewEnterName = (req, res) => {
  res.render('pages/details/name', { locals: res.locals })
}

export const postEnterName = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/name', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('address', res))
}

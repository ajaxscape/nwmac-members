import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'

export const viewEnterCAARegistration = (req, res) => {
  res.render('pages/details/caa-registration', {
    operatorIdRequired: req.session.ageGroup === 'senior',
    locals: res.locals
  })
}

export const postEnterCAARegistration = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/caa-registration', {
      operatorIdRequired: req.session.ageGroup === 'senior',
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('achievements', res))
}

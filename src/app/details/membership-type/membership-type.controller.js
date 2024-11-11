import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'

export const viewSelectMembershipType = (req, res) => {
  res.render('pages/details/membership-type', { locals: res.locals })
}

export const postSelectMembershipType = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/membership-type', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('age-group', res))
}

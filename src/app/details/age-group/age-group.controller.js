import { validationResult } from 'express-validator'
import { storeData } from '../../../lib/utils/store-session-data.js'
import { redirectUrl } from '../middleware/redirect-url.js'

export const viewEnterAgeGroup = (req, res) => {
  res.render('pages/details/age-group', { locals: res.locals })
}

export const postEnterAgeGroup = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/age-group', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('bmfa-membership', res))
}

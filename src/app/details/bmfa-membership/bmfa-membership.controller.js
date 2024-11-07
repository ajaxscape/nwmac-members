import { validationResult } from 'express-validator'
import { storeData } from '../../../lib/utils/store-session-data.js'
import { redirectUrl } from '../middleware/redirect-url.js'

export const viewEnterBMFAMembership = (req, res) => {
  res.render('pages/details/bmfa-membership', { locals: res.locals })
}

export const postEnterBMFAMembership = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/bmfa-membership', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('caa-registration', res))
}

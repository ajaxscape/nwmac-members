import { validationResult } from 'express-validator'
import { storeData } from '../../../lib/utils/store-session-data.js'

export const viewTrustBrowser = (req, res) => {
  res.render('pages/auth/trust-browser', { locals: res.locals })
}

export const postTrustBrowser = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/auth/trust-browser', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)

  if (req.body.trustBrowser === 'yes') {
    res.cookie('email', req.session.email, { signed: true })
  }

  res.redirect('/details/club-contact')
}

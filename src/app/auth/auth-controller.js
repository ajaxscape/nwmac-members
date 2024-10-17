/**
 * Enter Address
 */
import { validationResult } from 'express-validator'

export const viewLogin = (req, res) => {
  res.render('pages/auth/login', { locals: res.locals })
}

export const postLogin = (req, res) => {
  const { email } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/auth/login', {
      locals: res.locals,
      data: { email },
      errors: errors.array()
    })
  }
  req.session.email = email
  res.redirect(`/details/renew/name`)
}

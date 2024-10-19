/**
 * Enter Address
 */
import { validationResult } from 'express-validator'

export const viewEnterEmail = (req, res) => {
  res.render('pages/auth/enter-email', { locals: res.locals })
}

export const postEnterEmail = (req, res) => {
  const { email } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/auth/enter-email', {
      locals: res.locals,
      data: { email },
      errors: errors.array()
    })
  }

  req.session.email = email

  // ToDo Validate email here
  const emailIsRecognised = email === 'ben@surgison.net'

  if (emailIsRecognised) {
    res.redirect('/auth/email-has-been-sent')
  } else {
    res.redirect('/auth/unknown-email')
  }
}

export const viewUnknownEmail = (req, res) => {
  const { email } = req.session.email
  res.render('pages/auth/unknown-email', {
    locals: res.locals,
    data: { email }
  })
}

export const postUnknownEmail = (req, res) => {
  res.redirect('/auth/email-has-been-sent')
}

export const viewEmailHasBeenSent = (req, res) => {
  res.render('pages/auth/email-has-been-sent', { locals: res.locals })
}

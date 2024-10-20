/**
 * Enter Address
 */
import { validationResult } from 'express-validator'
import {
  generateToken,
  retrieveEmailFromToken
} from '../../lib/utils/current-tokens.js'
import { identifyEmail } from '../../lib/utils/identify-email.js'

export const viewEnterEmail = (req, res) => {
  res.render('pages/auth/enter-email', { locals: res.locals })
}

export const postEnterEmail = async (req, res) => {
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
  const emailIsRecognised = await identifyEmail(email)

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
  const token = generateToken(req.session.email)
  res.render('pages/auth/email-has-been-sent', {
    locals: res.locals,
    emailConfirmationLink: `/auth/tk/${token}`
  })
}

export const redirectByToken = (req, res) => {
  const email = retrieveEmailFromToken(req.params.token)
  if (email) {
    req.session.email = email
    // res.redirect(`/auth/email-confirmation`)
    res.redirect(`/intro/gdpr`)
  } else {
    res.redirect('/auth/enter-email')
  }
}

export const viewEmailConfirmation = (req, res) => {
  res.render('pages/auth/email-confirmation', { locals: res.locals })
}

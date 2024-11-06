import { validationResult } from 'express-validator'
import { identifyEmail } from '../../../lib/utils/identify-email.js'

export const viewEnterEmail = (req, res) => {
  const email = req.signedCookies.email
  if (email) {
    req.session.email = email
    res.redirect('/details')
  } else {
    res.render('pages/auth/enter-email', { locals: res.locals })
  }
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

  const emailIsRecognised = await identifyEmail(email)

  if (emailIsRecognised) {
    res.redirect('/auth/send-confirmation-email')
  } else {
    res.redirect('/auth/unknown-email')
  }
}

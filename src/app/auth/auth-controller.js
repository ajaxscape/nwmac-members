/**
 * Enter Address
 */
import { validationResult } from 'express-validator'
import { nanoid } from 'nanoid'

const currentTokens = []
const tokenTimeout = 10 * 60 * 1000 // 10 minutes

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
  const token = nanoid()
  currentTokens.push({
    expires: Date.now() + tokenTimeout,
    token
  })
  res.render('pages/auth/email-has-been-sent', {
    locals: res.locals,
    emailConfirmationLink: `/auth/tk/${token}`
  })
}

export const redirectByToken = (req, res) => {
  // remove any old tokens
  while (
    currentTokens.some((currentToken) => currentToken.expires < Date.now())
  ) {
    currentTokens.splice(
      currentTokens.findIndex(
        (currentToken) => currentToken.expires < Date.now()
      ),
      1
    )
  }

  const [currentToken] = currentTokens.splice(
    currentTokens.findIndex(
      (currentToken) => currentToken.token === req.params.token
    )
  )
  if (currentToken) {
    res.redirect(`/auth/email-confirmation`)
  } else {
    res.redirect('/auth/enter-email')
  }
}

export const viewEmailConfirmation = (req, res) => {
  res.render('pages/auth/email-confirmation', { locals: res.locals })
}

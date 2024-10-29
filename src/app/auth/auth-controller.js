/**
 * Enter Address
 */
import { validationResult } from 'express-validator'
import {
  generateToken,
  retrieveEmailFromToken
} from '../../lib/utils/current-tokens.js'
import { identifyEmail } from '../../lib/utils/identify-email.js'
import sendEmail from '../../lib/utils/send-email.js'
import { storeData } from '../../lib/utils/store-session-data.js'

export const viewEnterEmail = (req, res) => {
  const email = req.signedCookies.email
  if (email) {
    req.session.email = email
    res.redirect('/intro/gdpr')
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

  // ToDo Validate email here
  const emailIsRecognised = await identifyEmail(email)

  if (emailIsRecognised) {
    res.redirect('/auth/send-confirmation-email')
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
  res.redirect('/auth/send-confirmation-email')
}

export const sendConfirmationEmail = async (req, res) => {
  const recipient = { email: req.session.email, name: 'Club member' }
  req.session.securityCode =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  const success =
    process.env.SKIP_SECURITY_CODE_EMAIL ??
    (await sendEmail({
      subject: 'North Wilts Model Aircraft Club Security Token',
      content: `
    Dear ${recipient.name},<br>
    Your one time security code is <strong>${req.session.securityCode}</strong>.<br>
    Kind regards, <br>
    NWMAC club secretary
    `,
      recipients: [recipient]
    }))
  if (success) {
    res.redirect('/auth/security-code')
  } else {
    res.redirect('/auth/enter-email')
  }
}

export const viewSecurityCode = (req, res) => {
  const token = generateToken(req.session.email)
  if (!res.locals.data.securityCode && process.env.SKIP_SECURITY_CODE_EMAIL) {
    res.locals.data.securityCode = req.session.securityCode
  }
  res.render('pages/auth/security-code', {
    locals: res.locals,
    emailConfirmationLink: `/auth/tk/${token}`,
    securityCode: process.env.SKIP_SECURITY_CODE_EMAIL
      ? req.session.securityCode
      : ''
  })
}

export const postSecurityCode = (req, res) => {
  const { securityCode } = req.body
  const isValidCode = securityCode === req.session.securityCode.toString()
  if (!isValidCode) {
    return res.render('pages/auth/security-code', {
      locals: res.locals,
      errors: [
        { id: securityCode, msg: 'Invalid security code. Please try again.' }
      ]
    })
  }
  res.redirect(`/auth/trust-browser`)
}

/**
 * Select Trust browser choice
 */

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

  // ToDo sortout state
  res.redirect('/intro/gdpr')
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

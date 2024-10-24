import express from 'express'
import { validateEmail, validateTrustBrowser } from './auth-validator.js'
import {
  postEnterEmail,
  postSecurityCode,
  postTrustBrowser,
  postUnknownEmail,
  redirectByToken,
  sendConfirmationEmail,
  viewEnterEmail,
  viewSecurityCode,
  viewTrustBrowser,
  viewUnknownEmail
} from './auth-controller.js'
import { authenticate, setLocals } from '../controller.js'

const router = express.Router()

router
  .route('/enter-email')
  .get(viewEnterEmail)
  .post(validateEmail(), postEnterEmail)

router
  .route('/unknown-email')
  .get(authenticate, setLocals, viewUnknownEmail)
  .post(authenticate, setLocals, postUnknownEmail)

router
  .route('/send-confirmation-email')
  .get(authenticate, setLocals, sendConfirmationEmail)

router
  .route('/security-code')
  .get(authenticate, setLocals, viewSecurityCode)
  .post(authenticate, setLocals, postSecurityCode)

router
  .route('/trust-browser')
  .get(authenticate, setLocals, viewTrustBrowser)
  .post(authenticate, setLocals, validateTrustBrowser(), postTrustBrowser)

router.route('/tk/:token').get(redirectByToken)

router.get('/', (req, res) => {
  res.redirect(`/auth/enter-email`)
})

export default router

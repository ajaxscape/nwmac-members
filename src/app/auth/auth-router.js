import express from 'express'
import { validateEmail } from './auth-validator.js'
import {
  postEnterEmail,
  postSecurityCode,
  postUnknownEmail,
  redirectByToken,
  sendConfirmationEmail,
  viewEnterEmail,
  viewSecurityCode,
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

router.route('/tk/:token').get(redirectByToken)

router.get('/', (req, res) => {
  res.redirect(`/auth/enter-email`)
})

export default router

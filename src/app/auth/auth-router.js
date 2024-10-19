import express from 'express'
import { validateEmail } from './auth-validator.js'
import {
  postEnterEmail,
  postUnknownEmail,
  viewEmailHasBeenSent,
  viewEnterEmail,
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
  .route('/email-has-been-sent')
  .get(authenticate, setLocals, viewEmailHasBeenSent)

router.get('/', (req, res) => {
  res.redirect(`/auth/enter-email`)
})

export default router

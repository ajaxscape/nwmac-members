import express from 'express'

import { validateEmail } from './enter-email.validator.js'
import { postEnterEmail, viewEnterEmail } from './enter-email.controller.js'
import clearSession from '#middleware/clear-session.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterEmail)
  .post(clearSession, validateEmail(), postEnterEmail)

export default router

import express from 'express'

import { validateEmail } from './enter-email.validator.js'
import { postEnterEmail, viewEnterEmail } from './enter-email.controller.js'

const router = express.Router()

router.route('/').get(viewEnterEmail).post(validateEmail(), postEnterEmail)

export default router

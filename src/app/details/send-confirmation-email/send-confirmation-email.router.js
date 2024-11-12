import express from 'express'
import { sendConfirmationEmail } from './send-confirmation-email.controller.js'

const router = express.Router()

router.route('/').get(sendConfirmationEmail)

export default router

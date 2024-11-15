import express from 'express'
import { sendRenewalConfirmationEmail } from './send-renewal-confirmation-email.controller.js'

const router = express.Router()

router.route('/').get(sendRenewalConfirmationEmail)

export default router

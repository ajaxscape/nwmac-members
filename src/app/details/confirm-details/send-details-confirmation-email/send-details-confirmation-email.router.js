import express from 'express'
import { sendDetailsConfirmationEmail } from './send-details-confirmation-email.controller.js'

const router = express.Router()

router.route('/').get(sendDetailsConfirmationEmail)

export default router

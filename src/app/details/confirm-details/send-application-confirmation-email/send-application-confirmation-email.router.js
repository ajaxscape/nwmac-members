import express from 'express'
import { sendApplicationConfirmationEmail } from './send-application-confirmation-email.controller.js'

const router = express.Router()

router.route('/').get(sendApplicationConfirmationEmail)

export default router

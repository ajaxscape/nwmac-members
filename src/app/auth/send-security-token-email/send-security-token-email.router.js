import express from 'express'

import { sendSecurityTokenEmail } from './send-security-token-email.controller.js'

const router = express.Router()

router.route('/').get(sendSecurityTokenEmail)

export default router

import express from 'express'

import { authenticate, setLocals } from '../../app.controller.js'
import { sendSecurityTokenEmail } from './send-security-token-email.controller.js'

const router = express.Router()

router.route('/').get(authenticate, setLocals, sendSecurityTokenEmail)

export default router

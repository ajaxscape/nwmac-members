import express from 'express'

import { authenticate, setLocals } from '../../app.controller.js'
import { sendConfirmationEmail } from './send-confirmation-email.controller.js'

const router = express.Router()

router.route('/').get(authenticate, setLocals, sendConfirmationEmail)

export default router

import express from 'express'
import { viewPaymentConfirmation } from './payment-confirmation.controller.js'

const router = express.Router()

router.route('/').get(viewPaymentConfirmation)

export default router

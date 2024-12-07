import express from 'express'
import { viewPaymentsBreakdown } from './payments-breakdown.controller.js'

const router = express.Router()

router.route('/').get(viewPaymentsBreakdown)

export default router

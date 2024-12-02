import express from 'express'
import feesRouter from './fees/fees.router.js'
import confirmPendingPaymentsRouter from './confirm-pending-payments/confirm-pending-payments.router.js'

const router = express.Router()

router.use('/fees', feesRouter)
router.use('/confirm-pending-payments', confirmPendingPaymentsRouter)

export default router

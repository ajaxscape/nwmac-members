import express from 'express'
import feesRouter from './fees/fees.router.js'
import confirmPendingPaymentsRouter from './confirm-pending-payments/confirm-pending-payments.router.js'
import authenticate from '#middleware/authenticate.js'
import setLocals from '#middleware/set-locals.js'
import registerMembershipState from '#middleware/register-membership-state.js'
import registerCurrentFees from '#middleware/register-current-fees.js'
import adminOnly from '#middleware/admin-only.js'
import paymentsBreakdownRouter from './payments-breakdown/payments-breakdown.router.js'
import confirmRenewalsRouter from './confirm-renewals/confirm-renewals.router.js'
import memberDetailsRouter from './member-details/member-details.router.js'

const router = express.Router()

router.use(
  authenticate,
  setLocals,
  registerMembershipState,
  registerCurrentFees,
  adminOnly
)

router.use('/fees', feesRouter)
router.use('/confirm-pending-payments', confirmPendingPaymentsRouter)
router.use('/payments-breakdown', paymentsBreakdownRouter)
router.use('/confirm-renewals', confirmRenewalsRouter)
router.use('/member-details', memberDetailsRouter)

export default router

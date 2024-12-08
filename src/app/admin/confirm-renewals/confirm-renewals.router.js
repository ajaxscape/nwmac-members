import express from 'express'
import { viewConfirmRenewals } from './confirm-renewals.controller.js'

const router = express.Router()

router.route('/').get(viewConfirmRenewals)

export default router

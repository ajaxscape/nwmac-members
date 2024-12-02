import express from 'express'
import {
  postPaymentsConfirmed,
  viewPaymentsConfirmed
} from './confirm-pending-payments.controller.js'

const router = express.Router()

router.route('/').get(viewPaymentsConfirmed).post(postPaymentsConfirmed)

export default router

import {
  postEnterConfirmPayment,
  viewEnterConfirmPayment
} from './confirm-payment.controller.js'
import express from 'express'
import {
  validateAmountPaid,
  validatePaymentMethod
} from './confirm-payment.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterConfirmPayment)
  .post(validateAmountPaid(), validatePaymentMethod(), postEnterConfirmPayment)

export default router

import {
  postEnterConfirmPayment,
  viewEnterConfirmPayment
} from './confirm-payment.controller.js'
import express from 'express'
import { validateConfirmPayment } from './confirm-payment.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterConfirmPayment)
  .post(validateConfirmPayment(), postEnterConfirmPayment)

export default router

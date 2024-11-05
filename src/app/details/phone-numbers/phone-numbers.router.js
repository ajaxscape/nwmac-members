import express from 'express'

import {
  postEnterPhoneNumbers,
  viewEnterPhoneNumbers
} from './phone-numbers.controller.js'
import { validateMobileNumber } from './phone-numbers.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterPhoneNumbers)
  .post(validateMobileNumber(), postEnterPhoneNumbers)

export default router

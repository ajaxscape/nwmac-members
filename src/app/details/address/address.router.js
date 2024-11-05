import express from 'express'

import { postEnterAddress, viewEnterAddress } from './address.controller.js'
import {
  validateAddressLine1,
  validatePostcode,
  validateTown
} from './address.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterAddress)
  .post(
    validateAddressLine1(),
    validateTown(),
    validatePostcode(),
    postEnterAddress
  )

export default router

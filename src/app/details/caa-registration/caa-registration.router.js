import express from 'express'

import {
  postEnterCaaOperatorRegistration,
  viewEnterCaaOperatorRegistration
} from './caa-registration.controller.js'
import {
  validateFlyerId,
  validateOperatorId
} from './caa-registration.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterCaaOperatorRegistration)
  .post(
    validateOperatorId(),
    validateFlyerId(),
    postEnterCaaOperatorRegistration
  )

export default router

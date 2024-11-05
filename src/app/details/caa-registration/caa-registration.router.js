import express from 'express'

import {
  postEnterCAARegistration,
  viewEnterCAARegistration
} from './caa-registration.controller.js'
import {
  validateFlyerId,
  validateOperatorId
} from './caa-registration.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterCAARegistration)
  .post(validateOperatorId(), validateFlyerId(), postEnterCAARegistration)

export default router

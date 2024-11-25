import express from 'express'

import {
  postEntercaaOperatorRegistrationistration,
  viewEntercaaOperatorRegistrationistration
} from './caa-registration.controller.js'
import {
  validateFlyerId,
  validateOperatorId
} from './caa-registration.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEntercaaOperatorRegistrationistration)
  .post(
    validateOperatorId(),
    validateFlyerId(),
    postEntercaaOperatorRegistrationistration
  )

export default router

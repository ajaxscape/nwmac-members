import express from 'express'

import {
  postEnterBMFAMembership,
  viewEnterBMFAMembership
} from './bmfa-membership.controller.js'
import {
  validateBMFANumber,
  validateBMFAThroughClub
} from './bmfa-membership.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterBMFAMembership)
  .post(
    validateBMFANumber(),
    validateBMFAThroughClub(),
    postEnterBMFAMembership
  )

export default router

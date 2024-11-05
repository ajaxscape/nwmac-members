import express from 'express'

import {
  postSelectMembershipType,
  viewSelectMembershipType
} from './membership-type.controller.js'
import { validateMembershipType } from './membership-type.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewSelectMembershipType)
  .post(validateMembershipType(), postSelectMembershipType)

export default router

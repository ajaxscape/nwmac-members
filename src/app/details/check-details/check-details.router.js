import express from 'express'

import {
  loadBodyForValidation,
  postCheckDetails,
  viewCheckDetails
} from './check-details.controller.js'
import { validateFirstName, validateLastName } from '../name/name.validator.js'
import {
  validateAddressLine1,
  validatePostcode,
  validateTown
} from '../address/address.validator.js'
import { validateMobileNumber } from '../phone-numbers/phone-numbers.validator.js'
import { validateMembershipType } from '../membership-type/membership-type.validator.js'
import { validateAgeGroup } from '../age-group/age-group.validator.js'
import {
  validateBMFANumber,
  validateBMFAThroughClub
} from '../bmfa-membership/bmfa-membership.validator.js'
import {
  validateFlyerId,
  validateOperatorId
} from '../caa-registration/caa-registration.validator.js'
import { restoreData, setLocals } from '../../app.controller.js'

const router = express.Router()

router
  .route('/')
  .get(restoreData, setLocals, viewCheckDetails)
  .post(
    loadBodyForValidation,
    validateFirstName(),
    validateLastName(),
    validateAddressLine1(),
    validateTown(),
    validatePostcode(),
    validateMobileNumber(),
    validateMembershipType(),
    validateAgeGroup(),
    validateBMFAThroughClub(),
    validateBMFANumber(),
    validateOperatorId(),
    validateFlyerId(),
    postCheckDetails
  )

export default router

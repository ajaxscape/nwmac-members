import express from 'express'
import {
  viewEnterAddress,
  viewEnterName,
  postEnterName,
  viewSelectMembershipType,
  postSelectMembershipType,
  viewEnterAgeGroup,
  postEnterAgeGroup,
  postEnterAddress,
  viewCheckDetails,
  viewEnterPhoneNumbers,
  postEnterPhoneNumbers,
  viewEnterBMFAMembership,
  postEnterBMFAMembership,
  viewEnterCAARegistration,
  postEnterCAARegistration,
  viewConfirmation,
  postCheckDetails,
  viewSelectAchievements,
  postSelectAchievements
} from './details-controller.js'

import {
  validateAddressLine1,
  validateAgeGroup,
  validateBMFANumber,
  validateBMFAThroughClub,
  validateFirstName,
  validateFlyerId,
  validateLastName,
  validateMembershipType,
  validateMobileNumber,
  validateOperatorId,
  validatePostcode,
  validateTown
} from './details-validator.js'

const router = express.Router()

router.use('/edit', router)

router
  .route('/membership-type')
  .get(viewSelectMembershipType)
  .post(validateMembershipType(), postSelectMembershipType)

router
  .route('/age-group')
  .get(viewEnterAgeGroup)
  .post(validateAgeGroup(), postEnterAgeGroup)

router
  .route('/name')
  .get(viewEnterName)
  .post(validateFirstName(), validateLastName(), postEnterName)

router
  .route('/address')
  .get(viewEnterAddress)
  .post(
    validateAddressLine1(),
    validateTown(),
    validatePostcode(),
    postEnterAddress
  )

router
  .route('/phone-numbers')
  .get(viewEnterPhoneNumbers)
  .post(validateMobileNumber(), postEnterPhoneNumbers)

router
  .route('/bmfa-membership')
  .get(viewEnterBMFAMembership)
  .post(
    validateBMFANumber(),
    validateBMFAThroughClub(),
    postEnterBMFAMembership
  )

router
  .route('/caa-registration')
  .get(viewEnterCAARegistration)
  .post(validateOperatorId(), validateFlyerId(), postEnterCAARegistration)

router
  .route('/achievements')
  .get(viewSelectAchievements)
  .post(postSelectAchievements)

router.route('/check-details').get(viewCheckDetails).post(postCheckDetails)
router.route('/confirmation').get(viewConfirmation)

router.get('/', (req, res) => {
  res.render('index')
})

export default router

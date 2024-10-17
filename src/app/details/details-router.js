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
  viewCheckDetails
} from './details-controller.js'

import {
  validateAddressLine1,
  validateAgeGroup,
  validateFirstName,
  validateLastName,
  validateMembershipType,
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

router.route('/check-details').get(viewCheckDetails)

router.get('/', (req, res) => {
  res.render('index')
})

export default router

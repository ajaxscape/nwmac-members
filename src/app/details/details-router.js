import express from 'express'
import {
  viewEnterAddress,
  viewEnterName,
  postEnterName,
  viewSelectMembershipType,
  postSelectMembershipType,
  viewEnterAge,
  postEnterAge,
  postEnterAddress
} from './details-controller.js'

import {
  validateAddressLine1,
  validateAge,
  validateFirstName,
  validateLastName,
  validateMembershipType,
  validatePostcode,
  validateTown
} from './details-validator.js'

const router = express.Router()

router
  .route('/name')
  .get(viewEnterName)
  .post(validateFirstName(), validateLastName(), postEnterName)

router
  .route('/membership-type')
  .get(viewSelectMembershipType)
  .post(validateMembershipType(), postSelectMembershipType)

router
  .route('/address')
  .get(viewEnterAddress)
  .post(
    validateAddressLine1(),
    validateTown(),
    validatePostcode(),
    postEnterAddress
  )

router.route('/age').get(viewEnterAge).post(validateAge(), postEnterAge)

router.get('/', (req, res) => {
  res.render('index')
})

export default router

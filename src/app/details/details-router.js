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
  .route('/membership-type')
  .get(viewSelectMembershipType)
  .post(validateMembershipType(), postSelectMembershipType)

router.route('/age').get(viewEnterAge).post(validateAge(), postEnterAge)

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

router.get('/', (req, res) => {
  res.render('index')
})

export default router

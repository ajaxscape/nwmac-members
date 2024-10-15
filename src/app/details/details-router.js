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
import { body } from 'express-validator'

const router = express.Router()

router
  .route('/name')
  .get(viewEnterName)
  .post(
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name must be entered'),
    body('lastName').trim().notEmpty().withMessage('Last name must be entered'),
    postEnterName
  )

router
  .route('/membership-type')
  .get(viewSelectMembershipType)
  .post(postSelectMembershipType)

router.route('/address').get(viewEnterAddress).post(postEnterAddress)

router.route('/age').get(viewEnterAge).post(postEnterAge)

router.get('/', (req, res) => {
  res.render('index')
})

export default router

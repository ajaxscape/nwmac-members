import express from 'express'

import {
  postCheckDetails,
  viewCheckDetails
} from './check-details.controller.js'

const router = express.Router()

router.route('/').get(viewCheckDetails).post(postCheckDetails)

export default router

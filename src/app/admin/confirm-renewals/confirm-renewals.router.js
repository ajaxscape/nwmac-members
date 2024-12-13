import express from 'express'
import {
  postConfirmRenewals,
  viewConfirmRenewals
} from './confirm-renewals.controller.js'

const router = express.Router()

router.route('/').get(viewConfirmRenewals).post(postConfirmRenewals)

export default router

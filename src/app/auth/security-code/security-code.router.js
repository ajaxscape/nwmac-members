import express from 'express'

import {
  postSecurityCode,
  viewSecurityCode
} from './security-code.controller.js'

const router = express.Router()

router.route('/').get(viewSecurityCode).post(postSecurityCode)

export default router

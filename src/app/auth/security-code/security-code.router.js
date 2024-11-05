import express from 'express'

import { authenticate, setLocals } from '../../app.controller.js'
import {
  postSecurityCode,
  viewSecurityCode
} from './security-code.controller.js'

const router = express.Router()

router
  .route('/')
  .get(authenticate, setLocals, viewSecurityCode)
  .post(authenticate, setLocals, postSecurityCode)

export default router

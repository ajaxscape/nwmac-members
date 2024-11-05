import express from 'express'

import { authenticate, setLocals } from '../../app.controller.js'
import {
  postTrustBrowser,
  viewTrustBrowser
} from './trust-browser.controller.js'
import { validateTrustBrowser } from './trust-browser.validator.js'

const router = express.Router()

router
  .route('/')
  .get(authenticate, setLocals, viewTrustBrowser)
  .post(authenticate, setLocals, validateTrustBrowser(), postTrustBrowser)

export default router

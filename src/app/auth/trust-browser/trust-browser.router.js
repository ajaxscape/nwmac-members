import express from 'express'

import {
  postTrustBrowser,
  viewTrustBrowser
} from './trust-browser.controller.js'
import { validateTrustBrowser } from './trust-browser.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewTrustBrowser)
  .post(validateTrustBrowser(), postTrustBrowser)

export default router

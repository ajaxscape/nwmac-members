import express from 'express'

import {
  postUnknownEmail,
  viewUnknownEmail
} from './unknown-email.controller.js'
import { authenticate, setLocals } from '../../app.controller.js'

const router = express.Router()

router
  .route('/')
  .get(authenticate, setLocals, viewUnknownEmail)
  .post(authenticate, setLocals, postUnknownEmail)

export default router

import express from 'express'

import {
  postUnknownEmail,
  viewUnknownEmail
} from './unknown-email.controller.js'

const router = express.Router()

router.route('/').get(viewUnknownEmail).post(postUnknownEmail)

export default router

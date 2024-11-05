import express from 'express'

import { postEnterAgeGroup, viewEnterAgeGroup } from './age-group.controller.js'
import { validateAgeGroup } from './age-group.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterAgeGroup)
  .post(validateAgeGroup(), postEnterAgeGroup)

export default router

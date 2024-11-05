import express from 'express'

import { postEnterName, viewEnterName } from './name.controller.js'
import { validateFirstName, validateLastName } from './name.validator.js'

const router = express.Router()

router
  .route('/')
  .get(viewEnterName)
  .post(validateFirstName(), validateLastName(), postEnterName)

export default router

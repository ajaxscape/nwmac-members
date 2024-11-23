import express from 'express'

import { authenticate, restoreData, setLocals } from '../../app.controller.js'
import { restoreDataController } from './restore-data.controller.js'

const router = express.Router()

router
  .route('/')
  .get(authenticate, restoreData, setLocals, restoreDataController)

export default router

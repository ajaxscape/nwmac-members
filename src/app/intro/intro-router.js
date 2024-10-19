import express from 'express'
import { postGDPR, viewGDPR } from './intro-controller.js'
import { validateNonClubContact } from './intro-validator.js'
import { authenticate, setLocals } from '../controller.js'

const router = express.Router()

router
  .route('/gdpr')
  .get(authenticate, setLocals, viewGDPR)
  .post(authenticate, setLocals, validateNonClubContact(), postGDPR)

export default router

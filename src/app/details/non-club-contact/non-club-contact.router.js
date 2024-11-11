import express from 'express'
import { authenticate, restoreData, setLocals } from '../../app.controller.js'
import { validateNonClubContact } from './non-club-contact.validator.js'
import { postClubContact, viewClubContact } from './non-club-contact.controller.js'

const router = express.Router()

router
  .route('/')
  .get(authenticate, restoreData, setLocals, viewClubContact)
  .post(authenticate, setLocals, validateNonClubContact(), postClubContact)

export default router

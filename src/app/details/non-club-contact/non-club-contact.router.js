import express from 'express'
import { validateNonClubContact } from './non-club-contact.validator.js'
import {
  postClubContact,
  viewClubContact
} from './non-club-contact.controller.js'

const router = express.Router()

router
  .route('/')
  .get(viewClubContact)
  .post(validateNonClubContact(), postClubContact)

export default router

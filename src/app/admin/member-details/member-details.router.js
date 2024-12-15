import express from 'express'

import { viewMemberDetails } from './member-details.controller.js'

const router = express.Router()

router.route('/:membershipNumber').get(viewMemberDetails)

export default router

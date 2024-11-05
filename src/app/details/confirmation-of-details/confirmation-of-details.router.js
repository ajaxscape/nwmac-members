import express from 'express'

import { viewConfirmation } from './confirmation-of-details.controller.js'

const router = express.Router()

router.route('/').get(viewConfirmation)

export default router

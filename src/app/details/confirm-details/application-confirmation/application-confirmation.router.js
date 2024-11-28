import express from 'express'

import { viewApplicationConfirmation } from './application-confirmation.controller.js'

const router = express.Router()

router.route('/').get(viewApplicationConfirmation)

export default router

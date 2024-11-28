import express from 'express'

import { viewDetailsConfirmation } from './details-confirmation.controller.js'

const router = express.Router()

router.route('/').get(viewDetailsConfirmation)

export default router

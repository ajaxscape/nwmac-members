import express from 'express'

import { viewRenewalConfirmation } from './renewal-confirmation.controller.js'

const router = express.Router()

router.route('/').get(viewRenewalConfirmation)

export default router

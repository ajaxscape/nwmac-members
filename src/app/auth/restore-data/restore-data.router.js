import express from 'express'

import { restoreDataController } from './restore-data.controller.js'

const router = express.Router()

router.route('/').get(restoreDataController)

export default router

import express from 'express'
import { postEnterFees, viewEnterFees } from './fees.controller.js'
import { validateFees } from './fees.validator.js'

const router = express.Router()

router.route('/').get(viewEnterFees).post(validateFees(), postEnterFees)

export default router

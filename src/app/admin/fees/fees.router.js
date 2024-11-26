import express from 'express'
import { postEnterFees, viewEnterFees } from './fees.controller.js'

const router = express.Router()

router.route('/').get(viewEnterFees).post(postEnterFees)

export default router

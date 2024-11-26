import express from 'express'
import feesRouter from './fees/fees.router.js'

const router = express.Router()

router.use('/fees', feesRouter)

export default router

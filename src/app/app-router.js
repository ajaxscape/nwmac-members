import express from 'express'
import detailsRouter from './details/details-router.js'
import authRouter from './auth/auth-router.js'
import {
  registerMembershipState,
  setLocals,
  authenticate
} from './controller.js'

const router = express.Router()

router.use('/auth', authRouter)

router.use('/details/:state', [
  authenticate,
  setLocals,
  registerMembershipState,
  detailsRouter
])

router.get('/', (req, res) => {
  res.render('index')
})

export default router

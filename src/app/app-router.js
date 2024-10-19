import express from 'express'
import detailsRouter from './details/details-router.js'
import authRouter from './auth/auth-router.js'
import introRouter from './intro/intro-router.js'
import {
  registerMembershipState,
  setLocals,
  authenticate
} from './controller.js'

const router = express.Router()

router.use('/auth', authRouter)

router.use('/intro', introRouter)

router.use('/details/:state', [
  authenticate,
  setLocals,
  registerMembershipState,
  detailsRouter
])

router.get('/', (req, res) => {
  res.render('index')
})

// Page not found
router.all('*', (req, res) => {
  res.status(404).render('pages/error/404')
})

export default router

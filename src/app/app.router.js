import express from 'express'
import detailsRouter from './details/details.router.js'
import authRouter from './auth/auth-router.js'
import {
  authenticate,
  registerMembershipState,
  setLocals
} from './app.controller.js'

const router = express.Router()

router.use('/auth', authRouter)

router.use('/details', [
  authenticate,
  setLocals,
  registerMembershipState,
  detailsRouter
])

router.get('/', (req, res) => {
  res.redirect('/details')
})

// Page not found
router.all('*', (req, res) => {
  res.status(404).render('pages/error/404')
})

export default router

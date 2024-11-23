import express from 'express'
import detailsRouter from './details/details.router.js'
import authRouter from './auth/auth-router.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/details')
})

router.use('/auth', authRouter)

router.use('/details', detailsRouter)

// Page not found
router.all('*', (req, res) => {
  res.status(404).render('pages/error/404')
})

export default router

import express from 'express'
import detailsRouter from './details/details.router.js'
import authRouter from './auth/auth-router.js'
import adminRouter from './admin/admin.router.js'

const router = express.Router()

router.use((req, res, next) => {
  console.log(`>>>> ${req.ip} >>>> ${req.method} >>>> ${req.originalUrl}`)
  next()
})

router.use('/auth', authRouter)

router.use('/details', detailsRouter)
router.use('/admin', adminRouter)

router.get('/', (req, res) => {
  res.redirect('/details')
})

// Page not found
router.all('*', (req, res) => {
  res.status(404).render('pages/error/404')
})

export default router

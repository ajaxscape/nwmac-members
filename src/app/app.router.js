import express from 'express'
import detailsRouter from './details/details.router.js'
import authRouter from './auth/auth-router.js'
import adminRouter from './admin/admin.router.js'
import logger from '../logger/logger.js'

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

// Error handling
router
  .use((req, res, next) => {
    logger.error(`Page not found: ${req.originalUrl}`)
    res.status(404).render('pages/error/not-found')
    next()
  })
  .use((error, req, res, next) => {
    logger.error(
      { err: error },
      `Unhandled exception in: ${req.originalUrl} for user: ${req.session?.email ?? 'unknown'}`
    )
    res.status(500).render('pages/error/unhandled-exception', { error })
    next()
  })

export default router

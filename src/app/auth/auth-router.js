import express from 'express'

import enterEmailRouter from './enter-email/enter-email.router.js'
import unknownEmailRouter from './unknown-email/unknown-email.router.js'
import sendConfirmationEmailRouter from './send-confirmation-email/send-confirmation-email.router.js'
import securityCodeRouter from './security-code/security-code.router.js'
import trustBrowserRouter from './trust-browser/trust-browser.router.js'

const router = express.Router()

router.use('/enter-email', enterEmailRouter)
router.use('/unknown-email', unknownEmailRouter)
router.use('/send-confirmation-email', sendConfirmationEmailRouter)
router.use('/security-code', securityCodeRouter)
router.use('/trust-browser', trustBrowserRouter)

router.get('/', (req, res) => {
  res.redirect(`/auth/enter-email`)
})

export default router

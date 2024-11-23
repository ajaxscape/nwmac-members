import express from 'express'

import enterEmailRouter from './enter-email/enter-email.router.js'
import unknownEmailRouter from './unknown-email/unknown-email.router.js'
import sendSecurityTokenEmailRouter from './send-security-token-email/send-security-token-email.router.js'
import securityCodeRouter from './security-code/security-code.router.js'
import trustBrowserRouter from './trust-browser/trust-browser.router.js'
import restoreDataRouter from './restore-data/restore-data.router.js'

const router = express.Router()

router.use('/enter-email', enterEmailRouter)
router.use('/unknown-email', unknownEmailRouter)
router.use('/send-security-token-email', sendSecurityTokenEmailRouter)
router.use('/security-code', securityCodeRouter)
router.use('/trust-browser', trustBrowserRouter)
router.use('/restore-data', restoreDataRouter)

router.get('/logout', (req, res) => {
  res.clearCookie('email')
  res.redirect('/auth')
})

router.get('/', (req, res) => {
  res.redirect('/auth/enter-email')
})

export default router

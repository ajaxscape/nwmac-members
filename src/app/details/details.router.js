import express from 'express'

import nameRouter from './name/name.router.js'
import phoneNumbersRouter from './phone-numbers/phone-numbers.router.js'
import membershipTypeRouter from './membership-type/membership-type.router.js'
import achievementsRouter from './achievements/achievements.router.js'
import addressRouter from './address/address.router.js'
import ageGroupRouter from './age-group/age-group.router.js'
import bmfaMembershipRouter from './bmfa-membership/bmfa-membership.router.js'
import caaRegistrationRouter from './caa-registration/caa-registration.router.js'
import checkDetailsRouter from './check-details/check-details.router.js'
import nonClubContactRouter from './non-club-contact/non-club-contact.router.js'
import applicationConfirmationRouter from './application-confirmation/application-confirmation.router.js'
import introRouter from './intro/intro.router.js'
import renewalConfirmationRouter from './renewal-confirmation/renewal-confirmation.router.js'
import sendApplicationConfirmationEmailRouter from './send-application-confirmation-email/send-application-confirmation-email.router.js'
import sendRenewalConfirmationEmailRouter from './send-renewal-confirmation-email/send-renewal-confirmation-email.router.js'
import confirmPaymentRouter from './confirm-payment/confirm-payment.router.js'

const router = express.Router()

router.use('/edit', router)

router.use('/intro', introRouter)
router.use('/name', nameRouter)
router.use('/phone-numbers', phoneNumbersRouter)
router.use('/membership-type', membershipTypeRouter)
router.use('/achievements', achievementsRouter)
router.use('/address', addressRouter)
router.use('/age-group', ageGroupRouter)
router.use('/bmfa-membership', bmfaMembershipRouter)
router.use('/caa-registration', caaRegistrationRouter)
router.use('/non-club-contact', nonClubContactRouter)
router.use('/check-details', checkDetailsRouter)
router.use('/application-confirmation', applicationConfirmationRouter)
router.use('/renewal-confirmation', renewalConfirmationRouter)
router.use('/confirm-payment', confirmPaymentRouter)
router.use(
  '/send-application-confirmation-email',
  sendApplicationConfirmationEmailRouter
)
router.use(
  '/send-renewal-confirmation-email',
  sendRenewalConfirmationEmailRouter
)

router.get('/', (req, res) => {
  res.redirect('/details/intro')
})

export default router

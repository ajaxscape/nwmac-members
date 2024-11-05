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
import clubContactRouter from './club-contact/club-contact.router.js'
import confirmationOfDetailsRouter from './confirmation-of-details/confirmation-of-details.router.js'

const router = express.Router()

router.use('/edit', router)

router.use('/name', nameRouter)
router.use('/phone-numbers', phoneNumbersRouter)
router.use('/membership-type', membershipTypeRouter)
router.use('/achievements', achievementsRouter)
router.use('/address', addressRouter)
router.use('/age-group', ageGroupRouter)
router.use('/bmfa-membership', bmfaMembershipRouter)
router.use('/caa-registration', caaRegistrationRouter)
router.use('/club-contact', clubContactRouter)
router.use('/check-details', checkDetailsRouter)
router.use('/confirmation-of-details', confirmationOfDetailsRouter)

router.get('/', (req, res) => {
  res.redirect('/details/club-contact')
})

export default router

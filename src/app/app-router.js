import express from 'express'
import detailsRouter from './details/details-router.js'
import { registerMembershipState } from './controller.js'

const router = express.Router()

router.use('/details/:state', [registerMembershipState, detailsRouter])

router.get('/', (req, res) => {
  res.render('index')
})

export default router

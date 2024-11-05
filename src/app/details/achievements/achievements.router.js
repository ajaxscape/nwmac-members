import express from 'express'

import {
  postSelectAchievements,
  viewSelectAchievements
} from './achievements.controller.js'

const router = express.Router()

router.route('/').get(viewSelectAchievements).post(postSelectAchievements)

export default router

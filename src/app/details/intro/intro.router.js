import express from 'express'
import { postIntro, viewIntro } from './intro.controller.js'

const router = express.Router()

router.route('/').get(viewIntro).post(postIntro)

export default router

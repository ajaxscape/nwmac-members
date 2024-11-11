import express from 'express'
import { postIntro, viewIntro } from './intro.controller.js'
import { restoreData, setLocals } from '../../app.controller.js'

const router = express.Router()

router.route('/').get(restoreData, setLocals, viewIntro).post(postIntro)

export default router

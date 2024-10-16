import express from 'express'
import { validateEmail, validatePassword } from './auth-validator.js'
import { postLogin, viewLogin } from './auth-controller.js'

const router = express.Router()

router
  .route('/login')
  .get(viewLogin)
  .post(validateEmail(), validatePassword(), postLogin)

router.get('/', (req, res) => {
  res.redirect(`/auth/login`)
})

export default router

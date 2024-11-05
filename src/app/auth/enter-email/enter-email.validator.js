import { body } from 'express-validator'

export const validateEmail = () =>
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email must be entered')
    .bail()
    .isEmail()
    .withMessage('Email must be valid')

import { body } from 'express-validator'

/**
 * Validate Login
 */

export const validateEmail = () =>
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email must be entered')
    .bail()
    .isEmail()
    .withMessage('Email must be valid')

export const validatePassword = () =>
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must be entered')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')

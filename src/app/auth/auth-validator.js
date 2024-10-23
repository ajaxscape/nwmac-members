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

/**
 * Validate Login
 */

export const validateSecurityCode = () =>
  body('securityCode')
    .trim()
    .notEmpty()
    .withMessage('Security code must be entered')

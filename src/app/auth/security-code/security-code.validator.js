import { body } from 'express-validator'

export const validateSecurityCode = () =>
  body('securityCode')
    .trim()
    .notEmpty()
    .withMessage('Security code must be entered')

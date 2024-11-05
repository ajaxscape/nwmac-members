import { body } from 'express-validator'

export const validateMobileNumber = () =>
  body('mobileNumber')
    .trim()
    .notEmpty()
    .withMessage('Mobile number must be entered')

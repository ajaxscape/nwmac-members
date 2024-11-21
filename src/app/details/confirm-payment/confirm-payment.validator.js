import { body } from 'express-validator'

export const validateConfirmPayment = () =>
  body('confirmPayment')
    .trim()
    .notEmpty()
    .withMessage('Yes or No must be selected')

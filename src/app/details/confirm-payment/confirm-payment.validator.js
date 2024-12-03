import { body } from 'express-validator'

export const validateAmountPaid = () =>
  body('amountPaid')
    .trim()
    .escape()
    .matches(/^-?\d\d\d?\.\d\d$/)
    .withMessage(
      'Amount must be between 999.99 and 0.00 including the two decimal places'
    )

export const validatePaymentMethod = () =>
  body('paymentMethod')
    .trim()
    .notEmpty()
    .withMessage('Yes or No must be selected')

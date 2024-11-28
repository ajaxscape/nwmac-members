import { body } from 'express-validator'
import { FEES } from '#constants/fees.js'

export const validateFees = () =>
  body(FEES)
    .trim()
    .escape()
    .matches(/^-?\d\d?\.\d\d$/)
    .withMessage(
      'Amount must be between 99.99 and 0.00 including the two decimal places'
    )

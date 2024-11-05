import { body } from 'express-validator'

export const validateTrustBrowser = () =>
  body('trustBrowser')
    .trim()
    .notEmpty()
    .withMessage('Yes or No must be selected')

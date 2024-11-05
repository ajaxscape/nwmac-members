import { body } from 'express-validator'

export const validateAddressLine1 = () =>
  body('addressLine1')
    .trim()
    .notEmpty()
    .withMessage('Address line 1 must be entered')

export const validateTown = () =>
  body('town').trim().notEmpty().withMessage('Town must be entered')

export const validatePostcode = () =>
  body('postcode').trim().notEmpty().withMessage('Postcode must be entered')

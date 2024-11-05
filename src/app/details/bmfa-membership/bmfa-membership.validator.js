import { body } from 'express-validator'

export const validateBMFAThroughClub = () =>
  body('bmfaThroughClub')
    .trim()
    .notEmpty()
    .withMessage('Yes or No must be selected')

export const validateBMFANumber = () =>
  body('bmfaNumber')
    .if(body('bmfaThroughClub').equals('no'))
    .trim()
    .isLength({ min: 1, max: 6 })
    .withMessage('BMFA Number must be entered and contain up to 6 digits')

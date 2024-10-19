/**
 * Validate Age group
 */
import { body } from 'express-validator'

export const validateNonClubContact = () =>
  body('nonClubContact')
    .trim()
    .notEmpty()
    .withMessage('Yes or No must be selected')

import { body } from 'express-validator'

export const validateMembershipType = () =>
  body('membershipType')
    .trim()
    .notEmpty()
    .withMessage('Type of membership must be selected')

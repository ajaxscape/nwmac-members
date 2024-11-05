import { body } from 'express-validator'

export const validateAgeGroup = () =>
  body('ageGroup').trim().notEmpty().withMessage('Age group must be selected')

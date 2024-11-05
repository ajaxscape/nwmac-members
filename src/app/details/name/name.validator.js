import { body } from 'express-validator'

export const validateFirstName = () =>
  body('firstName').trim().notEmpty().withMessage('First name must be entered')

export const validateLastName = () =>
  body('lastName').trim().notEmpty().withMessage('Last name must be entered')

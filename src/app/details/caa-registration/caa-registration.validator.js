import { body } from 'express-validator'

export const validateOperatorId = () =>
  body('operatorId')
    .if(body('operatorIdRequired').exists())
    .trim()
    .isLength({ min: 12, max: 12 })
    .withMessage('Operator ID must be 12 characters long')

export const validateFlyerId = () =>
  body('flyerId')
    .if(body('flyerId').notEmpty({ ignore_whitespace: true }))
    .trim()
    .isLength({ min: 12, max: 12 })
    .withMessage('Flyer ID must be blank or 12 characters long')
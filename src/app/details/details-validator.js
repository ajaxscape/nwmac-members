import { body } from 'express-validator'

/**
 * Validate Name
 */

export const validateFirstName = () =>
  body('firstName').trim().notEmpty().withMessage('First name must be entered')

export const validateLastName = () =>
  body('lastName').trim().notEmpty().withMessage('Last name must be entered')

/**
 * Validate Membership type
 */

export const validateMembershipType = () =>
  body('membershipType')
    .trim()
    .notEmpty()
    .withMessage('Type of membership must be selected')

/**
 * Validate Age group
 */

export const validateAgeGroup = () =>
  body('ageGroup').trim().notEmpty().withMessage('Age group must be selected')

/**
 * Validate Address
 */

export const validateAddressLine1 = () =>
  body('addressLine1')
    .trim()
    .notEmpty()
    .withMessage('Address line 1 must be entered')

export const validateTown = () =>
  body('town').trim().notEmpty().withMessage('Town must be entered')

export const validatePostcode = () =>
  body('postcode').trim().notEmpty().withMessage('Postcode must be entered')

export const validateMobileNumber = () =>
  body('mobileNumber')
    .trim()
    .notEmpty()
    .withMessage('Mobile number must be entered')

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

export const validateOperatorId = () =>
  body('operatorId')
    .if(body('operatorIdRequired').notEmpty())
    .trim()
    .isLength({ min: 12, max: 12 })
    .withMessage('Operator ID must be 12 characters long')

export const validateFlyerId = () =>
  body('flyerId')
    .trim()
    .isLength({ min: 12, max: 12 })
    .withMessage('Flyer ID must be 12 characters long')

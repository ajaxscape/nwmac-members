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
 * Validate Age
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

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

export const validateAge = () =>
  body('age').trim().notEmpty().withMessage('Age must be selected')

/**
 * Validate Address
 */

export const validateAddressLine1 = () =>
  body('addressLine1')
    .trim()
    .notEmpty()
    .withMessage('Address line 1 must be entered')

export const validateTown = () =>
  body('addressTown').trim().notEmpty().withMessage('Town must be entered')

export const validatePostcode = () =>
  body('addressPostcode')
    .trim()
    .notEmpty()
    .withMessage('Postcode must be entered')

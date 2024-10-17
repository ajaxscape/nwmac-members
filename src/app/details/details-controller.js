import { validationResult } from 'express-validator'
import { storeData } from '../../lib/utils/store-session-data.js'

const redirectUrl = (page, res) =>
  `/details/${res.locals.data.state}/${res.locals.edit ? 'check-details' : page}`

/**
 * Enter Name
 */

export const viewEnterName = (req, res) => {
  res.render('pages/details/name', { locals: res.locals })
}

export const postEnterName = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/name', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('address', res))
}

/**
 * Enter Address
 */

export const viewEnterAddress = (req, res) => {
  res.render('pages/details/address', { locals: res.locals })
}

export const postEnterAddress = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/address', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('membership-type', res))
}

/**
 * Select Membership type
 */

export const viewSelectMembershipType = (req, res) => {
  res.render('pages/details/membership-type', { locals: res.locals })
}

export const postSelectMembershipType = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/membership-type', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('age-group', res))
}

/**
 * Select Age group
 */

export const viewEnterAgeGroup = (req, res) => {
  res.render('pages/details/age-group', { locals: res.locals })
}

export const postEnterAgeGroup = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/age-group', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('check-details', res))
}

/**
 * Check Details
 */

// details-controller.js
export const viewCheckDetails = (req, res) => {
  res.render('pages/details/check-details', { locals: res.locals })
}

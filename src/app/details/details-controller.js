import { validationResult } from 'express-validator'

/**
 * Select Membership type
 */

export const viewSelectMembershipType = (req, res) => {
  res.locals.data.membershipType = req.session.membershipType
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
  req.session.membershipType = res.locals.data.membershipType
  res.redirect(`/details/${res.locals.data.state}/age`)
}

/**
 * Select Age group
 */

export const viewEnterAge = (req, res) => {
  res.locals.data.age = req.session.age
  res.render('pages/details/age', { locals: res.locals })
}

export const postEnterAge = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/age', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  req.session.age = res.locals.data.age
  res.redirect(`/details/${res.locals.data.state}/name`)
}

/**
 * Enter Name
 */

export const viewEnterName = (req, res) => {
  res.locals.data.firstName = req.session.firstName
  res.locals.data.lastName = req.session.lastName
  res.locals.data.middleName = req.session.middleName
  res.locals.data.preferedName = req.session.preferedName
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
  req.session.firstName = res.locals.data.firstName
  req.session.lastName = res.locals.data.lastName
  req.session.middleName = res.locals.data.middleName
  req.session.preferedName = res.locals.data.preferedName
  res.redirect(`/details/${res.locals.data.state}/address`)
}

/**
 * Enter Address
 */

export const viewEnterAddress = (req, res) => {
  res.locals.data.addressLine1 = req.session.addressLine1
  res.locals.data.addressLine2 = req.session.addressLine2
  res.locals.data.town = req.session.town
  res.locals.data.county = req.session.county
  res.locals.data.postcode = req.session.postcode
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
  req.session.addressLine1 = res.locals.data.addressLine1
  req.session.addressLine2 = res.locals.data.addressLine2
  req.session.town = res.locals.data.town
  req.session.county = res.locals.data.county
  req.session.postcode = res.locals.data.postcode
  res.redirect(`/details/${res.locals.data.state}`)
}

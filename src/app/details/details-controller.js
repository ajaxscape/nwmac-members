import { validationResult } from 'express-validator'

const storeData = (req, res) => {
  Object.entries(res.locals.data).forEach(([key, value]) => {
    req.session[key] = value
  })
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
  res.redirect(`/details/${res.locals.data.state}/age`)
}

/**
 * Select Age group
 */

export const viewEnterAge = (req, res) => {
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
  storeData(req, res)
  res.redirect(`/details/${res.locals.data.state}/name`)
}

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
  res.redirect(`/details/${res.locals.data.state}/address`)
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
  res.redirect(`/details/${res.locals.data.state}`)
}

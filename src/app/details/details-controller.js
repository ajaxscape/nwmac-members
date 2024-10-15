import { validationResult } from 'express-validator'

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
  res.redirect(`/details/${res.locals.state}/age`)
}

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
  res.redirect(`/details/${res.locals.state}/name`)
}

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
  res.redirect(`/details/${res.locals.state}/address`)
}

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
  res.redirect(`/details/${res.locals.state}`)
}

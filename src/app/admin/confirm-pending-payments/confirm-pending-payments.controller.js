import { validationResult } from 'express-validator'

export const viewPaymentsConfirmed = async (req, res) => {
  const { data } = res.locals
  res.render('pages/admin/confirm-pending-payments', {
    locals: res.locals,
    data
  })
}

export const postPaymentsConfirmed = async (req, res) => {
  const { data } = res.locals
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/admin/confirm-pending-payments', {
      locals: res.locals,
      data,
      errors: errors.array()
    })
  }
}

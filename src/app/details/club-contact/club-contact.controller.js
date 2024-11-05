import { validationResult } from 'express-validator'
import { storeData } from '../../../lib/utils/store-session-data.js'

export const viewClubContact = async (req, res) => {
  res.render('pages/details/club-contact', { locals: res.locals })
}

export const postClubContact = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/club-contact', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)

  res.redirect('/details/name')
}

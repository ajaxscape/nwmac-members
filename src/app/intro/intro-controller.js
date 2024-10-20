/**
 * Select GDPR choice
 */
import { validationResult } from 'express-validator'
import { storeData } from '../../lib/utils/store-session-data.js'

export const viewGDPR = (req, res) => {
  res.render('pages/intro/gdpr', { locals: res.locals })
}

export const postGDPR = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/intro/gdpr', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  // ToDo sortout state
  res.redirect('/details/join/name')
}

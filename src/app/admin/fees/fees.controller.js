import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'
import renewalYear from '#utils/current-renewal-year.js'
import sentenceCase from '#utils/sentence-case.js'

const formatFees = (nextYearsFees = {}, currentYearsFees = {}) => {
  const nextFees = {
    ...{
      clubJunior: 0,
      clubSenior: 0,
      clubFamily: 0,
      bmfaJunior: 0,
      bmfaSenior: 0,
      bmfaFamilyPartner: 0,
      bmfaFamilyJunior: 0,
      bmfaNonFlyer: 0,
      caaOperatorRegistration: 0
    },
    ...nextYearsFees
  }
  return Object.entries(nextFees, currentYearsFees).map(([name, value]) => {
    return {
      name,
      title: sentenceCase(name),
      value: value.toFixed(2),
      type: sentenceCase(name).split(' ')[0],
      prevValue: (currentYearsFees[name] || 0).toFixed(2)
    }
  })
}

export const viewEnterFees = (req, res) => {
  const fees = formatFees({}, {})
  const currentRenewalYear = renewalYear()
  const nextRenewalYear = currentRenewalYear + 1
  res.render('pages/admin/fees', {
    locals: res.locals,
    fees,
    currentRenewalYear,
    nextRenewalYear
  })
}

export const postEnterFees = (req, res) => {
  const fees = formatFees({}, {})
  const currentRenewalYear = renewalYear()
  const nextRenewalYear = currentRenewalYear + 1
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('pages/admin/fees', {
      locals: res.locals,
      fees,
      currentRenewalYear,
      nextRenewalYear,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('/details', res))
}

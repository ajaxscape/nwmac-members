import { validationResult } from 'express-validator'
import renewalYear from '#utils/current-renewal-year.js'
import sentenceCase from '#utils/sentence-case.js'
import {
  getSubscription,
  upsertSubscription
} from '#repos/subscription.repository.js'
import { FEES } from '#constants/fees.js'

const feesTemplate = {}

FEES.forEach((feeType) => {
  feesTemplate[feeType] = 0
})

const formatFees = (currentYearsFees = {}, previousYearsFees = {}, isError) => {
  const currentFees = {
    ...feesTemplate,
    ...currentYearsFees
  }
  return Object.entries(currentFees)
    .filter(([name]) => name !== 'available')
    .map(([name, value]) => {
      const title = sentenceCase(name)
        .replace('Bmfa ', 'BMFA ')
        .replace('Caa ', 'CAA ')
      return {
        name,
        title,
        value: isError ? value : (value / 100).toFixed(2),
        type: title.split(' ')[0] + ' fees',
        prevValue: previousYearsFees[name] || 0
      }
    })
}

export const viewEnterFees = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const previousRenewalYear = currentRenewalYear - 1
  // eslint-disable-next-line no-unused-vars
  const { available, year, ...currentSubscription } =
    await getSubscription(currentRenewalYear)
  const fees = formatFees(
    currentSubscription,
    await getSubscription(previousRenewalYear)
  )
  res.render('pages/admin/fees', {
    locals: res.locals,
    fees,
    available: !!available,
    previousRenewalYear,
    currentRenewalYear
  })
}

export const postEnterFees = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const previousRenewalYear = currentRenewalYear - 1
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const previousSubscription = {}
    FEES.forEach(
      (feeType) => (previousSubscription[feeType] = req.body[feeType])
    )
    const fees = formatFees(
      previousSubscription,
      await getSubscription(previousRenewalYear),
      true
    )
    return res.render('pages/admin/fees', {
      locals: res.locals,
      fees,
      available: !!req.body.available,
      previousRenewalYear,
      currentRenewalYear,
      errors: errors.array()
    })
  }

  const subscription = { year: currentRenewalYear }
  Object.keys(feesTemplate).forEach(
    (key) => (subscription[key] = Number(req.body[key].trim().replace('.', '')))
  )

  subscription.available = !!req.body.available

  await upsertSubscription(subscription)

  res.redirect('/details')
}

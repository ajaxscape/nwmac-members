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

const formatFees = (nextYearsFees = {}, currentYearsFees = {}, isError) => {
  const nextFees = {
    ...feesTemplate,
    ...nextYearsFees
  }
  return Object.entries(nextFees)
    .filter(([name]) => name !== 'available')
    .map(([name, value]) => {
      return {
        name,
        title: sentenceCase(name),
        value: isError ? value : (value / 100).toFixed(2),
        type: sentenceCase(name).split(' ')[0],
        prevValue: (currentYearsFees[name] / 100 || 0).toFixed(2)
      }
    })
}

export const viewEnterFees = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const nextRenewalYear = currentRenewalYear + 1
  // eslint-disable-next-line no-unused-vars
  const { available, year, ...nextSubscription } =
    await getSubscription(nextRenewalYear)
  const fees = formatFees(
    nextSubscription,
    await getSubscription(currentRenewalYear)
  )
  res.render('pages/admin/fees', {
    locals: res.locals,
    fees,
    available: !!available,
    currentRenewalYear,
    nextRenewalYear
  })
}

export const postEnterFees = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const nextRenewalYear = currentRenewalYear + 1
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const currentSubscription = {}
    FEES.forEach(
      (feeType) => (currentSubscription[feeType] = req.body[feeType])
    )
    const fees = formatFees(
      currentSubscription,
      await getSubscription(currentRenewalYear),
      true
    )
    return res.render('pages/admin/fees', {
      locals: res.locals,
      fees,
      available: !!req.body.available,
      currentRenewalYear,
      nextRenewalYear,
      errors: errors.array()
    })
  }

  const subscription = { year: nextRenewalYear }
  Object.keys(feesTemplate).forEach(
    (key) => (subscription[key] = Number(req.body[key].trim().replace('.', '')))
  )

  subscription.available = !!req.body.available

  await upsertSubscription(subscription)

  res.redirect('/details')
}

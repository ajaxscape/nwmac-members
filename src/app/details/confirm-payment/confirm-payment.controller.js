import { redirectUrl } from '#utils/redirect-url.js'
import { validationResult } from 'express-validator'
import { upsertMemberSubscription } from '#repos/member-subscription.repository.js'
import logger from '../../../logger/logger.js'
import config from '#config/config.js'
import mapFees from '#utils/map-fees.js'
import buildMemberSubscription from '#utils/build-member-subscription.js'

export const viewEnterConfirmPayment = async (req, res) => {
  if (!req.session.fees.available) {
    return res.status(404).render('pages/error/not-found')
  }
  const memberSubscription = await buildMemberSubscription(res.locals.data)
  if (!memberSubscription) {
    return res.status(404).render('pages/error/not-found')
  }
  const {
    amountPaid,
    totalDue,
    confirmed,
    paymentMethod,
    paymentReference,
    fees
  } = memberSubscription
  if (confirmed) {
    return res.redirect(redirectUrl('payment-confirmation', res))
  }
  res.render('pages/details/confirm-payment', {
    locals: res.locals,
    amountPaid: (amountPaid || totalDue).toFixed(2),
    paymentMethod,
    paymentReference,
    ...config.bankDetails,
    fees: mapFees(fees),
    subscriptionYear: req.session.currentRenewalYear,
    confirmed
  })
}

export const postEnterConfirmPayment = async (req, res) => {
  const { amountPaid, paymentMethod, paymentReference } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const memberSubscription = await buildMemberSubscription(req.session)
    if (!memberSubscription) {
      return res.status(404).render('pages/error/not-found')
    }
    const { fees } = memberSubscription
    return res.render('pages/details/confirm-payment', {
      locals: res.locals,
      amountPaid,
      paymentMethod,
      paymentReference,
      ...config.bankDetails,
      fees: mapFees(fees),
      subscriptionYear: req.session.currentRenewalYear,
      errors: errors.array()
    })
  }
  const memberSubscriptionData = {
    memberId: req.session.memberId,
    subscriptionYear: req.session.currentRenewalYear,
    paymentMethod,
    paymentReference: paymentMethod === 'BACS' ? paymentReference : null, // clear if cash payment
    amountPaid: Number(amountPaid.trim().replace('.', ''))
  }
  try {
    await upsertMemberSubscription(memberSubscriptionData)
  } catch (error) {
    logger.error({ error }, `Failed to update member subscription to database`)
    return res
      .status(500)
      .render('pages/error/unhandled-exception.njk', { error })
  }
  res.redirect(redirectUrl('payment-confirmation', res))
}

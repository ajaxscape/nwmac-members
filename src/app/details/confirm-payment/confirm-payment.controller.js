import { redirectUrl } from '#utils/redirect-url.js'
import { validationResult } from 'express-validator'
import { upsertMemberSubscription } from '#repos/member-subscription.repository.js'
import logger from '../../../logger/logger.js'
import { FEES } from '#constants/fees.js'
import { getMemberById } from '#repos/member.repository.js'

async function buildMemberSubscription({ memberId, currentRenewalYear }) {
  const { memberSubscriptions, membershipNumber } =
    await getMemberById(memberId)
  const memberSubscription =
    memberSubscriptions?.length &&
    memberSubscriptions.find(
      ({ subscriptionYear }) => subscriptionYear === currentRenewalYear
    )
  const {
    amountPaid = 0,
    confirmed = false,
    paymentMethod = '',
    paymentReference = 'NWMAC-' + membershipNumber
  } = memberSubscription || {}
  const totalDue = memberSubscription
    ? FEES.reduce((acc, cur) => {
        return acc + memberSubscription[cur]
      }, 0)
    : 0
  return {
    amountPaid: (amountPaid || totalDue) / 100,
    confirmed,
    paymentMethod,
    paymentReference
  }
}

export const viewEnterConfirmPayment = async (req, res) => {
  const { available = false } = res.locals.data?.fees || {}
  if (!available) {
    return res.status(404).render('pages/error/not-found')
  }
  const { amountPaid, confirmed, paymentMethod, paymentReference } =
    await buildMemberSubscription(res.locals.data)
  if (confirmed) {
    return res.redirect(redirectUrl('payment-confirmation', res))
  }
  res.render('pages/details/confirm-payment', {
    locals: res.locals,
    amountPaid: amountPaid.toFixed(2),
    paymentMethod,
    paymentReference,
    subscriptionYear: req.session.currentRenewalYear,
    confirmed
  })
}

export const postEnterConfirmPayment = async (req, res) => {
  const { amountPaid, paymentMethod, paymentReference } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/confirm-payment', {
      locals: res.locals,
      amountPaid,
      paymentMethod,
      paymentReference,
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

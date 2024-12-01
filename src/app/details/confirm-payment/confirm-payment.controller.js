import { redirectUrl } from '#utils/redirect-url.js'
import { storeData } from '#utils/store-session-data.js'
import { validationResult } from 'express-validator'
import { upsertMemberSubscription } from '#repos/member-subscription.repository.js'
import logger from '../../../logger/logger.js'

export const viewEnterConfirmPayment = (req, res) => {
  res.render('pages/details/confirm-payment', {
    locals: res.locals
  })
}

export const postEnterConfirmPayment = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/confirm-payment', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  if (req.body.confirmPayment === 'yes') {
    const memberSubscriptionData = {
      memberId: req.session.memberId,
      subscriptionYear: req.session.currentRenewalYear,
      confirmed: true
    }
    try {
      await upsertMemberSubscription(memberSubscriptionData)
    } catch (error) {
      logger.error(
        { error },
        `Failed to update member subscription to database`
      )
      return res
        .status(500)
        .render('pages/error/unhandled-exception.njk', { error })
    }
    res.redirect(redirectUrl('payment-confirmation', res))
  } else {
    res.redirect(redirectUrl('', res))
  }
}

import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'
import memberSubscriptionStatuses from '#utils/member-subscription-statuses.js'

export const viewEnterCaaOperatorRegistration = async (req, res) => {
  const { subscriptionPaymentMade } = await memberSubscriptionStatuses(
    req.session.memberId
  )
  res.render('pages/details/caa-registration', {
    operatorIdRequired: req.session.ageGroup === 'senior',
    locals: res.locals,
    subscriptionPaymentMade
  })
}

export const postEnterCaaOperatorRegistration = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const { subscriptionPaymentMade } = await memberSubscriptionStatuses(
      req.session.memberId
    )
    return res.render('pages/details/caa-registration', {
      operatorIdRequired: req.session.ageGroup === 'senior',
      locals: res.locals,
      subscriptionPaymentMade,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('achievements', res))
}

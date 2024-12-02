import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'
import memberSubscriptionStatuses from '#utils/member-subscription-statuses.js'

export const viewSelectMembershipType = async (req, res) => {
  const { subscriptionPaymentMade } = await memberSubscriptionStatuses(
    req.session.memberId
  )
  if (subscriptionPaymentMade) {
    return res.redirect(redirectUrl('age-group', res))
  }
  res.render('pages/details/membership-type', { locals: res.locals })
}

export const postSelectMembershipType = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/membership-type', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('age-group', res))
}

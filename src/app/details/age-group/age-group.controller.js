import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'
import currentRenewalYear from '#utils/current-renewal-year.js'
import memberSubscriptionStatuses from '#utils/member-subscription-statuses.js'

export const viewEnterAgeGroup = async (req, res) => {
  const { subscriptionPaymentMade } = await memberSubscriptionStatuses(
    req.session.memberId
  )
  if (subscriptionPaymentMade) {
    return res.redirect(redirectUrl('bmfa-membership', res))
  }
  res.render('pages/details/age-group', {
    locals: res.locals,
    membershipYear: currentRenewalYear()
  })
}

export const postEnterAgeGroup = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/age-group', {
      locals: res.locals,
      membershipYear: currentRenewalYear(),
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('bmfa-membership', res))
}

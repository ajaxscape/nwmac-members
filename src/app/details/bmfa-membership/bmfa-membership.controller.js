import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'
import formatAmount from '#nunjucks-filters/format-amount.js'
import memberSubscriptionStatuses from '#utils/member-subscription-statuses.js'

function formatBmfaMembersCardLabel(data) {
  return `Approximately ${formatAmount(data?.fees?.bmfaMembersCard || 600)}`
}

function formatBmfaPrintedMagazineLabel(data) {
  return `Approximately ${formatAmount(data?.fees?.bmfaPrintedMagazine || 1000)}`
}

export const viewEnterBMFAMembership = async (req, res) => {
  const { subscriptionPaymentMade } = await memberSubscriptionStatuses(
    req.session.memberId
  )
  res.render('pages/details/bmfa-membership', {
    locals: res.locals,
    subscriptionPaymentMade,
    bmfaMembersCardLabel: formatBmfaMembersCardLabel(res.locals.data),
    bmfaPrintedMagazineLabel: formatBmfaPrintedMagazineLabel(res.locals.data)
  })
}

export const postEnterBMFAMembership = async (req, res) => {
  const { subscriptionPaymentMade } = await memberSubscriptionStatuses(
    req.session.memberId
  )
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/bmfa-membership', {
      locals: res.locals,
      subscriptionPaymentMade,
      bmfaMembersCardLabel: formatBmfaMembersCardLabel(res.locals.data),
      bmfaPrintedMagazineLabel: formatBmfaPrintedMagazineLabel(res.locals.data),
      errors: errors.array()
    })
  }
  if (!subscriptionPaymentMade) {
    const {
      bmfaMembersCardRequired,
      bmfaPrintedMagazineRequired,
      bmfaThroughClub
    } = res.locals.data
    res.locals.data.bmfaMembersCardRequired =
      bmfaThroughClub === 'yes' && !!bmfaMembersCardRequired
    res.locals.data.bmfaPrintedMagazineRequired =
      bmfaThroughClub === 'yes' && !!bmfaPrintedMagazineRequired
  }
  storeData(req, res)
  res.redirect(redirectUrl('caa-registration', res))
}

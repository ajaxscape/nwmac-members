import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'
import formatAmount from '#nunjucks-filters/format-amount.js'

function formatBmfaMembersCardHint(data) {
  return `Only available when registered through the club. <br>  Approximately ${formatAmount(data?.fees?.bmfaMembersCard || 600)}`
}

export const viewEnterBMFAMembership = (req, res) => {
  res.render('pages/details/bmfa-membership', {
    locals: res.locals,
    bmfaMembersCardHint: formatBmfaMembersCardHint(res.locals.data)
  })
}

export const postEnterBMFAMembership = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/bmfa-membership', {
      locals: res.locals,
      bmfaMembersCardHint: formatBmfaMembersCardHint(res.locals.data),
      errors: errors.array()
    })
  }
  const { bmfaMembersCardRequired, bmfaThroughClub } = res.locals.data
  res.locals.data.bmfaMembersCardRequired =
    bmfaThroughClub === 'yes' && !!bmfaMembersCardRequired
  storeData(req, res)
  res.redirect(redirectUrl('caa-registration', res))
}

import { getMembers } from '#repos/member.repository.js'
import currentRenewalYear from '#utils/current-renewal-year.js'
import { getSubscription } from '#repos/subscription.repository.js'

export const restoreData = async (req, res, next) => {
  if (!req.session.email) {
    return next()
  }

  const members = await getMembers({
    email: req.session.email
  })

  if (members?.length) {
    const member = members[0]

    for (const [mbrKey, mbrValue] of Object.entries(member)) {
      switch (mbrKey) {
        case 'createdAt':
        case 'updatedAt':
          break
        case 'id':
          req.session.memberId = mbrValue
          break
        case 'nonClubContact':
        case 'bmfaThroughClub':
          if (typeof mbrValue === 'boolean') {
            req.session[mbrKey] = mbrValue ? 'yes' : 'no'
          } else {
            req.session[mbrKey] = mbrValue
          }
          break
        case 'mobile':
          req.session.mobileNumber = mbrValue
          break
        case 'address':
          if (!mbrValue) {
            break
          }
          for (const [addrKey, addrValue] of Object.entries(mbrValue)) {
            switch (addrKey) {
              case 'createdAt':
              case 'updatedAt':
              case 'id':
                break
              default:
                req.session[addrKey] = addrValue
            }
          }
          break
        case 'memberAchievements':
          if (!mbrValue) {
            break
          }
          req.session.achievements = mbrValue.map(
            ({ achievementId }) => achievementId
          )
          break
        default:
          req.session[mbrKey] = mbrValue
      }
    }
  }

  next()
}

export const setLocals = (req, res, next) => {
  switch (req.method.toLowerCase()) {
    case 'get':
      res.locals.data = { ...res.locals.data, ...req.session }
      break
    case 'post':
      res.locals.data = { ...req.body }
      break
    default:
      break
  }
  const { operatorId, flyerId, achievements } = res.locals.data
  if (operatorId) {
    res.locals.data.operatorId = operatorId.toUpperCase()
  }
  if (flyerId) {
    res.locals.data.flyerId = flyerId.toUpperCase()
  }
  if (achievements) {
    res.locals.data.achievements = [achievements].flat()
  }
  res.locals.data.currentRenewalYear = currentRenewalYear()
  next()
}

export const authenticate = (req, res, next) => {
  if (!req.session.email) {
    req.session.nextUrl = req.originalUrl
    return res.redirect(`/auth`)
  }
  next()
}

export const registerMembershipState = (req, res, next) => {
  res.locals.edit = req.url.split('/').some((tag) => tag === 'edit')
  next()
}

export const registerCurrentFees = async (req, res, next) => {
  req.session.fees = await getSubscription(currentRenewalYear())
  next()
}

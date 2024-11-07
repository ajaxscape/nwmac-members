import { getMembers } from '../repositories/member.repository.js'

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
      if (mbrKey === 'address' && Array.isArray(mbrValue)) {
        const address = mbrValue[0]
        for (const [addrKey, addrValue] of Object.entries(address)) {
          req.session[addrKey === 'id' ? 'addressId' : addrKey] = addrValue
        }
      } else {
        req.session[mbrKey === 'id' ? 'memberId' : mbrKey] = mbrValue
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
  next()
}

export const authenticate = (req, res, next) => {
  if (!req.session.email) {
    return res.redirect('/auth')
  }
  next()
}

export const registerMembershipState = (req, res, next) => {
  res.locals.edit = req.url.split('/').some((tag) => tag === 'edit')
  next()
}

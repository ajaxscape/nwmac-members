import { getMembers } from '../repositories/member.repository.js'

export const restoreData = async (req, res, next) => {
  if (req.signedCookies.email) {
    const members = await getMembers({ email: req.signedCookies.email })
    if (members?.length) {
      Object.entries(members[0]).forEach(([key, value]) => {
        if (key === 'id') {
          key = 'memberId'
        }
        req.session[key] = value
      })
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

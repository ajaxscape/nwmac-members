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
  next()
}

export const authenticate = (req, res, next) => {
  if (!req.session.email) {
    return res.redirect('/auth/enter-email')
  }
  next()
}

export const registerMembershipState = (req, res, next) => {
  const { state } = req.params || {}
  if (!['join', 'renew'].includes(state)) {
    return res.status(404)
  }
  res.locals.data.state = state
  res.locals.edit = req.url.split('/').some((tag) => tag === 'edit')
  next()
}

export const setLocals = (req, res, next) => {
  if (req.body) {
    res.locals.data = { ...req.body }
  }
  next()
}

export const authenticate = (req, res, next) => {
  if (!req.session.email) {
    return res.redirect('/auth/login')
  }
  next()
}

export const registerMembershipState = (req, res, next) => {
  const { state } = req.params || {}
  if (!['join', 'renew'].includes(state)) {
    return res.status(404)
  }
  res.locals.data.state = state
  next()
}

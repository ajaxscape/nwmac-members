const registerMembershipState = (req, res, next) => {
  const { state } = req.params || {}
  if (!['join', 'renew'].includes(state)) {
    return res.status(404)
  }
  res.locals.state = state
  next()
}

module.exports = {
  registerMembershipState
}

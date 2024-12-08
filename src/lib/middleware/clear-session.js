export default (req, res, next) => {
  // Clear session
  for (const sessionKey of Object.keys(req.session)) {
    if (sessionKey !== 'nextUrl') {
      delete req.session[sessionKey]
    }
  }
  next()
}

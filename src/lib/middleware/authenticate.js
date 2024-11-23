export default (req, res, next) => {
  if (!req.session.email) {
    req.session.nextUrl = req.originalUrl
    return res.redirect(`/auth`)
  }
  next()
}

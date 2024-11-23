export default (req, res, next) => {
  res.locals.edit = req.url.split('/').some((tag) => tag === 'edit')
  next()
}

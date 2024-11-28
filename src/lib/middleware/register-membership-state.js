export default (req, res, next) => {
  res.locals.edit = req.originalUrl.split('/').includes('edit')
  next()
}

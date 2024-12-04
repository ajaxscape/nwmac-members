export default (req, res, next) => {
  if (req.session.isSecretary || req.session.isTreasurer) {
    next()
  } else {
    res.status(404).render('pages/error/not-found')
  }
}

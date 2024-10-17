export const storeData = (req, res) => {
  Object.entries(res.locals.data).forEach(([key, value]) => {
    req.session[key] = value
  })
}

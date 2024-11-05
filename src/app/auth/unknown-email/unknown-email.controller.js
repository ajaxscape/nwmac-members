export const viewUnknownEmail = (req, res) => {
  const { email } = req.session.email
  res.render('pages/auth/unknown-email', {
    locals: res.locals,
    data: { email }
  })
}

export const postUnknownEmail = (req, res) => {
  res.redirect('/auth/send-confirmation-email')
}

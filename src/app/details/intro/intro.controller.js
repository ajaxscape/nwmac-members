export const viewIntro = (req, res) => {
  res.render('pages/details/intro', { locals: res.locals });
}

export const postIntro = (req, res) => {
  res.redirect('/details/non-club-contact');
}
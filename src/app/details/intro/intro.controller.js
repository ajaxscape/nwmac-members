import { getAchievements } from '#repos/achievement.repository.js'

export const viewIntro = async (req, res) => {
  const achievements = await getAchievements()
  res.render('pages/details/intro', {
    locals: res.locals,
    feesAvailable: res.locals.data.fees.available,
    achievements
  })
}

export const postIntro = (req, res) => {
  res.redirect('/details/non-club-contact')
}

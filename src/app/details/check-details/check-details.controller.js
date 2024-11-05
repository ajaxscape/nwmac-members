/**
 * Check Details
 */
import { getAchievements } from '../../../repositories/achievement.repository.js'
import { redirectUrl } from '../middleware/redirect-url.js'

// redirect-url.js
export const viewCheckDetails = async (req, res) => {
  const achievements = await getAchievements()
  res.render('pages/details/check-details', {
    locals: res.locals,
    achievements
  })
}

export const postCheckDetails = (req, res) => {
  res.redirect(redirectUrl('confirmation-of-details', res))
}

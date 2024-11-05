/**
 * Select achievements
 */
import { getAchievementCategories } from '../../../repositories/achievement-category.repository.js'
import { getAchievements } from '../../../repositories/achievement.repository.js'
import { validationResult } from 'express-validator'
import { storeData } from '../../../lib/utils/store-session-data.js'
import { redirectUrl } from '../middleware/redirect-url.js'

const retrieveAchievements = async (data) => {
  const achievementCategories = await getAchievementCategories()
  return Promise.all(
    achievementCategories.map(async (category) => {
      const achievements = (
        await getAchievements({
          achievementCategoryId: category.id
        })
      ).map((achievement) => {
        return {
          ...achievement,
          checked:
            data?.achievements?.map(Number).includes(achievement.id) ?? false
        }
      })
      return { ...category, achievements }
    })
  )
}

export const viewSelectAchievements = async (req, res) => {
  res.render('pages/details/achievements', {
    locals: res.locals,
    achievementsByCategory: await retrieveAchievements(res.locals.data)
  })
}

export const postSelectAchievements = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/achievements', {
      locals: res.locals,
      achievementsByCategory: await retrieveAchievements(res.locals.data),
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('check-details', res))
}

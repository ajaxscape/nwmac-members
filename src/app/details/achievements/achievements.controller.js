import { getAchievementCategories } from '#repos/achievement-category.repository.js'
import { validationResult } from 'express-validator'
import { storeData } from '#utils/store-session-data.js'
import { redirectUrl } from '#utils/redirect-url.js'
import { getAchievements } from '#repos/achievement.repository.js'

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
  if (!res.locals.data.achievements) {
    res.locals.data.achievements = []
  }
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

import prisma from './utils/prisma-client.js'

export function getAchievementCategories(data, tx = prisma) {
  return tx.achievementCategory.findMany(data && { where: data })
}

export function upsertAchievementCategory(data, tx = prisma) {
  const { id, ...rest } = data || {}
  return tx.achievementCategory.upsert({
    update: rest,
    create: rest,
    where: { id }
  })
}

export function getAchievementCategoryById(id, tx = prisma) {
  return tx.achievementCategory.findUnique({ where: { id } })
}

export function deleteAchievementCategory(id, tx = prisma) {
  return tx.achievementCategory.delete({ where: { id } })
}

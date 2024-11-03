import prisma from './utils/prisma-client.js'

export function getAchievements(data, tx = prisma) {
  return tx.achievement.findMany(data && { where: data })
}

export function upsertAchievement(data, tx = prisma) {
  const { id, ...rest } = data || {}
  return tx.achievement.upsert({
    update: rest,
    create: rest,
    where: { id }
  })
}

export function getAchievementById(id, tx = prisma) {
  return tx.achievement.findUnique({ where: { id } })
}

export function deleteAchievement(id, tx = prisma) {
  return tx.achievement.delete({ where: { id } })
}

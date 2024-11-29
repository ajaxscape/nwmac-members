import prisma from './utils/prisma-client.js'

export function getMemberAchievementsByMemberId(memberId, tx = prisma) {
  return tx.memberAchievement.findMany({ where: { memberId } })
}

export function getMemberAchievementsByAchievementId(
  achievementId,
  tx = prisma
) {
  return tx.memberAchievement.findMany({ where: { achievementId } })
}

export function createMemberAchievementsByMemberId(
  memberId,
  achievementIds,
  tx = prisma
) {
  return tx.memberAchievement.createMany({
    data: achievementIds.map((id) => ({
      memberId,
      achievementId: Number(id)
    }))
  })
}

export function deleteMemberAchievementsByMemberId(memberId, tx = prisma) {
  try {
    return tx.memberAchievement.deleteMany({ where: { memberId } })
  } catch (error) {
    console.error(JSON.stringify({ error }, null, 2))
  }
}

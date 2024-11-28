import prisma from './utils/prisma-client.js'
import nextMembershipNumber from '#repos/utils/next-membership-number.js'

export function getMembers(data, tx = prisma) {
  const options = {
    include: {
      address: true,
      memberAchievements: true,
      memberCommitteeRoles: {
        include: {
          committeeRole: true
        }
      },
      memberSubscriptions: {
        include: {
          subscription: true
        }
      }
    }
  }
  if (data) {
    options.where = data
  }
  return tx.member.findMany(options)
}

export async function upsertMember(data, tx = prisma) {
  const { id, ...rest } = data || {}
  // Make sure the membership number is set to the next number if it hasn't been set
  if (!rest.membershipNumber) {
    rest.membershipNumber = await nextMembershipNumber()
  }

  if (id) {
    return tx.member.update({
      data: rest,
      where: { id }
    })
  } else {
    return tx.member.create({ data: rest })
  }
}

export function getMemberById(id, tx = prisma) {
  return tx.member.findUnique({
    include: {
      address: true,
      memberAchievements: true,
      memberCommitteeRoles: {
        include: {
          committeeRole: true
        }
      },
      memberSubscriptions: {
        include: {
          subscription: true
        }
      }
    },
    where: { id }
  })
}

export function deleteMember(id, tx = prisma) {
  return tx.member.delete({ where: { id } })
}

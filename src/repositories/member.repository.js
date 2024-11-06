import prisma from './utils/prisma-client.js'

export function getMembers(data, tx = prisma) {
  return tx.member.findMany(data && { where: data })
}

export function upsertMember(data, tx = prisma) {
  const { id, ...rest } = data || {}
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
  return tx.member.findUnique({ where: { id } })
}

export function deleteMember(id, tx = prisma) {
  return tx.member.delete({ where: { id } })
}

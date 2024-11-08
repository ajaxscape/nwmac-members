import prisma from './utils/prisma-client.js'

export function getAddresses(data, tx = prisma) {
  return tx.address.findMany(data && { where: data })
}

export function upsertAddress(data, tx = prisma) {
  const { id, ...rest } = data || {}
  if (id) {
    return tx.address.update({
      data: rest,
      where: { id }
    })
  } else {
    return tx.address.create({ data: rest })
  }
}

export function getAddressById(id, tx = prisma) {
  return tx.address.findUnique({ where: { id } })
}

export function deleteAddress(id, tx = prisma) {
  return tx.address.delete({ where: { id } })
}

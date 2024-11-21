import prisma from './utils/prisma-client.js'

export async function getSubscription(year, tx = prisma) {
  return (await tx.subscription.findUnique({ where: { year } })) || {}
}

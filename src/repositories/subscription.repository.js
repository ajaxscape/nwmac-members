import prisma from './utils/prisma-client.js'

export async function getSubscription(year, tx = prisma) {
  return tx.subscription.findUnique({ where: { year } })
}

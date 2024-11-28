import prisma from './utils/prisma-client.js'
import { FEES } from '#constants/fees.js'

const buildSelects = () => {
  const selects = {}
  FEES.forEach((feeType) => {
    selects[feeType] = true
  })
  selects.available = true
  selects.year = true
  return selects
}

export async function getSubscription(year, tx = prisma) {
  return (
    (await tx.subscription.findUnique({
      select: buildSelects(),
      where: { year }
    })) || {}
  )
}
export async function getLatestSubscription(tx = prisma) {
  return (
    (
      await tx.subscription.findMany({
        select: buildSelects(),
        orderBy: [
          {
            year: 'desc'
          }
        ],
        take: 1
      })
    )?.pop() || {}
  )
}
export async function upsertSubscription(data, tx = prisma) {
  const { year, ...rest } = data || {}
  const subscription = await getSubscription(year, tx)
  if (subscription?.year) {
    return tx.subscription.update({
      data: rest,
      where: { year: subscription.year }
    })
  } else {
    return tx.subscription.create({ data })
  }
}

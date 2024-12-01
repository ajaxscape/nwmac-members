import prisma from '#repos/utils/prisma-client.js'
import { FEES } from '#constants/fees.js'

const buildSelects = () => {
  const selects = {}
  FEES.forEach((feeType) => {
    selects[feeType] = true
  })
  selects.amountPaid = true
  selects.paymentMethod = true
  selects.confirmed = true
  return selects
}

export async function getMemberSubscription(
  memberId,
  subscriptionYear,
  tx = prisma
) {
  const result = await tx.memberSubscription.findMany({
    select: buildSelects(),
    where: { memberId, subscriptionYear }
  })
  return result[0] ?? null
}

export async function upsertMemberSubscription(data, tx = prisma) {
  const { memberId, subscriptionYear } = data || {}
  const memberSubscription = await getMemberSubscription(
    memberId,
    subscriptionYear,
    tx
  )
  return tx.$transaction(async (tx) => {
    // Delete existing here if it exists
    if (memberSubscription) {
      data = { ...memberSubscription, ...data }
      await tx.memberSubscription.deleteMany({
        where: { memberId, subscriptionYear }
      })
    }
    // Create a new one with updated data here
    return tx.memberSubscription.create({ data })
  })
}

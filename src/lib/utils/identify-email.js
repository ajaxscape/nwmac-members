import { getMembers } from '#repos/member.repository.js'

export async function identifyEmail(email) {
  const member = await getMembers({ email })
  return Promise.resolve(member[0])
}

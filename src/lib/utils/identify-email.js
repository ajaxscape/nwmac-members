import { getMembers } from '../../repositories/member.repository.js'

export async function identifyEmail(email) {
  const member = await getMembers({ email })
  return Promise.resolve(member[0])
}

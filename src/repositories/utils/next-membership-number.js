import { getMembers } from '#repos/member.repository.js'

export default async () => {
  const members = await getMembers()
  return members.reduce(
    (lastMembershipNumber, { membershipNumber }) =>
      membershipNumber < lastMembershipNumber
        ? lastMembershipNumber
        : membershipNumber + 1,
    1
  )
}

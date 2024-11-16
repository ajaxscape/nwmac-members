import { getMembers } from '#repos/member.repository.js'

export default async () => {
  const members = await getMembers()
  const clubSecretary = members.find(({ memberCommitteeRoles }) =>
    memberCommitteeRoles.find(
      ({ committeeRole }) => committeeRole.title === 'Secretary'
    )
  )

  return `${
    clubSecretary.preferredName
      ? clubSecretary.preferredName
      : clubSecretary.firstName
  } ${clubSecretary.lastName}`
}

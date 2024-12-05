import { getMembers } from '#repos/member.repository.js'

export default async () => {
  const members = await getMembers()
  const clubTreasurer = members.find(({ memberCommitteeRoles }) =>
    memberCommitteeRoles.find(
      ({ committeeRole }) => committeeRole.title === 'Treasurer'
    )
  )

  return `${
    clubTreasurer?.preferredName
      ? clubTreasurer.preferredName
      : (clubTreasurer?.firstName ?? '')
  } ${clubTreasurer?.lastName ?? ''}`.trim()
}

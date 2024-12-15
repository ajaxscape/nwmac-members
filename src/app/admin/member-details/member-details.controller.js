import { getMembers } from '#repos/member.repository.js'
import { getAchievements } from '#repos/achievement.repository.js'

export const viewMemberDetails = async (req, res) => {
  const { membershipNumber } = req.params || {}
  if (!membershipNumber) {
    return res.status(404).render('pages/error/not-found')
  }
  const [member] =
    (await getMembers({ membershipNumber: Number(membershipNumber) })) || []
  if (!member) {
    return res.status(404).render('pages/error/not-found')
  }
  const { address, nonClubContact, mobile, memberAchievements, ...result } =
    member

  const data = {
    ...result,
    ...address,
    nonClubContact: nonClubContact ? 'yes' : 'no',
    mobileNumber: mobile,
    achievements:
      memberAchievements?.map(({ achievementId }) => achievementId) ?? null
  }

  const achievements = await getAchievements()

  res.render('pages/admin/member-details', { data, achievements })
}

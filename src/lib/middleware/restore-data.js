import { getMembers } from '#repos/member.repository.js'

export default async (req, res, next) => {
  if (!req.session.email) {
    return next()
  }

  const members = await getMembers({
    email: req.session.email
  })

  if (members?.length) {
    const member = members[0]

    for (const [mbrKey, mbrValue] of Object.entries(member)) {
      switch (mbrKey) {
        case 'createdAt':
        case 'updatedAt':
          break
        case 'id':
          req.session.memberId = mbrValue
          break
        case 'nonClubContact':
        case 'bmfaThroughClub':
          if (typeof mbrValue === 'boolean') {
            req.session[mbrKey] = mbrValue ? 'yes' : 'no'
          } else {
            req.session[mbrKey] = mbrValue
          }
          break
        case 'mobile':
          req.session.mobileNumber = mbrValue
          break
        case 'address':
          if (!mbrValue) {
            break
          }
          for (const [addrKey, addrValue] of Object.entries(mbrValue)) {
            switch (addrKey) {
              case 'createdAt':
              case 'updatedAt':
              case 'id':
                break
              default:
                req.session[addrKey] = addrValue
            }
          }
          break
        case 'memberAchievements':
          if (!mbrValue) {
            break
          }
          req.session.achievements = mbrValue.map(
            ({ achievementId }) => achievementId
          )
          break
        case 'memberCommitteeRoles':
          if (!mbrValue?.length) {
            break
          }
          mbrValue.forEach(({ committeeRole }) => {
            if (committeeRole.title === 'Secretary') {
              req.session.isSecretary = true
            }
            if (committeeRole.title === 'Treasurer') {
              req.session.isTreasurer = true
            }
          })
          break
        default:
          req.session[mbrKey] = mbrValue
      }
    }
  }

  next()
}

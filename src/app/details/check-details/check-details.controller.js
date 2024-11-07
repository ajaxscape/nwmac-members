/**
 * Check Details
 */
import { getAchievements } from '../../../repositories/achievement.repository.js'
import { redirectUrl } from '../middleware/redirect-url.js'
import { upsertAddress } from '../../../repositories/address.repository.js'
import { upsertMember } from '../../../repositories/member.repository.js'
import prisma from '../../../repositories/utils/prisma-client.js'

// redirect-url.js
export const viewCheckDetails = async (req, res) => {
  const achievements = await getAchievements()
  res.render('pages/details/check-details', {
    locals: res.locals,
    achievements
  })
}

export const postCheckDetails = async (req, res) => {
  const {
    memberId,
    addressId,
    membershipNumber,
    membershipType,
    firstName,
    lastName,
    middleName,
    preferredName,
    addressLine1,
    addressLine2,
    town,
    county,
    postcode,
    email,
    mobileNumber,
    landline,
    ageGroup,
    // achievements,
    bmfaNumber,
    bmfaThroughClub,
    operatorId,
    flyerId,
    nonClubContact
  } = req.session

  await prisma.$transaction(async (tx) => {
    const address = await upsertAddress(
      {
        id: addressId,
        addressLine1,
        addressLine2,
        town,
        county,
        postcode
      },
      tx
    )

    const member = await upsertMember(
      {
        id: memberId,
        firstName,
        lastName,
        middleName,
        preferredName,
        email,
        mobile: mobileNumber,
        landline,
        ageGroup,
        bmfaNumber: Number(bmfaNumber),
        bmfaThroughClub: bmfaThroughClub === 'yes',
        operatorId,
        flyerId,
        nonClubContact: nonClubContact === 'yes',
        membershipNumber,
        membershipType,
        addressId: address.id
      },
      tx
    )

    console.log(JSON.stringify(member, null, 2))
  })
  res.redirect(redirectUrl('confirmation-of-details', res))
}

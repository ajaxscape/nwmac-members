import { getAchievements } from '#repos/achievement.repository.js'
import { redirectUrl } from '#utils/redirect-url.js'
import { upsertAddress } from '#repos/address.repository.js'
import { upsertMember } from '#repos/member.repository.js'
import prisma from '#repos/utils/prisma-client.js'
import {
  createMemberAchievementsByMemberId,
  deleteMemberAchievementsByMemberId
} from '#repos/member-achievement.repository.js'
import { validationResult } from 'express-validator'

/**
 * Load the body with the session data so the validators will work correctly
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const loadBodyForValidation = async (req, res, next) => {
  Object.keys(req.session).forEach((key) => {
    req.body[key] = req.session[key] ?? null
  })
  next()
}

export const viewCheckDetails = async (req, res) => {
  const achievements = await getAchievements()
  res.render('pages/details/check-details', {
    locals: res.locals,
    achievements
  })
}

export const postCheckDetails = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const summaryErrors = errors.array().map(({ path, ...rest }) => {
      switch (path) {
        case 'firstName':
        case 'lastName':
          return { ...rest, path: 'name' }
        case 'addressLine1':
        case 'town':
        case 'postcode':
          return { ...rest, path: 'address' }
        default:
          return { ...rest, path }
      }
    })
    res.locals.data = { ...res.locals.data, ...req.body }
    const errorFields = summaryErrors.reduce(
      (fields, { path }) => ({ ...fields, [path]: true }),
      {}
    )
    const achievements = await getAchievements()
    return res.render('pages/details/check-details', {
      locals: res.locals,
      achievements,
      errors: summaryErrors,
      errorFields
    })
  }

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
    achievements,
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

    await deleteMemberAchievementsByMemberId(member.id, tx)
    await createMemberAchievementsByMemberId(member.id, achievements, tx)
  })

  res.redirect(redirectUrl('send-confirmation-email', res))
}

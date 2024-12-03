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
import calculateFees from '#utils/calculate-fees.js'
import mapFees from '#utils/map-fees.js'
import logger from '../../../logger/logger.js'
import { upsertMemberSubscription } from '#repos/member-subscription.repository.js'
import currentRenewalYear from '#utils/current-renewal-year.js'
import { getSubscription } from '#repos/subscription.repository.js'
import memberSubscriptionStatuses from '#utils/member-subscription-statuses.js'
import defaultBankReference from '#nunjucks-filters/default-bank-reference.js'

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
    if (key === 'operatorIdRequired' && req.session.ageGroup === 'junior') {
      /* empty */
    } else {
      req.body[key] = req.session[key] ?? null
    }
  })
  next()
}

export const viewCheckDetails = async (req, res) => {
  const { subscriptionPaymentMade, subscriptionAvailable } =
    await memberSubscriptionStatuses(req.session.memberId)
  const achievements = await getAchievements()
  const fees = mapFees(calculateFees(req.session))
  res.render('pages/details/check-details', {
    locals: res.locals,
    achievements,
    fees,
    subscriptionPaymentMade,
    subscriptionAvailable,
    year: currentRenewalYear()
  })
}

export const postCheckDetails = async (req, res) => {
  const { subscriptionAvailable, subscriptionPaymentMade } =
    await memberSubscriptionStatuses(req.session.memberId)
  const errors = validationResult(req)
  const calculatedFees = calculateFees(req.session)
  const fees = mapFees(calculatedFees)

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
        case 'mobileNumber':
          return { ...rest, path: 'phoneNumbers' }
        case 'bmfaThroughClub':
        case 'bmfaNumber':
          return { ...rest, path: 'bmfaMembership' }
        case 'caaThroughClub':
        case 'flyerId':
        case 'operatorId':
          return { ...rest, path: 'caaRegistration' }
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
    const { available = false } =
      (await getSubscription(currentRenewalYear())) || {}
    return res.render('pages/details/check-details', {
      locals: res.locals,
      achievements,
      fees,
      subscriptionPaymentMade,
      subscriptionAvailable,
      year: currentRenewalYear(),
      feesAvailable: available,
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
    bmfaMembersCardRequired,
    caaThroughClub,
    operatorId,
    flyerId,
    nonClubContact
  } = req.session

  try {
    return await prisma.$transaction(async (tx) => {
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
          caaThroughClub: caaThroughClub === 'yes',
          bmfaMembersCardRequired,
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

      if (req.session.membershipNumber) {
        if (subscriptionPaymentMade || !subscriptionAvailable) {
          return res.redirect(
            redirectUrl('send-details-confirmation-email', res)
          )
        } else {
          delete calculatedFees.total
          const memberSubscriptionData = {
            memberId: member.id,
            subscriptionYear: req.session.currentRenewalYear,
            paymentReference: defaultBankReference(
              req.session.membershipNumber
            ),
            ...calculatedFees
          }
          await upsertMemberSubscription(memberSubscriptionData)
          return res.redirect(
            redirectUrl('send-renewal-confirmation-email', res)
          )
        }
      } else {
        return res.redirect(
          redirectUrl('send-application-confirmation-email', res)
        )
      }
    })
  } catch (error) {
    logger.error({ error }, `Failed to save member ${email} to database`)
    return res
      .status(500)
      .render('pages/error/unhandled-exception.njk', { error })
  }
}

import { validationResult } from 'express-validator'
import { storeData } from '../../lib/utils/store-session-data.js'
import { getAchievementCategories } from '../../repositories/achievement-category.repository.js'
import { getAchievements } from '../../repositories/achievement.repository.js'

const redirectUrl = (page, res) =>
  `/details/${res.locals.data.state}/${res.locals.edit ? 'check-details' : page}`

/**
 * Enter Name
 */

export const viewEnterName = (req, res) => {
  res.render('pages/details/name', { locals: res.locals })
}

export const postEnterName = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/name', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('address', res))
}

/**
 * Enter Address
 */

export const viewEnterAddress = (req, res) => {
  res.render('pages/details/address', { locals: res.locals })
}

export const postEnterAddress = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/address', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('phone-numbers', res))
}

/**
 * Enter Phone
 */

export const viewEnterPhoneNumbers = (req, res) => {
  res.render('pages/details/phone-numbers', { locals: res.locals })
}

export const postEnterPhoneNumbers = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/phone-numbers', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('membership-type', res))
}

/**
 * Select Membership type
 */

export const viewSelectMembershipType = (req, res) => {
  res.render('pages/details/membership-type', { locals: res.locals })
}

export const postSelectMembershipType = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/membership-type', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('age-group', res))
}

/**
 * Select Age group
 */

export const viewEnterAgeGroup = (req, res) => {
  res.render('pages/details/age-group', { locals: res.locals })
}

export const postEnterAgeGroup = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/age-group', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('bmfa-membership', res))
}

/**
 * Select BMFA membership
 */

export const viewEnterBMFAMembership = (req, res) => {
  res.render('pages/details/bmfa-membership', { locals: res.locals })
}

export const postEnterBMFAMembership = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/bmfa-membership', {
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('caa-registration', res))
}

/**
 * Enter CAA registration
 */

export const viewEnterCAARegistration = (req, res) => {
  res.render('pages/details/caa-registration', {
    operatorIdRequired: req.session.ageGroup === 'senior',
    locals: res.locals
  })
}

export const postEnterCAARegistration = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/caa-registration', {
      operatorIdRequired: req.session.ageGroup === 'senior',
      locals: res.locals,
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('achievements', res))
}

/**
 * Select achievements
 */

const retrieveAchievements = async (data) => {
  const achievementCategories = await getAchievementCategories()
  return Promise.all(
    achievementCategories.map(async (category) => {
      const achievements = (
        await getAchievements({
          achievementCategoryId: category.id
        })
      ).map((achievement) => {
        return {
          ...achievement,
          checked:
            data?.achievements?.map(Number).includes(achievement.id) ?? false
        }
      })
      return { ...category, achievements }
    })
  )
}

export const viewSelectAchievements = async (req, res) => {
  res.render('pages/details/achievements', {
    locals: res.locals,
    achievementsByCategory: await retrieveAchievements(res.locals.data)
  })
}

export const postSelectAchievements = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('pages/details/achievements', {
      locals: res.locals,
      achievementsByCategory: await retrieveAchievements(res.locals.data),
      errors: errors.array()
    })
  }
  storeData(req, res)
  res.redirect(redirectUrl('check-details', res))
}

/**
 * Check Details
 */

// details-controller.js
export const viewCheckDetails = async (req, res) => {
  const achievements = await getAchievements()
  res.render('pages/details/check-details', {
    locals: res.locals,
    achievements
  })
}

export const postCheckDetails = (req, res) => {
  res.redirect(redirectUrl('confirmation', res))
}
/**
 * Confirmation
 */

// details-controller.js
export const viewConfirmation = (req, res) => {
  res.render('pages/details/confirmation', { locals: res.locals })
}

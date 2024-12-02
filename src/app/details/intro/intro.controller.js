import { getAchievements } from '#repos/achievement.repository.js'
import memberSubscriptionStatuses from '#utils/member-subscription-statuses.js'

export const viewIntro = async (req, res) => {
  const achievements = await getAchievements()
  const {
    subscriptionAvailable,
    subscriptionPaymentRequired,
    subscriptionPaymentPending,
    subscriptionPaymentConfirmed
  } = await memberSubscriptionStatuses(res.locals.data.memberId)

  res.render('pages/details/intro', {
    locals: res.locals,
    subscriptionAvailable,
    subscriptionPaymentRequired,
    subscriptionPaymentPending,
    subscriptionPaymentConfirmed,
    achievements
  })
}

export const postIntro = (req, res) => {
  res.redirect('/details/non-club-contact')
}

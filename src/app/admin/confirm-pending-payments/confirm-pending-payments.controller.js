import { getMembers } from '#repos/member.repository.js'
import formatName from '#nunjucks-filters/format-name.js'
import renewalYear from '#utils/current-renewal-year.js'
import buildMemberSubscription from '#utils/build-member-subscription.js'
import { upsertMemberSubscription } from '#repos/member-subscription.repository.js'
import logger from '../../../logger/logger.js'
import nunjucks from 'nunjucks'
import sendEmail from '#utils/send-email.js'
import clubSecretaryName from '#utils/club-secretary-name.js'

async function getMembersWithPayments(subscriptionYear, memberIds) {
  return await Promise.all(
    (await getMembers())
      .filter((member) => !memberIds || memberIds.includes(member.id))
      .sort((a, b) => a.membershipNumber - b.membershipNumber)
      .map(async (member) => {
        const memberName = formatName(member)
        const { id: memberId, membershipNumber, email } = member
        const {
          amountPaid = 0,
          totalDue = 0,
          confirmed = false,
          paymentReference = '',
          paymentMethod,
          paymentNotificationSent = true
        } = (await buildMemberSubscription({
          memberId,
          currentRenewalYear: subscriptionYear
        })) || { paymentNotificationSent: false }
        return {
          memberId,
          membershipNumber,
          memberName,
          email,
          paymentNotificationSent,
          amountPaid: amountPaid * 100,
          paymentMethod,
          paymentReference,
          totalDue: totalDue * 100,
          confirmed
        }
      })
  )
}

async function sendPaymentConfirmationEmail({
  memberName,
  amountPaid,
  currentRenewalYear,
  email
}) {
  const emailTemplate = nunjucks.render(
    'email-templates/payment-confirmation-template.njk',
    {
      amountPaid,
      memberName,
      subscriptionYear: currentRenewalYear,
      clubSecretaryName: await clubSecretaryName()
    }
  )
  const recipient = {
    email,
    name: memberName
  }
  const success = await sendEmail({
    subject: 'North Wilts Model Aircraft Club Membership Renewal Complete',
    content: emailTemplate,
    recipients: [recipient]
  })
  if (!success) {
    throw new Error('Failed to send payment confirmation email')
  }
}

export const viewPaymentsConfirmed = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const { data } = res.locals
  const membersWithPayments = await getMembersWithPayments(currentRenewalYear)

  res.render('pages/admin/confirm-pending-payments', {
    locals: res.locals,
    membersPendingPayments: membersWithPayments.filter(
      ({ paymentMethod, confirmed }) => paymentMethod && !confirmed
    ),
    membersConfirmedPaid: membersWithPayments.filter(
      ({ confirmed }) => confirmed
    ),
    remainingMembers: membersWithPayments.filter(
      ({ paymentMethod }) => !paymentMethod
    ),
    data,
    currentRenewalYear
  })
}

export const postPaymentsConfirmed = async (req, res) => {
  const currentRenewalYear = renewalYear()
  const { payments = [] } = req.body
  const membersWithPayments = await getMembersWithPayments(
    currentRenewalYear,
    payments && [payments].flat().map((payment) => Number(payment))
  )

  try {
    await Promise.all(
      membersWithPayments.map(({ memberId, paymentReference }) =>
        upsertMemberSubscription({
          memberId,
          subscriptionYear: currentRenewalYear,
          paymentReference,
          confirmed: true
        })
      )
    )
  } catch (error) {
    logger.error(
      { error },
      `Failed to update some member subscriptions to database`
    )
    return res
      .status(500)
      .render('pages/error/unhandled-exception.njk', { error })
  }

  try {
    await Promise.all(
      membersWithPayments.map(({ email, amountPaid, memberName }) =>
        sendPaymentConfirmationEmail({
          memberName,
          amountPaid,
          currentRenewalYear,
          email
        })
      )
    )
  } catch (error) {
    logger.error({ error }, `Failed to send some payment confirmation emails`)
    return res
      .status(500)
      .render('pages/error/unhandled-exception.njk', { error })
  }

  res.redirect('confirm-pending-payments')
}

import renewalYear from '#utils/current-renewal-year.js'
import { upsertMemberSubscription } from '#repos/member-subscription.repository.js'
import logger from '../../../logger/logger.js'
import nunjucks from 'nunjucks'
import sendEmail from '#utils/send-email.js'
import clubSecretaryName from '#utils/club-secretary-name.js'
import buildMembersWithSubscription from '#utils/build-members-with-subscription.js'

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
  const membersWithPayments =
    await buildMembersWithSubscription(currentRenewalYear)

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
  const membersWithPayments = await buildMembersWithSubscription(
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

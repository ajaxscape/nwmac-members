import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_API_KEY
})

const sentFrom = new Sender(
  process.env.MAILER_SENT_FROM_ADDRESS,
  'Club Secretary'
)

export default async function ({
  subject = '',
  content = '',
  recipients = []
}) {
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(
      [recipients]
        .flat()
        .map((recipient) => new Recipient(recipient.email, recipient.name))
    )
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml(content)

  try {
    await mailerSend.email.send(emailParams)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

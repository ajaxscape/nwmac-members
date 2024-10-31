import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys
} from '@getbrevo/brevo'

export default async function ({
  subject = '',
  content = '',
  recipients = []
}) {
  const apiInstance = new TransactionalEmailsApi()

  apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    process.env.EMAIL_API_KEY
  )

  const sendSmtpEmail = new SendSmtpEmail()

  sendSmtpEmail.subject = subject
  sendSmtpEmail.htmlContent = content
  sendSmtpEmail.sender = {
    name: 'Club Secretary',
    email: process.env.EMAIL_SENT_FROM_ADDRESS
  }
  sendSmtpEmail.to = recipients
  // sendSmtpEmail.replyTo = {
  //   email: 'shubham.upadhyay@sendinblue.com',
  //   name: 'Shubham Upadhyay'
  // }
  // sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' }
  // sendSmtpEmail.params = {
  //   parameter: 'My param value',
  //   subject: 'common subject'
  // }

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log(
      'API called successfully. Returned data: ' + JSON.stringify(data)
    )
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys
} from '@getbrevo/brevo'
import config from '#config/config.js'

export default async function ({
  subject = '',
  content = '',
  recipients = []
}) {
  const apiInstance = new TransactionalEmailsApi()

  apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    config.emailApiKey
  )

  const sendSmtpEmail = new SendSmtpEmail()

  sendSmtpEmail.subject = subject
  sendSmtpEmail.htmlContent = content
  sendSmtpEmail.sender = {
    name: 'Club Secretary',
    email: config.emailFromAddress
  }
  sendSmtpEmail.to = recipients

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

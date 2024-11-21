import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys
} from '@getbrevo/brevo'
import config from '#config/config.js'
import * as fs from 'node:fs'

const dumpEmail = async (content) => {
  const dir = `${process.cwd()}/temp/email`
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFile(`${dir}/email-${Date.now()}.html`, content, err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
}

export default async function ({
  subject = '',
  content = '',
  recipients = []
}) {
  if (!config.canSendEmail) {
    await dumpEmail(content)
    return true;
  }

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

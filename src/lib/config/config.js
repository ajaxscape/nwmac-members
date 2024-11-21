export default {
  emailApiKey: process.env.EMAIL_API_KEY || '',
  emailFromAddress: process.env.EMAIL_SENT_FROM_ADDRESS || '',
  canSendEmail:
    process.env.SKIP_EMAIL_SEND?.toLowerCase() !== 'true',
  bankDetails: {
    sortcode: process.env.BANK_SORTCODE || '',
    account: process.env.BANK_ACCOUNT_NUMBER || '',
    name: process.env.BANK_NAME || ''
  },
  isDevelopment: process.env.NODE_ENV?.toLowerCase() === 'development'
}

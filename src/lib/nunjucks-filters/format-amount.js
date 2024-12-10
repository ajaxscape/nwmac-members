export default function formatAmount(amountInPence, prefix = '&pound;') {
  if (isNaN(amountInPence) || amountInPence === null) {
    throw new TypeError('Amount must be a number')
  }
  return `${prefix}${(amountInPence / 100).toFixed(2)}`
}

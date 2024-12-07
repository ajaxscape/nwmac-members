export default function formatAmount(amountInPence, prefix = '&pound;') {
  return `${prefix}${(amountInPence / 100).toFixed(2)}`
}

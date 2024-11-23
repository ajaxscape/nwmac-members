export default function formatAmount(amountInPence) {
  return `&pound;${(amountInPence / 100).toFixed(2)}`
}

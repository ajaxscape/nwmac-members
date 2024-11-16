export default function formatAmount(amountInPence) {
  return `£${(amountInPence / 100).toFixed(2)}`
}

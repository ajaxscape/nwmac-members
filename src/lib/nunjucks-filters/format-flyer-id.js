export default (data) => {
  const { flyerId } = data
  return flyerId ? `GBR-RP-${flyerId}` : ''
}

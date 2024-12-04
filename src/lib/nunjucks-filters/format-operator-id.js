export default (data) => {
  const { operatorId, caaThroughClub } = data
  let formattedOperatorId = operatorId ? `GBR-OP-${operatorId}` : ''
  if (caaThroughClub !== 'yes') {
    formattedOperatorId += `<br>(CAA not registered through the club)`
  }
  return formattedOperatorId
}

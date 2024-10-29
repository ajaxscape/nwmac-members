export default (data) => {
  const { operatorId, ageGroup } = data
  return ageGroup === 'senior'
    ? `GBR-OP-${operatorId ?? '** Must be entered **'}`
    : 'Not required'
}

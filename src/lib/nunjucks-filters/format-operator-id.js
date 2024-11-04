export default (data) => {
  const { operatorId } = data
  return operatorId ? `GBR-OP-${operatorId}` : ''
}

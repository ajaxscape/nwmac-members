export default ({ fees, bmfaThroughClub }) => {
  const {
    clubSeniorFee = 0,
    bmfaSeniorFee = 0,
    caaOperatorRegistration = 0
  } = fees

  let total = clubSeniorFee
  if (bmfaThroughClub) {
    total += bmfaSeniorFee + caaOperatorRegistration
  }

  return {
    total,
    clubSeniorFee,
    bmfaSeniorFee,
    caaOperatorRegistration
  }
}

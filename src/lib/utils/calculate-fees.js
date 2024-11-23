export default ({ fees, bmfaThroughClub }) => {
  const { clubFee = 0, bmfaFee = 0, caaReg = 0 } = fees

  let total = clubFee
  if (bmfaThroughClub) {
    total += bmfaFee + caaReg
  }

  return {
    total,
    clubFee,
    bmfaFee,
    caaReg
  }
}

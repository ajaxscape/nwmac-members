export default ({
  fees,
  bmfaThroughClub,
  ageGroup,
  membershipType,
  nonFlyer,
  operatorId
}) => {
  const {
    clubJunior = 0,
    clubSenior = 0,
    clubFamily = 0,
    bmfaJunior = 0,
    bmfaSenior = 0,
    bmfaFamilyPartner = 0,
    bmfaFamilyJunior = 0,
    bmfaNonFlyer = 0,
    caaOperatorRegistration = 0
  } = fees || {}

  const subscription = {}

  if (ageGroup === 'junior') {
    if (membershipType === 'family') {
      if (bmfaThroughClub) {
        subscription.bmfaFamilyJunior = bmfaFamilyJunior
      }
    } else {
      subscription.clubJunior = clubJunior
      if (bmfaThroughClub) {
        subscription.bmfaJunior = bmfaJunior
      }
    }
  } else if (ageGroup === 'senior') {
    if (membershipType === 'family') {
      subscription.clubFamily = clubFamily
    } else {
      subscription.clubSenior = clubSenior
    }
    if (bmfaThroughClub) {
      if (nonFlyer) {
        subscription.bmfaNonFlyer = bmfaNonFlyer
      } else {
        if (membershipType === 'family') {
          subscription.bmfaFamilyPartner = bmfaFamilyPartner
        } else {
          subscription.bmfaSenior = bmfaSenior
        }
      }
      if (operatorId) {
        subscription.caaOperatorRegistration = caaOperatorRegistration
      }
    }
  }

  Object.keys(subscription).forEach((key) => {
    subscription[key] = Number(subscription[key])
  })

  let total = Object.values(subscription).reduce(
    (accumulator, fee) => accumulator + Number(fee),
    0
  )

  return {
    ...subscription,
    total
  }
}

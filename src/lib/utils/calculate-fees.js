export default ({
  fees,
  bmfaThroughClub = 'yes',
  caaThroughClub = 'yes',
  ageGroup,
  isPartner = false,
  bmfaMembersCardRequired = false,
  membershipType,
  nonFlyer = false,
  operatorId
}) => {
  const {
    clubJunior = 0,
    clubSenior = 0,
    clubFamilySenior = 0,
    clubFamilyPartner = 0,
    clubFamilyJunior = 0,
    bmfaJunior = 0,
    bmfaSenior = 0,
    bmfaFamilyPartner = 0,
    bmfaFamilyJunior = 0,
    bmfaNonFlyer = 0,
    bmfaMembersCard = 0,
    caaOperatorRegistration = 0
  } = fees || {}

  const subscription = {}

  if (ageGroup === 'junior') {
    if (membershipType === 'family') {
      subscription.clubFamilyJunior = clubFamilyJunior
      if (bmfaThroughClub === 'yes') {
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
      if (isPartner) {
        subscription.clubFamilyPartner = clubFamilyPartner
      } else {
        subscription.clubFamilySenior = clubFamilySenior
      }
    } else {
      subscription.clubSenior = clubSenior
    }
    if (bmfaThroughClub === 'yes') {
      if (nonFlyer) {
        subscription.bmfaNonFlyer = bmfaNonFlyer
      } else {
        if (membershipType === 'family' && isPartner) {
          subscription.bmfaFamilyPartner = bmfaFamilyPartner
        } else {
          subscription.bmfaSenior = bmfaSenior
        }
      }
      if (bmfaMembersCardRequired) {
        subscription.bmfaMembersCard = bmfaMembersCard
      }
    }
    if (caaThroughClub === 'yes' && operatorId) {
      subscription.caaOperatorRegistration = caaOperatorRegistration
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

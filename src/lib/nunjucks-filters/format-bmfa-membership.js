export default (data) => {
  const {
    bmfaNumber,
    bmfaThroughClub,
    bmfaMembersCardRequired,
    bmfaPrintedMagazineRequired
  } = data
  let formattedBmfaMembership = bmfaNumber === '0' ? null : bmfaNumber

  if (bmfaThroughClub === 'yes') {
    formattedBmfaMembership += `<br>(Registered through the club)`
    if (bmfaMembersCardRequired) {
      formattedBmfaMembership += `<br>(BMFA card requested)`
    }
    if (bmfaPrintedMagazineRequired) {
      formattedBmfaMembership += `<br>(BMFA printed magazine requested)`
    }
  } else if (bmfaThroughClub === 'no') {
    formattedBmfaMembership += `<br>(Not registered through the club)`
  }
  return formattedBmfaMembership
}

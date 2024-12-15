export default (data) => {
  const { bmfaNumber, bmfaThroughClub, bmfaMembersCardRequired } = data
  let formattedBmfaMembership = bmfaNumber === '0' ? null : bmfaNumber

  if (bmfaThroughClub === 'yes') {
    formattedBmfaMembership += `<br>(Registered through the club)`
    if (bmfaMembersCardRequired) {
      formattedBmfaMembership += `<br>(BMFA card requested)`
    }
  } else {
    formattedBmfaMembership += `<br>(Not registered through the club)`
  }
  return formattedBmfaMembership
}

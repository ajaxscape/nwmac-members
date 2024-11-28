export default (data) => {
  const { bmfaNumber, bmfaThroughClub, bmfaMembersCardRequired } = data
  let formattedBmfaMembership = bmfaNumber === '0' ? null : bmfaNumber

  if (bmfaThroughClub === 'no') {
    formattedBmfaMembership += `<br>(Not registered through the club)`
  } else if (bmfaMembersCardRequired) {
    formattedBmfaMembership += `<br>(BMFA card requested)`
  }
  return formattedBmfaMembership
}

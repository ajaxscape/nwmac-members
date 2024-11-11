export default (data) => {
  const { bmfaNumber, bmfaThroughClub } = data
  let formattedBmfaMembership = bmfaNumber === '0' ? null : bmfaNumber

  if (bmfaThroughClub === 'no') {
    formattedBmfaMembership += `<br>(Not registered through the club)`
  }
  return formattedBmfaMembership
}

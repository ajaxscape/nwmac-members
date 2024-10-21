export default (data) => {
  const { bmfaNumber, bmfaThroughClub } = data
  let formattedBmfaMembership = bmfaNumber

  if (bmfaThroughClub === 'no') {
    formattedBmfaMembership += `<br>(Not registered through the club)`
  }
  return formattedBmfaMembership
}

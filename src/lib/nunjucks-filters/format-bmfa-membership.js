export default (data) => {
  const { bmfaNumber, bmfaThroughClub } = data
  let formattedBmfaMembership = bmfaNumber

  if (bmfaThroughClub === 'yes') {
    formattedBmfaMembership += `<br>Registered through the club`
  } else {
    formattedBmfaMembership += `<br>Not registered through the club`
  }
  return formattedBmfaMembership
}

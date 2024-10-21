export default (data) => {
  const { mobileNumber, landLine } = data
  let formattedPhoneNumbers = mobileNumber

  if (landLine) {
    formattedPhoneNumbers += `<br>${landLine}`
  }
  return formattedPhoneNumbers
}

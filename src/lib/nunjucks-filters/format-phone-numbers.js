export default (data) => {
  const { mobileNumber, landline } = data
  let formattedPhoneNumbers = mobileNumber

  if (landline) {
    formattedPhoneNumbers += `<br>${landline}`
  }
  return formattedPhoneNumbers
}

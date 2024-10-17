export default (data) => {
  const { addressLine1, addressLine2, town, county, postcode } = data
  let formattedAddress = addressLine1

  if (addressLine2) {
    formattedAddress += `<br>${addressLine2}`
  }
  formattedAddress += `<br>${town}`
  if (county) {
    formattedAddress += `<br>${county}`
  }
  formattedAddress += `<br>${postcode}`
  return formattedAddress
}

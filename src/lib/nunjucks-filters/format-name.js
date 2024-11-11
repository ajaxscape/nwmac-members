export default (data) => {
  const { firstName='', lastName='', middleName='', preferredName='' } = data
  let fullName = ''

  if (preferredName) {
    fullName += `(${preferredName}) `
  }
  fullName += firstName
  if (middleName) {
    fullName += ` ${middleName}`
  }
  fullName += ` ${lastName}`
  return fullName
}

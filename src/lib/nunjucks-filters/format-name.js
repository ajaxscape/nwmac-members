export default (data) => {
  const { firstName = '', lastName = '', preferredName = '' } = data

  return `${
    preferredName ? preferredName : (firstName ?? '')
  } ${lastName ?? ''}`.trim()
}

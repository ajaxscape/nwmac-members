export default (errors) =>
  errors.map((errorDetails) => ({
    text: errorDetails.msg,
    href: `#${errorDetails.path}`
  }))

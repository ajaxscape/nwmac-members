export default (errors = [], path) =>
  errors
    .filter((errorDetails) => errorDetails.path === path)
    .map((errorDetails) => ({
      text: errorDetails.msg
    }))
    .pop()

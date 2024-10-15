import kebabCase from 'kebab-case'

export default (errors) =>
  errors.map((errorDetails) => ({
    text: errorDetails.msg,
    href: `#${kebabCase(errorDetails.path)}`
  }))

import kebabCase from 'kebab-case'

export default (string) => {
  return (
    string.charAt(0).toUpperCase() +
    kebabCase(string).slice(1).replaceAll('-', ' ')
  )
}

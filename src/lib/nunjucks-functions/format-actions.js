import kebabCase from 'kebab-case'

const baseUrl = '/details/edit'

export default (key) => {
  const visuallyHiddenText = kebabCase(key).replaceAll('-', ' ')
  return {
    items: [
      {
        attributes: { id: key },
        href: `${baseUrl}/${kebabCase(key)}`,
        text: 'Change',
        visuallyHiddenText
      }
    ]
  }
}

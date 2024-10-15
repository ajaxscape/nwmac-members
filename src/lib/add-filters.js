import * as filters from './nunjucks-filters/index.js'

export default (env) => {
  Object.keys(filters).forEach((filterName) => {
    env.addFilter(filterName, filters[filterName])
  })
}

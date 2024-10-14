const filters = require('./nujucks-filters')

module.exports = (env) => {
  Object.keys(filters).forEach((filterName) => {
    env.addFilter(filterName, filters[filterName])
  })
}

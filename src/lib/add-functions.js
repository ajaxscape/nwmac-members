import * as functions from './nunjucks-functions/index.js'

export default (env) => {
  Object.keys(functions).forEach((functionName) => {
    env.addGlobal(functionName, functions[functionName])
  })
}

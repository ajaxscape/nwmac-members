import mapToError from './map-to-error.js'
import formatAchievements from './format-achievements.js'

const functions = { mapToError, formatAchievements }

export default (env) => {
  Object.keys(functions).forEach((functionName) => {
    env.addGlobal(functionName, functions[functionName])
  })
}

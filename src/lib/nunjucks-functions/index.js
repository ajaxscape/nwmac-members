import mapToError from './map-to-error.js'
import formatAchievements from './format-achievements.js'
import formatActions from './format-actions.js'

const functions = { mapToError, formatAchievements, formatActions }

export default (env) => {
  Object.keys(functions).forEach((functionName) => {
    env.addGlobal(functionName, functions[functionName])
  })
}

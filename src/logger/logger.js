import pino from 'pino'
import config from '#config/config.js'

const transportTarget = new URL('./pino-pretty-transport.js', import.meta.url)

const options = {}

if (config.isDevelopment) {
  options.transport = {
    target: transportTarget.href
  }
}

export const transportOptions = options

export default pino(options)

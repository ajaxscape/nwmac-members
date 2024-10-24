import pino from 'pino'

const transportTarget = new URL('./pino-pretty-transport.js', import.meta.url)

const options = {}

if (process.env.NODE_ENV === 'development') {
  options.transport = {
    target: transportTarget.href
  }
}

export const transportOptions = options

export default pino({})

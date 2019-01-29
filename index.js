const pino = require('pino')
const stringify = require('json-stringify-extended')

const OPTIONS = {
  valueQuote: "'",
  endline: '',
  spacing: '',
  discard: false,
  compress: true,
  safe: true,
  filter: function (key, value) {
    if (typeof value === 'function') {
      return false
    }
    return true
  },
  replace: function (key, value) {
    if (value instanceof Error) {
      return {key, value: value.stack.split('\n').map(line => line.trim())}
    }
    return {key, value}
  }
}

const print = function (...args) {
  const message = args.map((message) => {
    if (typeof message === 'object') {
      try {
        message = stringify(message, OPTIONS)
      } catch (e) {
        message = '[INVALID-JSON]'
      }
    } else if (typeof message === 'function') {
      message = message.name
    }
    return message
  })
  console.log(...message)
}

const spino = function (options) {
  return (new function (options) {
    const __pino = pino(options)
    for (const level in __pino.levels.values) {
      this[level] = function (...args) {
        if (__pino.isLevelEnabled(level)) {
          print(...args)
        }
      }
    }

    this.child = function () { return this }

    Object.defineProperty(this, 'level', {
      set: function (value) { __pino.level = value },
      get: function () { return __pino.level }
    })

    for (const _prop in __pino) {
      if (!this[_prop]) {
        this[_prop] = __pino[_prop]
      }
    }
  }(options))
}

module.exports = spino

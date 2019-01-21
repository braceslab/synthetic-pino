const pino = require('pino')

const spino = function (options) {
  return (new function (options) {
    const __pino = pino(options)
    for (const level in __pino.levels.values) {
      this[level] = function (...args) {
        if (__pino.isLevelEnabled(level)) {
          console.log(...args)
        }
      }
    }
    this.child = function () { return this }
    for (const _prop in __pino) {
      if (!this[_prop]) {
        this[_prop] = __pino[_prop]
      }
    }
  }(options))
}

module.exports = spino

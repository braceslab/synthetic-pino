const spino = require('..')

const log = spino({
  customLevels: {
    panic: 100,
    success: 35
  },
  filter: function (key, value) {
    if (value === null) {
      return false
    }
    return true
  },
  replace: function (key, value) {
    if (value === '') {
      return {key, value: '[empty string]'}
    }
    return {key, value}
  }
})

log.trace('trace')
log.info('info', {a: { message: 'message' }})
log.panic('panic', function bye (lang) { return 'ciao' })

log.level = 'trace'
log.trace('trace')
log.trace('trace', {
  error: new Error('error message'),
  class: function () { this.method = function () {} },
  lib: { f0: function () {} }
})

log.trace('info', {
  string: '',
  null: null
})

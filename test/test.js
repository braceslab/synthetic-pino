const spino = require('..')

const log = spino({
  customLevels: {
    panic: 100,
    success: 35
  }
})

log.trace('trace')
log.info('info', {a: { message: 'message' }})
log.panic('panic')

log.level = 'trace'
log.trace('trace')

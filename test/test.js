const spino = require('..')

const log = spino({
  customLevels: {
    panic: 100,
    success: 35
  }
})

log.trace('trace')
log.info('info')
log.panic('panic')

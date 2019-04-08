
(work in progress)

behave like pino logger but use only console log, for development and debug purpose only

```js
const options = {
  customLevels: {
    panic: 100,
    success: 35
  },
  limit: 512 // truncate long values at 
}

let log

if (process.execArgv && process.execArgv.find((arg) => arg.indexOf('--inspect-brk') !== -1)) {
  log = require('synthetic-pino')(options)
} else {
  log = require('pino')(options)
}

module.exports = log
```

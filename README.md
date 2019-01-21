
(work in progress)

behave like pino logger but use only console log

```js
const options = {
  customLevels: {
    panic: 100,
    success: 35
  }
}

let log

if (process.execArgv && process.execArgv.find((arg) => arg.indexOf('--inspect-brk') !== -1)) {
  log = require('synthetic-pino')(options)
} else {
  log = require('pino')(options)
}

module.exports = log
```

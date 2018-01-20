const _ = require('lodash')
const fs = require('fs')
const path = require('path')

let baseDir = process.env.QUANTUM_BASE_DIR + '/app/middleware'

function load (Quantum, app) {
  const config = Quantum.config.app.middleware
  let middleware = fs.readdirSync(baseDir)

  middleware.forEach(function (item) {
    if (config.includes(_.camelCase(item.split('.js')[0]))) {
      app.use(require(path.join(baseDir, item)))
    }
  })
}

module.exports = {
  load: load
}

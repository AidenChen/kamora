const fs = require('fs')
const path = require('path')

let baseDir = process.env.QUANTUM_BASE_DIR + '/config'

let configs = fs.readdirSync(baseDir)

configs.forEach(function (item) {
  exports[item.split('.js')[0]] = require(path.join(baseDir, item))
})

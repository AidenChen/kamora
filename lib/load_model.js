const fs = require('fs')
const path = require('path')

let baseDir = process.env.QUANTUM_BASE_DIR + '/app/models'

function load () {
  let models = fs.readdirSync(baseDir)

  models.forEach(function (item) {
    require(path.join(baseDir, item))
  })
}

module.exports = {
  load: load
}

const mongoose = require('mongoose')

function loadMongo (Quantum) {
  const config = Quantum.config.database.connections.mongo

  mongoose.Promise = Promise
  mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, {
    user: config.username,
    pass: config.password
  })
  mongoose.connection.on('error', console.error)
}

function load (Quantum) {
  loadMongo(Quantum)
}

module.exports = {
  load: load
}

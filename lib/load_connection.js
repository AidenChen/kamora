const mongoose = require('mongoose')

function loadMongo (Kamora) {
  const config = Kamora.config.database.connections.mongo

  mongoose.Promise = Promise
  mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, {
    user: config.username,
    pass: config.password
  })
  mongoose.connection.on('error', console.error)
}

function load (Kamora) {
  loadMongo(Kamora)
}

module.exports = {
  load: load
}

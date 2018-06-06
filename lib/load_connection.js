const mongoose = require('mongoose')
const Redis = require('ioredis')

function loadMongo (Kamora) {
  const config = Kamora.config.database.connections.mongo

  mongoose.Promise = Promise
  mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, {
    user: config.username,
    pass: config.password
  })
  mongoose.connection.on('error', console.error)
}

function loadRedis(Kamora) {
  const config = Kamora.config.database.redis

  const redis = new Redis(config.port, config.host)
  return redis
}

function load (Kamora) {
  const config = Kamora.config.database.redis

  loadMongo(Kamora)
  if (JSON.parse(config.enable)) {
    return loadRedis(Kamora)
  }
}

module.exports = {
  load: load
}

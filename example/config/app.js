require('dotenv').config()

const log = require('../app/middleware/log')
const formatResponse = require('../app/middleware/format_response')

module.exports = {
  port: process.env.APP_PORT || '3000',
  middleware: [log, formatResponse]
}

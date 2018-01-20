const log = require('../app/middleware/log')
const formatResponse = require('../app/middleware/format_response')

module.exports = {
  middleware: [log, formatResponse]
}

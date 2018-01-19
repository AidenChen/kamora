const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

function start (options) {
  const app = new Koa()
  app.use(bodyParser())
  app.listen(3000, function () {
    console.log('Listening: ' + 3000)
  })
}

module.exports.start = start

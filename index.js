const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

function start (options) {
  // 环境变量声明
  process.env.QUANTUM_BASE_DIR = options.baseDir

  const app = new Koa()
  app.use(bodyParser())

  // 加载控制器
  require('./lib/load_controller').load(app)

  // 开启服务
  app.listen(3000, function () {
    console.log('Listening: ' + 3000)
  })
}

module.exports = {
  start: start,
  Router: require('./lib/base/router')
}

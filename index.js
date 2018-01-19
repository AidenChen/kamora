const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

function start (options) {
  // 环境变量声明
  process.env.QUANTUM_BASE_DIR = options.baseDir

  const app = new Koa()
  app.use(bodyParser())

  // 加载配置
  exports.config = require('./lib/load_config')

  // 加载模型
  require('./lib/load_model').load()

  // 加载控制器
  require('./lib/load_controller').load(app)

  // 开启服务
  app.listen(3000, function () {
    console.log('Listening: ' + 3000)
  })
}

module.exports.Router = require('./lib/base/router')

module.exports.start = start

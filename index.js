const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

function start (options) {
  // 环境变量声明
  process.env.KAMORA_BASE_DIR = options.baseDir

  const app = new Koa()
  app.use(bodyParser())

  // 加载配置
  exports.config = require('./lib/load_config')

  // 加载数据库连接
  exports.redis = require('./lib/load_connection').load(exports)

  // 加载模型
  require('./lib/load_model').load()

  // 加载中间件
  require('./lib/load_middleware').load(exports, app)

  // 加载控制器
  require('./lib/load_controller').load(exports, app)

  // 开启服务
  const server = require('http').createServer(app.callback())
  exports.server = server
  server.listen(exports.config.app.port, function () {
    console.log('Listening: ' + exports.config.app.port)
  })
}

module.exports.Database = require('mongoose')

module.exports.Validator = require('joi')

module.exports.Logger = require('log4js')

module.exports.Router = require('./lib/base/router')

module.exports.Error = require('./lib/base/error')

module.exports.start = start

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const enforceHttps = require('koa-sslify')
const http = require('http')
const https = require('https')
const fs = require('fs')

function start (options) {
  // 环境变量声明
  process.env.KAMORA_BASE_DIR = options.baseDir

  const app = new Koa()
  app.use(bodyParser())

  // 加载配置
  exports.config = require('./lib/load_config')

  // ssl中间件
  if (JSON.parse(exports.config.ssl.enable)) {
    app.use(enforceHttps())
  }

  // 加载数据库连接
  if (JSON.parse(exports.config.database.redis.enable)) {
    exports.redis = require('./lib/load_connection').load(exports)
  } else {
    require('./lib/load_connection').load(exports)
  }

  // 加载模型
  require('./lib/load_model').load()

  // 加载中间件
  require('./lib/load_middleware').load(exports, app)

  // 加载控制器
  require('./lib/load_controller').load(exports, app)

  // 开启服务
  let server
  if (JSON.parse(exports.config.ssl.enable)) {
    const options = {
      key: fs.readFileSync(exports.config.ssl.key),
      cert: fs.readFileSync(exports.config.ssl.pem)
    }

    server = https.createServer(options, app.callback())
  } else {
    server = http.createServer(app.callback())
  }
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

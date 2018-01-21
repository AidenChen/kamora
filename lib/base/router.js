const koaRouter = require('koa-router')

class Router extends koaRouter {
  constructor (...args) {
    super(...args)
  }

  push (options) {
    super.register(options.path, [options.method], options.processors, {
      name: null
    })
  }
}

module.exports = Router

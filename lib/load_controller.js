const fs = require('fs')
const path = require('path')

let baseDir = process.env.QUANTUM_BASE_DIR + '/app/controllers'

function load (app, parent = '') {
  let routers = fs.readdirSync(path.join(baseDir, parent))

  routers.forEach(function (item) {
    let itemPath = path.join(baseDir, parent, item)
    let itemStats = fs.statSync(itemPath)

    if (itemStats.isDirectory()) {
      load(app, path.join(parent, item))
    } else if (itemStats.isFile() && item.endsWith('.js')) {
      let router = require(path.join(baseDir, parent, item))
      // 设置前缀
      router.prefix((parent ? '/' + parent : parent) + '/' + item.split('.js')[0])
      // 路由挂载
      app.use(router.routes())
        .use(router.allowedMethods())
    }
  })
}

module.exports = {
  load: load
}

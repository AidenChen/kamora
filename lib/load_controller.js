const fs = require('fs')
const path = require('path')

let baseDir = process.env.KAMORA_BASE_DIR + '/app/controllers'

function load (Kamora, app, parent = '') {
  const prefix = Kamora.config.api.prefix
  let routers = fs.readdirSync(path.join(baseDir, parent))

  routers.forEach(function (item) {
    let itemPath = path.join(baseDir, parent, item)
    let itemStats = fs.statSync(itemPath)

    if (itemStats.isDirectory()) {
      load(Kamora, app, path.join(parent, item))
    } else if (itemStats.isFile() && item.endsWith('.js')) {
      let router = require(path.join(baseDir, parent, item))
      // 设置前缀
      router.prefix((prefix ? '/' + prefix : '') + (parent ? '/' + parent : '') + '/' + item.split('.js')[0])
      // 路由挂载
      app.use(router.routes())
        .use(router.allowedMethods())
    }
  })
}

module.exports = {
  load: load
}

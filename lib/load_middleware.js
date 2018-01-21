function load (Kamora, app) {
  const middleware = Kamora.config.app.middleware

  middleware.forEach(function (item) {
    app.use(item)
  })
}

module.exports = {
  load: load
}

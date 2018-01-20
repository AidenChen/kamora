function load (Quantum, app) {
  const middleware = Quantum.config.app.middleware

  middleware.forEach(function (item) {
    app.use(item)
  })
}

module.exports = {
  load: load
}

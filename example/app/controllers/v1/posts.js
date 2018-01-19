const Quantum = require('../../../../')

let router = new Quantum.Router()

router.push({
  method: 'get',
  path: '/',
  processors: [
    async (ctx) => {
      ctx.body = 'ok'
    }
  ]
})

module.exports = router

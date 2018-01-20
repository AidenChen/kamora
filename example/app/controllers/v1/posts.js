const Quantum = require('../../../../')

const router = new Quantum.Router()
const Post = Quantum.Database.model('post')
const error = Quantum.config.error

router.push({
  method: 'get',
  path: '/',
  processors: [
    async (ctx, next) => {
      const post = new Post({
        title: 'test'
      })
      const postCreated = await post
        .save()
        .catch(() => {
        })

      // throw new Quantum.Error(error.name.INVALID_FIELD)
      ctx.body = postCreated
      await next()
    }
  ]
})

module.exports = router

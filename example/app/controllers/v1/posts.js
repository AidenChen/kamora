const Quantum = require('../../../../')

const router = new Quantum.Router()
const Post = Quantum.Database.model('post')

router.push({
  method: 'get',
  path: '/',
  processors: [
    async (ctx) => {
      const post = new Post({
        title: 'test'
      })
      const postCreated = await post
        .save()
        .catch(() => {
        })
    
      ctx.body = postCreated
    }
  ]
})

module.exports = router

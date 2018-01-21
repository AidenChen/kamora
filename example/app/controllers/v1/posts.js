const Quantum = require('../../../../')
const error = require('../../../config/error')
const validate = require('../../middleware/validate')

const router = new Quantum.Router()
const Post = Quantum.Database.model('post')
const Validator = Quantum.Validator

router.push({
  method: 'get',
  path: '/',
  processors: [
    validate({
      query: {
        title: Validator.string().max(20).required()
      }
    }),
    async (ctx, next) => {
      const post = new Post({
        title: ctx.filter.query.title
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

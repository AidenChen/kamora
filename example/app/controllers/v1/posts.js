const Kamora = require('../../../../')
const error = require('../../../config/error')
const validate = require('../../middleware/validate')

const router = new Kamora.Router()
const Post = Kamora.Database.model('post')
const Validator = Kamora.Validator

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

      // throw new Kamora.Error(error.name.INVALID_FIELD)
      ctx.body = postCreated
      await next()
    }
  ]
})

module.exports = router

const Quantum = require('../../../')
const error = require('../../config/error')

async function formatResponse (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err instanceof Quantum.Error) {
      let detail
      if (err.name) {
        detail = error.detail.get(err.name)
      } else {
        detail = error.detail.get(error.name.UNKNOW_ERROR)
      }

      const code = detail.code
      const message = err.message || detail.message
      err.code = code
      err.message = message

      ctx.body = {
        code: code,
        msg: message
      }
    }
    throw err
  }

  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.body || {}
  }
}

module.exports = formatResponse

const Quantum = require('../../../')

const error = Quantum.config.error

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

      ctx.body = {
        code: detail.code,
        msg: err.message || detail.message
      }
    }
    return
  }

  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.body || {}
  }
}

module.exports = formatResponse

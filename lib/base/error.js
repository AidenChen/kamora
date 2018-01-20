class HttpError extends ExtendableBuiltin(Error) {
  constructor (name, message = '', status = 500) {
    super(message)

    this.name = name
    this.message = message
    this.status = status
  }
}

function ExtendableBuiltin (cls) {
  function ExtendableBuiltin () {
    cls.apply(this, arguments)
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype)
  Object.setPrototypeOf(ExtendableBuiltin, cls)

  return ExtendableBuiltin
}

module.exports = HttpError

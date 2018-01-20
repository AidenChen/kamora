const Quantum = require('../../../')

const Schema = Quantum.Database.Schema

const postSchema = new Schema({
  title: String
}, { versionKey: false })

postSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = Quantum.Database.model('post', postSchema)

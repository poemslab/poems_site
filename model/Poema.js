const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: null
  },
  text: {
    type: String,
    required: true
  },
  creator: {
    type: Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
    default: 'cовременные'
  },
  likes: {
    type: Number,
    default: 0
  }
})

module.exports = model('Poema', schema, 'poems')
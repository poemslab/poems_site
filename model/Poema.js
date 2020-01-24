const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
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
  }
})

module.exports = model('Poema', schema, 'poems')
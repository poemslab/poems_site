const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  }
})

module.exports = model('Category', schema, 'category')
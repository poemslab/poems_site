const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  }
})

module.exports = model('Category', schema, 'category')
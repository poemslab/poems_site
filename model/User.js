const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    default: `user${Math.floor(Math.random() * 1000000) + 1}`
  },
  moderator: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  liked: {
    type: Array
  },
  avatar: {
    type: String,
    default: null
  }
})

module.exports = model('User', schema, 'users')
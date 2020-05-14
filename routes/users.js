const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')
const { Types } = require('mongoose')

const User = require('../model/User')
const Poems = require('../model/Poema')

router.get('/me', auth, async (req, res) => {
  const find = await User.findById(req.user.userId)
  if (!find) {
    return res.status(401).json({
      success: false,
      message: 'Вы не авторизованы'
    })
  }
  const findPoems = await Poems.find({ creator: Types.ObjectId(req.user.userId) })
  res.status(200).json({
    success: true,
    data: {
      liked: find.liked,
      you: findPoems,
      id: req.user.userId,
      email: req.user.email,
      mod: req.user.mod,
      username: req.user.username
    }
  })
})

router.post('/update', auth, async (req, res) => {
  const { type, username } = req.body
  if(!type) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали тип'
    })
  }
  if (type === 'username') {
    if(!username) {
      return res.status(400).json({
        success: false,
        message: 'Вы не указали новое имя пользователя'
      })
    }
    const findUsername = await User.findOne({ username })
    if(findUsername) {
      return res.status(401).json({
        success: false,
        message: 'Такое имя пользователя уже занято'
      })
    }
    const find = await User.findOneAndUpdate({ email: req.user.email }, { $set: { username } })
    if(!find) {
      return res.status(401).json({
        success: false,
        message: 'Вы не авторизованы'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Вы изменили имя пользователя'
    })
  }
})

module.exports = router
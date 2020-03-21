const { Router } = require('express')
const router = Router()
require("dotenv").config();
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

router.post('/register', [
  check('email', 'Неверная почта').isEmail(),
  check('password', 'Минимум 6 символов').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() })
  }
  const { email, password } = req.body

  const findUser = await User.findOne({ email: email.toLowerCase() })

  if (findUser) {
    return res.status(400).json({
      success: false,
      message: 'Такой пользователь уже существует'
    })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await User.create({
    email, password: hashedPassword
  })

  res.status(201).json({
    success: true,
    message: 'Пользователь создан'
  })
})

router.post('/login', [
  check('email', 'Неверная почта').isEmail(),
  check('password', 'Минимум 6 символов').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() })
  }
  const { email, password } = req.body

  const findUser = await User.findOne({ email: email.toLowerCase() })

  if (!findUser) {
    return res.status(400).json({
      success: false,
      message: 'Неверный логин или пароль'
    })
  }

  const isMatch = await bcrypt.compare(password, findUser.password)

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Неверный логин или пароль'
    })
  }
  const token = jwt.sign(
    { userId: findUser.id, email: findUser.email, mod: findUser.moderator },
    process.env.SECRET,
    { expiresIn: '1w' }
  )

  res.json({
    success: true,
    token
  })

})

module.exports = router
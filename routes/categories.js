const { Router } = require('express')
const router = Router()
const Category = require('../model/Category')
const mod = require('../middleware/mod')
const auth = require('../middleware/auth')

router.get('/list', async (req, res) => {
  if (req.query.limit) {
    const getCategories = await Category.find().limit(parseInt(req.query.limit))
    return res.json({
      success: true,
      data: getCategories
    })
  }
  const find = await Category.find()
  if (find) {
    return res.status(200).json({
      success: true,
      data: find
    })
  }
  res.status(400).json({
    success: false,
    message: 'Попробуйте позже'
  })
})

router.put('/create', auth, mod, async (req, res) => {
  const { name, color, description } = req.body
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали имя категории'
    })
  }
  if (!color) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали цвет категории'
    })
  }
  if (!description) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали описание категории'
    })
  }
  const find = await Category.findOne({ name })
  if (find) {
    return res.status(400).json({
      success: false,
      message: 'Такая категория уже существует'
    })
  }
  let newColor = color.startsWith('#') ? color : `#${color}`
  await Category.create({ name: name.toLowerCase(), description, color: newColor })
  res.status(201).json({
    success: true,
    message: 'Категория успешно создана'
  })
})

router.delete('/delete', mod, async (req, res) => {
  const { id } = req.body
  const find = await Category.findById(id)
  if (!find) {
    return res.status(400).json({
      success: false,
      message: 'Категория не найдена'
    })
  }
  await Category.findOneAndDelete(id)
  res.status(200).json({
    success: true,
    message: 'Категория успешно удалена'
  })
})

module.exports = router
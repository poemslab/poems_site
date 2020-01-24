const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Poems = require('../model/Poema')
const User = require('../model/User')
const { Types } = require('mongoose')

router.get('/list', async (req, res) => {
  const getPoemas = await Poems.find()
  res.json({
    success: true,
    data: getPoemas
  })
})

router.put('/create', auth, async (req, res) => {
  const { title, thumbnail, text } = req.body
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали заголовок'
    })
  }
  if (!text) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали текст стиха'
    })
  }
  const create = await Poems.create({title, thumbnail, text, creator: req.user.userId})
  res.status(200).json({
    success: true,
    message: 'Вы успешно добавили стих на сайт'
  })
})

router.get('/get/:id', async (req, res) => {
  const find = await Poems.findById(req.params.id)
  if(find) {
    res.status(201).json({
      success: true,
      data: find
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }
})

router.post('/like/:id', auth, async (req, res) => {
  if(!req.params.id) {
    return res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }
  const findUser = await User.findById(req.user.userId)
  const poema = await Poems.findById(req.params.id)
  if(!!findUser.liked.find(r => r.title === poema.title)) {
    const removeLike = await User.findByIdAndUpdate(req.user.userId, {$pull: {liked: {_id: poema._id, title: poema.title}}})
    return res.status(201).json({
      success: true,
      message: 'Вы убрали этот стих из понравившихся'
    })
  }
  const find = await User.findByIdAndUpdate(req.user.userId, {$push: {liked: {_id: poema._id, title: poema.title}}})
  res.status(201).json({
    success: true,
    message: 'Вы добавили в понравившийся этот стих'
  })
})

router.delete('/delete/:id', auth, async (req, res) => {
  const findPoema = await Poems.findById(req.params.id)
  if(!findPoema) {
    return res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }
  if(Types.ObjectId(findPoema.creator).equals(Types.ObjectId(req.user.userId))) {
    const deletePoema = await Poems.findByIdAndDelete(req.params.id)
    res.json({
      success: true,
      message: 'Стих удален'
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Вы не автор текста'
    })
  }
})

router.get('/my', auth, async (req, res) => {
  const find = await User.findById(req.user.userId)
  res.status(201).json({
    success: true,
    data: find
  })
})

module.exports = router
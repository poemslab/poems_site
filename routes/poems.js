const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Poems = require('../model/Poema')
const User = require('../model/User')
const { Types } = require('mongoose')

router.get('/list', async (req, res) => {
  if(req.query.limit) {
    const getPoemas = await Poems.find().limit(parseInt(req.query.limit))
    return res.json({
      success: true,
      data: getPoemas
    })
  }
  const getPoemas = await Poems.find()
  res.json({
    success: true,
    data: getPoemas
  })
})

router.put('/create', auth, async (req, res) => {
  const { title, thumbnail, text, author } = req.body
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
  if (!author) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали автора стиха'
    })
  }
  const create = await Poems.create({title, thumbnail, text, creator: req.user.userId, author})
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
  if(!poema) {
    return res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }
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
    await Poems.findByIdAndDelete(req.params.id)
    console.log(req.params.id)
    const findupdate = await User.find({liked: {_id: Types.ObjectId(req.params.id)}})
    console.log(findupdate)
    const update = await User.updateMany({$pull: {liked: {_id: Types.ObjectId(req.params.id)}}})
    console.log(update)
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
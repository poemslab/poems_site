const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Poems = require('../model/Poema')
const rateLimit = require('express-rate-limit')
const { v4: uuidv4 } = require('uuid')
const User = require('../model/User')
const Category = require('../model/Category')
const { Types } = require('mongoose')

const createRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Rate limit'
  }
})

router.get('/list', async (req, res) => {
  if (req.query.limit) {
    const getPoemas = await Poems.find().limit(parseInt(req.query.limit)).lean()
    const poemas = await Promise.all(getPoemas.map(async p => {
      const likes = await User.find({ liked: p._id }).countDocuments()

      return {
        ...p,
        likes
      }
    }))

    return res.json({
      success: true,
      data: poemas
    })
  }
  if (req.query.category) {
    const findCategory = await Category.find()
    if (!!findCategory.find(r => r.name.toLowerCase() === req.query.category.toLowerCase())) {
      const getPoemas = await Poems.find({ category: req.query.category.toLowerCase() }).lean()
      const poemas = await Promise.all(getPoemas.map(async p => {
        const likes = await User.find({ liked: p._id }).countDocuments()

        return {
          ...p,
          likes
        }
      }))
      
      return res.json({
        success: true,
        data: poemas
      })
    }
    res.status(400).json({
      success: false,
      message: 'Категория не найдена'
    })
  }
  const getPoemas = await Poems.find().lean()
  const poemas = await Promise.all(getPoemas.map(async p => {
    const likes = await User.find({ liked: p._id }).countDocuments()

    return {
      ...p,
      likes
    }
  }))

  return res.json({
    success: true,
    data: poemas
  })
})

router.put('/create', auth, createRateLimit, async (req, res) => {
  const { title, thumbnail, text, author, category } = req.body
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали заголовок'
    })
  }
  if (!category) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали категорию'
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
  const findCategory = await Category.findOne({ name: category.toLowerCase() })
  if (!findCategory) {
    return res.status(400).json({
      success: false,
      message: 'Вы не указали категорию'
    })
  }
  
  await Poems.create({ title, thumbnail, text, creator: req.user.userId, author, category: category.toLowerCase() })
  res.status(200).json({
    success: true,
    message: 'Вы успешно добавили стих на сайт'
  })
})

router.get('/get/:id', async (req, res) => {
  const find = await Poems.findById(req.params.id).lean()
  if (find) {
    // we need to cache it, but this project doesn't use redis or memcached
    const likes = await User.find({ liked: find._id }).countDocuments()

    res.status(201).json({
      success: true,
      data: {
        ...find,
        likes
      }
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }
})

router.get('/get/:id/comments', async (req, res) => {
  const find = await Poems.findById(req.params.id)
  if (find) {
    res.status(201).json({
      success: true,
      data: find.comments
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }
})

router.post('/comment/:id', auth, createRateLimit, async (req, res) => {
  const { text } = req.body
  const find = await Poems.findById(req.params.id)
  if (!find) {
    return res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }
  if(!text) {
    res.status(400).json({
      success: false,
      message: 'Вы не указали текст комментария'
    })
  }
  const id = uuidv4()
  const update = await Poems.findByIdAndUpdate(req.params.id, { $push: { comments: { text, id} } })
  if(!update) {
    return res.status(400).json({
      success: false,
      message: 'Что-то пошло не так, повторите попытку позже'
    })
  }
  res.status(201).json({
    success: true,
    message: 'Вы успешно добавили комменарий'
  })
})

router.delete('/comment/:id', auth, async (req, res) => {
  const { id } = req.body
  if(!id) {
    res.status(400).json({
      success: false,
      message: 'Вы не указали id комментария'
    })
  }
  const find = await Poems.findOne({ _id: Types.ObjectId(req.params.id)}, { comments: { $elemMatch: { id } } })
  if(!find) {
    return res.status(400).json({
      success: false,
      message: 'Стих или комментарий не найден'
    })
  }
  await Poems.findByIdAndUpdate(req.params.id, { $pull: { comments: find.comments[0] } })
  res.status(200).json({
    success: true,
    message: 'Комментарий удален'
  })
})

router.post('/like/:id', auth, async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }

  const poema = await Poems.findById(req.params.id)
  if (!poema) {
    return res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }

  const hasLike = await User.find({ _id: req.user.userId, liked: poema._id })

  if (hasLike.length > 0) {
    await User.findByIdAndUpdate(req.user.userId, { $pull: { liked: poema._id } })
    return res.status(201).json({
      success: true,
      message: 'Вы убрали этот стих из понравившихся'
    })
  }
  
  await User.findByIdAndUpdate(req.user.userId, { $push: { liked: poema._id } })
  res.status(201).json({
    success: true,
    message: 'Вы добавили в понравившийся этот стих'
  })
})

router.delete('/delete/:id', auth, async (req, res) => {
  const findPoema = await Poems.findById(req.params.id)
  if (!findPoema) {
    return res.status(400).json({
      success: false,
      message: 'Стих не найден'
    })
  }
  if (Types.ObjectId(findPoema.creator).equals(Types.ObjectId(req.user.userId)) || req.user.mod) {
    await Poems.findByIdAndDelete(req.params.id)
    await User.updateMany({ $pull: { liked: { _id: Types.ObjectId(req.params.id) } } })
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
  if (!find) {
    return res.status(401).json({
      success: false,
      message: 'Вы не авторизованы'
    })
  }
  const findPoems = await Poems.find({ creator: Types.ObjectId(req.user.userId) })
  res.status(201).json({
    success: true,
    data: {
      liked: find.liked,
      you: findPoems,
      id: req.user.userId,
      email: req.user.email,
      mod: req.user.mod
    }
  })
})

module.exports = router
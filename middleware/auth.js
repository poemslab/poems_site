const jwt = require('jsonwebtoken')
const User = require('../model/User')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Вы не авторизованы'
      })
    }
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decoded.userId)
    if(!user) {
      res.status(401).json({
        success: false,
        message: 'Вы не авторизованы'
      })
    }
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Вы не авторизованы'
    })
  }
}
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    if (req.user.mod) {
      next()
    } else {
      res.status(401).json({
        success: false,
        message: 'Вы не авторизованы'
      }) 
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Вы не авторизованы'
    })
  }
}
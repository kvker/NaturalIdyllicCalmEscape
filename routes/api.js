const { Router } = require('express')
const postRoutes = require('./api/post')
const commentRoutes = require('./api/comment')
const payRoutes = require('./api/pay')

const router = Router()

// 默认英文
router.use('/*', (req, res, next) => {
  req.locale = 'en'
  next()
})

router.use('/post', postRoutes)
router.use('/comment', commentRoutes)
router.use('/pay', payRoutes)

module.exports = router

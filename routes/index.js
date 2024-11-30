const { Router } = require('express')
const pageRoutes = require('./page')
const apiRoutes = require('./api')

const router = Router()

// API 路由
router.use('/api', apiRoutes)

// 页面路由
router.use('/', pageRoutes)

module.exports = router
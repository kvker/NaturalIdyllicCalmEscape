// @ts-check
// 目前的dev就是本机,非dev就是vercel
global.isDev = process.env.NODE_ENV === 'development'

require('dotenv').config()
const express = require('express')
const path = require('path')
const AV = require('leanengine')
const routes = require('./routes')
const en = require('./locales/en')
const zh = require('./locales/zh')

global.i18n = {
  en,
  zh
}

// 初始化 LeanCloud
if (global.isDev) {
  AV.init({
    appId: process.env.LEANCLOUD_APP_ID_DEV || '',
    appKey: process.env.LEANCLOUD_APP_KEY_DEV || '',
    // @ts-ignore
    serverURL: process.env.LEANCLOUD_SERVER_URL_DEV || '',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY_DEV || ''
  })
} else {
  AV.init({
    appId: process.env.LEANCLOUD_APP_ID || '',
    appKey: process.env.LEANCLOUD_APP_KEY || '',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || ''
  })
}
// @ts-ignore
AV.Cloud.useMasterKey()

const app = express()
const PORT = process.env.PORT || 13000

// 中间件设置
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(AV.express())

// 路由
app.use('/', routes)

module.exports = app // vercel的@vercel/node需要, 且不需要listen

if (global.isDev) {
  // 调试用
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`)
  })
}

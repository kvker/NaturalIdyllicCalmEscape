const { Router } = require('express')
const { onGetLocale, onGetTitle, onT } = require('../utils/i18n')

const router = Router()

function onGenerateLocalParams({ req, res, localPath }) {
  const locale = onGetLocale(req.query)
  return {
    locale,
    t: (key) => onT(locale, key), // 暴露的t函数已经包含了locale, 页面内不需要传locale
    title: onGetTitle(locale, onT(locale, localPath))
  }
}

// 首页
router.get('/', (req, res) => {
  res.render('index', onGenerateLocalParams({ req, res, localPath: 'site.name' }))
})

// 登录页面
router.get('/login', (req, res) => {
  res.render('login', onGenerateLocalParams({ req, res, localPath: 'login.title' }))
})

// 注册页面
router.get('/register', (req, res) => {
  res.render('register', onGenerateLocalParams({ req, res, localPath: 'register.title' }))
})

// 忘记密码页面
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', onGenerateLocalParams({ req, res, localPath: 'forgot-password.title' }))
})

// 发现页面
router.get('/explore', (req, res) => {
  res.render('explore', onGenerateLocalParams({ req, res, localPath: 'explore.title' }))
})

// 话题页面
router.get('/topics', (req, res) => {
  res.render('topics', onGenerateLocalParams({ req, res, localPath: 'topics.title' }))
})

// 个人主页
router.get('/profile', (req, res) => {
  res.render('profile', onGenerateLocalParams({ req, res, localPath: 'profile.title' }))
})

// 设置页面
router.get('/settings', (req, res) => {
  res.render('settings', onGenerateLocalParams({ req, res, localPath: 'settings.title' }))
})

module.exports = router

const { Router } = require('express')
const AV = require('leanengine')
const { onCheckContent } = require('../../services/ai')

const router = Router()

// 创建帖子
router.post('/create', async (req, res) => {
  try {
    const { content, images } = req.body
    const user = await AV.User.become(req.headers['x-lc-session'])

    if (!user) {
      return res.status(401).json({ message: global.i18n[req.locale].error.unauthorized })
    }

    // 检查用户是否是VIP
    // if (!user.get('isVip')) {
    //   return res.status(403).json({
    //     message: global.i18n[req.locale].error.post.vipRequired
    //   })
    // }

    // 检查内容是否积极向上
    const checkResult = await onCheckContent(content, req.locale)
    if (!checkResult.isPositive) {
      console.log(checkResult, content)
      return res.status(400).json({
        message: checkResult.reason
      })
    }

    // 创建帖子
    const postLcObject = new AV.Object('Post')
    await postLcObject.save({
      content,
      images,
      author: user,
      aiComment: checkResult.reason,
      commentCount: 0
    })

    res.json({
      data: 'postLcObject.toJSON()'
    })
  } catch (error) {
    console.error('创建帖子失败:', error)

    res.status(500).json({
      message: global.i18n[req.locale].error.post.createFailed
    })
  }
})

module.exports = router

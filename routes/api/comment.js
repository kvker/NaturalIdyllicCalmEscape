const { Router } = require('express')
const AV = require('leancloud-storage')
const { onCheckContent } = require('../../services/ai')

const router = Router()

// 创建评论
router.post('/create', async (req, res) => {
  try {
    const { content, postId } = req.body
    const user = await AV.User.become(req.headers['x-lc-session'])

    if (!user) {
      return res.status(401).json({ error: '未登录' })
    }

    // 检查内容是否积极向上
    const checkResult = await onCheckContent(content)
    if (!checkResult.isPositive) {
      return res.status(400).json({
        error: '内容不够积极向上',
        reason: checkResult.reason
      })
    }

    // 创建评论
    const Comment = AV.Object.extend('Comment')
    const comment = new Comment()
    comment.set('content', content)
    comment.set('author', user)
    comment.set('postRef', AV.Object.createWithoutData('Post', postId))

    await comment.save()

    // 更新帖子评论数
    const post = AV.Object.createWithoutData('Post', postId)
    post.increment('commentCount', 1)
    await post.save()

    res.status(200).json(comment.toJSON())
  } catch (error) {
    console.error('创建评论失败:', error)
    res.status(500).json({ error: '创建评论失败' })
  }
})

module.exports = router

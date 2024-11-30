// 导入必要的模块
const express = require('express')
const router = express.Router()

// POST路由，用于处理PayPal的webhooks
router.post('/webhook', (req, res) => {
  // 这里处理PayPal发送的webhook数据
  console.log('Received webhook: ')
  console.log(req.body)
  console.log(JSON.stringify(req.body, null, 2))

  // 响应PayPal，确认接收到了webhook
  res.status(200).send('Webhook received!')
})

module.exports = router

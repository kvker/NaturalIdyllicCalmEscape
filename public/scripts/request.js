const onRequest = (url, params) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-LC-Session': AV.User.current().getSessionToken()
    },
    body: JSON.stringify(params)
  })
}

// LeanCloud 操作封装
const Request = {
  // 帖子相关
  Post: {
    // 创建帖子
    async onCreate(params) {
      try {
        const response = await onRequest('/api/post/create', params)
        if (!response.ok) {
          const error = await response.json()
          return Promise.reject(error)
        }
        return response.json()
      } catch (error) {
        console.error('创建帖子失败:', error)
        return Promise.reject(error)
      }
    }
  },

  // 评论相关
  Comment: {
    /**
     * 创建评论
     * @param {Object} params - 创建评论参数
     * @param {string} params.content - 评论内容
     * @param {string} params.postId - 帖子ID
     * @returns {Promise<Comment>} 评论信息
     */
    async onCreate({ content, postId }) {
      try {
        const response = await onRequest('/api/comment/create', { content, postId })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.reason || error.error || '回复失败')
        }

        return response.json()
      } catch (error) {
        console.error('创建评论失败:', error)
        return Promise.reject(error)
      }
    }
  }
}

window.isDev = location.href.includes('localhost') || location.href.includes('127.0.0.1') || location.href.includes('192.168.')

if (isDev) {
  AV.init({
    appId: 'XzhLvXQfj46b0PAlXN7f3TsF-gzGzoHsz',
    appKey: '2irmEL4eq5hncmQPUkjul0XA',
    serverURL: 'https://xzhlvxqf.lc-cn-n1-shared.com'
  })
} else {
  AV.init({
    appId: 'dPMUEzLTWCbUefIoUft1YGK4-MdYXbMMI',
    appKey: 'KDmCNwYozh2qF0CVvnrNm5yN',
    serverURL: 'https://dpmuezlt.api.lncldglobal.com'
  })
}
// LeanCloud 操作封装
const LC = {
  // 帖子相关
  Post: {
    // 获取帖子列表
    async onGetList({ page = 1, limit = 10, author = null }) {
      try {
        const query = new AV.Query('Post')
        if (author) {
          query.equalTo('author', author)
        }
        query.include(['author', 'images'])
        query.descending('createdAt')
        query.limit(limit)
        query.skip((page - 1) * limit)
        const posts = await query.find()
        return posts.map((post) => post.toJSON())
      } catch (error) {
        console.error('获取帖子列表失败:', error)
        return Promise.reject(error)
      }
    }
  },

  // 评论相关
  Comment: {
    /**
     * 获取评论列表
     * @param {Object} params - 查询参数
     * @param {string} params.postId - 帖子ID
     * @param {number} [params.page=1] - 页码
     * @param {number} [params.limit=10] - 每页数量
     * @returns {Promise<Array<Comment>>} 评论列表
     */
    async onGetList({ postId, page = 1, limit = 10 }) {
      try {
        const query = new AV.Query('Comment')
        query.equalTo('postRef', AV.Object.createWithoutData('Post', postId))
        query.include('author')
        query.ascending('createdAt')
        query.limit(limit)
        query.skip((page - 1) * limit)
        const comments = await query.find()
        return comments.map((comment) => comment.toJSON())
      } catch (error) {
        console.error('获取评论列表失败:', error)
        return Promise.reject(error)
      }
    }
  }
}

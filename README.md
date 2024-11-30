# Nice Community

一个专注于分享积极向上内容的社交平台。

非常适合前端转全栈以及AIGC入手学习。

## 功能特点

- 移动端优先设计
- 200字限制的内容分享
- 积极向上的内容审核
- 友善的评论互动系统

## 技术栈

- Express + TypeScript (后端框架)
- EJS (服务端渲染)
- Alpine.js (前端交互)
- Tailwind CSS (样式框架)
- LLM Service (内容审核)
- LeanCloud (后端云服务，ServerLess)

## 项目结构

- locals，多语言，目前限制为中文和英文，运行目前只使用en
- public，静态资源
- routes，路由
- services，服务
- utils，工具函数，目前是多语言工具
- views，视图
- app.js，入口文件
- .env，自行填写环境变量，必填项: OPENAI_API_KEY、LEANCLOUD_APP_ID、LEANCLOUD_APP_KEY、LEANCLOUD_SERVER_URL（中国服务必填）、LEANCLOUD_APP_MASTER_KEY

**由于多语言后面只使用了英文，所以看到很多中文，可以无视。**
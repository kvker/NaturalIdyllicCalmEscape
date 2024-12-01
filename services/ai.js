const OpenAI = require('openai')
const zhLocale = require('../locales/zh')
const enLocale = require('../locales/en')

let openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY
}

if (global.isDev) {
  openaiConfig = {
    apiKey: process.env.OPENAI_API_KEY_PROXY,
    baseURL: process.env.OPENAI_BASE_URL_PROXY
  }
}

const openai = new OpenAI(openaiConfig)

/**
 * AI服务模块
 * @module services/ai
 */

/**
 * 检查内容是否积极向上
 * @async
 * @param {string} content - 需要检查的内容文本
 * @returns {Promise<Object>} 返回检查结果对象
 * @returns {boolean} result.isPositive - 内容是否积极向上
 * @returns {string} result.reason - 判断理由
 * @throws {Error} 当API调用失败时抛出错误
 * @example
 * try {
 *   const result = await onCheckContent('这是一段积极向上的内容');
 *   console.log(result.isPositive); // true
 *   console.log(result.reason); // '这段内容传递了正能量...'
 * } catch (error) {
 *   console.error('检查失败:', error);
 * }
 */

exports.onCheckContent = async function onCheckContent(content, locale = 'en') {
  // 获取对应的语言配置
  const locales = {
    zh: zhLocale,
    en: enLocale
  }

  // 根据语言获取对应的提示语
  const getSystemPrompt = (locale) => {
    if (locale === 'zh') {
      return '你是一个内容审核助手，专门判断内容是否积极向上。如果内容积极向上，返回 true，否则返回 false。'
    }
    return 'You are a content moderation assistant. Your task is to determine if the content is positive and constructive. Return true for positive content, false otherwise.'
  }

  // 获取错误信息
  const getErrorMessage = (locale) => {
    const currentLocale = locales[locale] || locales.en
    return currentLocale.comment.error.notPositive
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(locale)
        },
        {
          role: 'user',
          content:
            locale === 'zh' ? `请判断以下内容是否积极向上：${content}` : `Please determine if the following content is positive: ${content}`
        }
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'onCheckPositiveContent',
            description: locale === 'zh' ? '判断内容是否积极向上' : 'Determine if the content is positive and constructive',
            parameters: {
              type: 'object',
              properties: {
                isPositive: {
                  type: 'boolean',
                  description: locale === 'zh' ? '内容是否积极向上' : 'Whether the content is positive'
                },
                reason: {
                  type: 'string',
                  description: locale === 'zh' ? '判断理由' : 'Reason for the judgment'
                }
              },
              required: ['isPositive', 'reason']
            }
          }
        }
      ],
      tool_choice: { type: 'function', function: { name: 'onCheckPositiveContent' } }
    })

    const result = JSON.parse(completion.choices[0].message.tool_calls[0].function.arguments)

    // 如果内容不是积极向上的，使用对应语言的错误信息
    if (!result.isPositive) {
      result.reason = getErrorMessage(locale)
    }

    return result
  } catch (error) {
    console.error(locale === 'zh' ? '内容审核失败:' : 'Content check failed:', error)
    throw error
  }
}

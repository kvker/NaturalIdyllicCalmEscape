// LeanCloud 错误码处理工具
const LCError = {
  // 获取错误信息
  onGetMessage({ error }) {
    const code = error.code
    const message = this.ERROR_MESSAGES[code]

    if (message) {
      return Promise.resolve(`${message.info}${message.info ? ' - ' : ''}${message.meaning}`)
    }

    // 默认错误信息
    return Promise.resolve(error.rawMessage || 'Operation failed, please try again later')
  },

  // 错误码映射表
  ERROR_MESSAGES: {
    // 通用错误
    1: {
      info: 'Internal server error. No information available.',
      meaning: '服务器内部错误或者参数错误，一般是因为传入了错误的参数，或者服务器内部错误'
    },

    // 用户相关错误 (200-219)
    200: {
      info: 'Username is missing or empty',
      meaning: '没有提供用户名，或者用户名为空'
    },
    201: {
      info: 'Password is missing or empty.',
      meaning: '没有提供密码，或者密码为空'
    },
    202: {
      info: 'Username has already been taken.',
      meaning: '用户名已经被占用'
    },
    203: {
      info: 'Email has already been taken.',
      meaning: '电子邮箱地址已经被占用'
    },
    204: {
      info: 'The email is missing, and must be specified.',
      meaning: '没有提供电子邮箱地址'
    },
    205: {
      info: 'A user with the specified email was not found.',
      meaning: '找不到电子邮箱地址对应的用户'
    },
    206: {
      info: 'The user cannot be altered by a client without the session.',
      meaning: '没有提供 session，无法修改用户信息，这通常是因为没有登录的用户想修改信息'
    },
    210: {
      info: 'The username and password mismatch.',
      meaning: '用户名和密码不匹配'
    },
    211: {
      info: 'Could not find user.',
      meaning: '找不到用户'
    },
    216: {
      info: "Email address isn't verified.",
      meaning: '未验证的邮箱地址'
    },
    217: {
      info: 'Invalid username, it must be a non-blank string.',
      meaning: '无效的用户名，不允许空白用户名'
    },
    218: {
      info: 'Invalid password, it must be a non-blank string.',
      meaning: '无效的密码，不允许空白密码'
    },
    219: {
      info: 'Login attempts exceeded. Please try again later or reset your password through \'Forgot Password\'.',
      meaning:
        '如果在 15 分钟内，同一个用户登录失败的次数大于 6 次，该用户账户即被云端暂时锁定。锁定将在最后一次错误登录的 15 分钟之后由云端自动解除。登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。'
    },

    // 权限相关错误
    401: {
      info: 'Unauthorized.',
      meaning: '未经授权的访问，没有提供 App id，或者 App id 和 App key 校验失败'
    },
    403: {
      info: 'Forbidden to read/write by class permissions',
      meaning: '操作被禁止，因为 Class 表没有打开相应的权限'
    },

    // 文件相关错误
    413: {
      info: 'Payload Too Large.',
      meaning: '请求实体过大，一般是上传文件大小超过限制'
    },

    // 请求频率限制
    429: {
      info: 'Too many requests.',
      meaning: '超过应用的流控限制'
    },

    // 第三方服务错误
    600: {
      info: 'Invalid SMS signature.',
      meaning: '无效的短信签名'
    },
    601: {
      info: "Can't send SMS too frequently.",
      meaning: '发送短信过于频繁'
    },
    602: {
      info: 'Fails to send message.',
      meaning: '发送短信或者语音验证码失败'
    },
    603: {
      info: 'Invalid SMS code.',
      meaning: '无效的短信验证码，通常是不匹配或者过期'
    }
  }
}

// 使用示例:
// const errorMessage = LCError.getErrorMessage(error)
// alert(errorMessage)

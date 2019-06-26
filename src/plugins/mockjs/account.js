import Mock from 'mockjs'

const accountData = Mock.mock({
  'username': '@name',
  'access_token': '@title(32)'
})

Mock.mock('/account/login', 'post', ({ body }) => {
  let data = JSON.parse(body)
  if (data.username === 'admin' && data.password === 'admin') {
    return {
      status: 200,
      data: { ...accountData, roles: ['admin'] },
      message: '',
      sysMsg: ''
    }
  } else if (data.username === 'guest' && data.password === 'guest') {
    return {
      status: 200,
      data: { ...accountData, roles: ['guest'] },
      message: '',
      sysMsg: ''
    }
  } else {
    return {
      status: 400,
      data: null,
      message: '用户名或密码错误',
      sysMsg: ''
    }
  }
})

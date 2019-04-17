import Mock from 'mockjs'

const accountData = Mock.mock({
  'username': '@name',
  'access_token': '@title(32)'
})

Mock.mock('/account/login', 'post', ({ body }) => {
  console.log(body)
  return {
    status: 200,
    data: accountData,
    message: '',
    sysMsg: ''
  }
})

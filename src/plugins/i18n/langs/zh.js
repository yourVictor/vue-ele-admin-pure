export default {
  routes: {
    dashboard: '后台首页',
    systemManage: '系统管理',
    userList: '账号列表',
    userDetail: '账号详情',
    roleList: '角色列表',
    roleAdd: '新建角色',
    roleEdit: '角色编辑',
    systemSetting: '系统设置',
    baseSetting: '基本设置'
  },
  pages: {
    common: {
      logoutWarnTitle: '提示',
      logoutWarnText: '由于长时间未操作，须重新登录系统。'
    },
    login: {
      username: '用户名',
      password: '密码',
      usernameError: '请输入用户名',
      passwordError: '请输入密码'
    }
  },
  buttons: {
    ack: '确定',
    cancel: '取消',
    login: '登 录',
    logout: '退出登录',
    switchTheme: '切换主题'
  }
}

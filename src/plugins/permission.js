import router from '../router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/authentication' // getToken from cookie
import $config from '@/utils/config'
import store from '@/store'

let flag = true

NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/', replace: true })
      NProgress.done()
    } else {
      if (flag) {
        flag = false
        store.dispatch('GenerateRoutes', { roles: store.getters.account.roles }).then(() => {
          router.addRoutes(store.getters.addRoutes)
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
    }
  } else if ($config.loginWhiteList.indexOf(to.path) !== -1) {
    // 在免登录白名单，直接进入
    flag = true
    next()
  } else {
    flag = true
    next('/login') // 否则全部重定向到登录页
    NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

import router, { asyncRouterMap } from '../router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '../utils/authentication' // getToken from cookie
import store from '../store'

const whiteList = ['/login'] // whitelist
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
        store.dispatch('GenerateRoutes', { roles: 'admin' }).then(() => {
          router.addRoutes(asyncRouterMap)
          next({ ...to, replace: true })
        })
      } else {
        next()
      }

      /* if (store.getters.merchantId === '') {
        store.dispatch('GetMerchantId', { companyName: user.companyName })
          .then(res => { // 拉取MerchantId
            if (flag) {
              flag = false
              store.dispatch('GenerateRoutes', { roles: 'admin' }).then(() => {
                router.addRoutes(asyncRouterMap)
                next({ ...to, replace: true })
              })
            } else {
              next()
            }
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error, 'store.dispatch(\'GetMerchantId\')')
          })
      } else {
        next()
      } */
    }
  } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
  } else {
    next('/login') // 否则全部重定向到登录页
    NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

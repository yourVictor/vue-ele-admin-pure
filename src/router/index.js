import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/container/index'
import member from '@/router/member'
import components from '@/router/components'
import setting from '@/router/setting'

// -- 在升级了Vue-Router版本到到3.1.0及以上之后，页面在跳转路由控制台会报Uncaught (in promise)的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// -- end
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/404',
    name: 'error',
    meta: { title: '404', hidden: true },
    component: () => import(/* webpackChunkName: "error" */ '@/views/error/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录', hidden: true },
    component: () => import(/* webpackChunkName: "account" */ '@/views/account/login/index.vue')
  },
  {
    path: '',
    meta: { title: 'routes.dashboard', icon: 'el-icon-extend-dashboard' },
    redirect: '/dashboard',
    component: Container,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: 'routes.dashboard', showParent: false },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
      }
    ]
  }
]
export const asyncRouterMap = [
  member,
  components,
  setting,
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]
export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE,
  base: process.env.VUE_APP_ROUTER_BASE,
  routes: constantRouterMap
})

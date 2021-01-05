import Container from '@/container/index'

export default {
  path: '/systemSetting',
  name: 'systemSetting',
  redirect: '/systemSetting/base',
  meta: { title: 'routes.systemSetting', icon: 'el-icon-extend-dashboard', roles: ['admin'] },
  component: Container,
  children: [
    {
      path: 'base',
      name: 'baseSetting',
      meta: { title: 'routes.baseSetting', showParent: true },
      component: () => import(/* webpackChunkName: "systemSetting" */ '@/views/systemSetting/base/index.vue')
    }
  ]
}

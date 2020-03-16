import Container from '@/container/index'

export default {
  path: '/settings',
  name: 'settings',
  redirect: '/settings/base',
  meta: { title: 'routes.settings', icon: 'el-icon-extend-dashboard', roles: ['admin'] },
  component: Container,
  children: [
    {
      path: 'base',
      name: 'baseSettings',
      meta: { title: 'routes.baseSettings', showParent: true },
      component: () => import(/* webpackChunkName: "setting" */ '@/views/settings/base/index.vue')
    }
  ]
}

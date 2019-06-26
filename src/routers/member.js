import Container from '@/container/index'

export default {
  path: '/member',
  name: 'member',
  redirect: '/member/list',
  meta: { title: 'routes.member', icon: 'el-icon-extend-dashboard' },
  component: Container,
  children: [
    {
      path: 'list',
      name: 'memberList',
      meta: { title: 'routes.memberList', showParent: true },
      component: () => import(/* webpackChunkName: "member" */ '@/views/member/list/index.vue')
    },
    {
      path: ':id/detail',
      name: 'memberDetail',
      meta: { title: 'routes.memberDetail', hidden: true, index: '/member/list' },
      component: () => import(/* webpackChunkName: "member" */ '@/views/member/detail/index.vue')
    }
  ]
}

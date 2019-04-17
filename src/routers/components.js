import Container from '../container/index'

export default {
  path: '/components',
  name: 'components',
  redirect: '/components/base',
  meta: { title: 'routes.components', icon: 'el-icon-extend-dashboard' },
  component: Container,
  children: [
    {
      path: 'base',
      name: 'baseComponents',
      meta: { title: 'routes.baseComponents' },
      component: () => import(/* webpackChunkName: "components" */ '../views/components/base/index.vue')
    },
    {
      path: 'complex',
      name: 'complexComponents',
      meta: { title: 'routes.complexComponents' },
      component: () => import(/* webpackChunkName: "components" */ '../views/components/complex/index.vue')
    }
  ]
}

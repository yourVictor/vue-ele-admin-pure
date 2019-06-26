export default {
  token: state => state.account.token,
  account: state => state.account.account,
  routes: state => state.account.routes,
  addRoutes: state => state.account.addRoutes,
  sidebar: state => state.app.sidebar,
  visitedTagViews: state => state.tagView.visitedTagViews
}

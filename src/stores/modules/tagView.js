export default {
  state: {
    visitedTagViews: []
  },
  mutations: {
    ADD_TAG_VIEW: (state, view) => {
      if (state.visitedTagViews.some(v => v.path === view.path)) return
      state.visitedTagViews.push(view)
    },
    DEL_TAG_VIEW: (state, index) => {
      state.visitedTagViews.splice(index, 1)
    }
  },
  actions: {
    addTagView ({ commit }, view) {
      commit('ADD_TAG_VIEW', view)
    },
    delTagView ({ commit }, index) {
      commit('DEL_TAG_VIEW', index)
    }
  }
}

import config from '../../utils/config'
export default {
  state: {
    sidebar: {
      isCollapse: localStorage.getItem('sidebarIsCollapse') === '1' || false,
      isDarkTheme: (localStorage.getItem('sidebarIsDarkTheme') || '1') === '1' || false,
      hidden: document.body.clientWidth < config.hasSideMinWidth
    }
  },
  mutations: {
    TOGGLE_SIDEBAR_COLLAPSE: (state) => {
      if (state.sidebar.isCollapse) {
        localStorage.setItem('sidebarIsCollapse', '0')
      } else {
        localStorage.setItem('sidebarIsCollapse', '1')
      }
      state.sidebar.isCollapse = !state.sidebar.isCollapse
    },
    TOGGLE_SIDEBAR_DARK_THEME: (state) => {
      if (state.sidebar.isDarkTheme) {
        localStorage.setItem('sidebarIsDarkTheme', '1')
      } else {
        localStorage.setItem('sidebarIsDarkTheme', '0')
      }
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.hidden = (document.body.clientWidth < config.hasSideMinWidth)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    ToggleSideBarCollapse: ({ commit }) => {
      commit('TOGGLE_SIDEBAR_COLLAPSE')
    },
    ToggleSideBarDarkTheme: ({ commit }) => {
      commit('TOGGLE_SIDEBAR_DARK_THEME')
    }
  }
}

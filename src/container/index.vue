<template>
  <div class="main-container">
    <el-container>
      <sidebar :sidebar="sidebar" :routes="routes" :toggleTheme="toggleSideBarDarkTheme" />
      <el-container direction="vertical">
        <header-bar :account="account" :sidebar="sidebar" :routes="routes" :toggleCollapse="toggleSideBarCollapse" />
        <tag-view v-if="!sidebar.hidden"></tag-view>
        <el-main id="main-content" :class="{ 'no-padding': sidebar.hidden && !$route.path.match('/dashboard') }">
          <transition
            :enter-to-class="$route.params.backFlag || $route.query.backFlag ? 'animated fadeIn' : 'animated fadeIn'"
            :leave-active-class="$route.params.backFlag || $route.query.backFlag ? 'animated fadeOut' : 'animated fadeOut'"
            :duration="{ enter: 600, leave: 200 }"
          >
            <keep-alive v-show="show" :include="keepAliveRoute.join(',')">
              <router-view ref="child-ref" :style="'min-height:' + (bodyHeight - 86 - (sidebar.hidden ? -36 : 40)) + 'px;box-sizing: border-box'" />
            </keep-alive>
          </transition>
          <to-top />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import sidebar from './component/sidebar/index'
import headerBar from './component/headerBar/index'
import tagView from './component/tagView/index'
import toTop from './component/toTop/index'
import './index.scss'
export default {
  name: 'container',
  components: {
    sidebar,
    headerBar,
    tagView,
    toTop
  },
  data() {
    return {
      show: true,
      keepAliveRoute: ['placeholder'],
      bodyHeight: document.body.offsetHeight || document.documentElement.clientHeight
    }
  },
  computed: {
    account() {
      return this.$store.getters.account
    },
    sidebar() {
      return this.$store.getters.sidebar
    },
    routes() {
      return this.$store.getters.routes
    }
  },
  watch: {
    $route(to) {
      // to,from
      this.show = !this.show
      if (to.meta.keepAlive && !this.keepAliveRoute.includes(to.name)) {
        this.keepAliveRoute.push(to.name)
      }

      if (to.query.backFlag === undefined && this.keepAliveRoute.includes(to.name)) {
        this.keepAliveRoute = this.keepAliveRoute.filter(i => i !== to.name)

        setTimeout(() => {
          this.keepAliveRoute.push(to.name)
        }, 100)
      }
    }
  },
  created() {
    let timer
    window.onresize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.toggleSideBar()
        window.screenWidth = document.body.offsetWidth || document.documentElement.clientWidth
        this.$set(this, 'bodyHeight', document.body.offsetHeight || document.documentElement.clientHeight)
        if (this.$refs['child-ref'] && this.$refs['child-ref'].resizeCallBack) {
          this.$refs['child-ref'].resizeCallBack()
        }
      }, 100)
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    toggleSideBarCollapse() {
      this.$store.dispatch('ToggleSideBarCollapse')
      if (this.$refs['child-ref'] && this.$refs['child-ref'].resizeCallBack) {
        this.$refs['child-ref'].resizeCallBack(true)
      }
    },
    toggleSideBarDarkTheme() {
      this.$store.dispatch('ToggleSideBarDarkTheme')
    }
  }
}
</script>

<template>
    <div class="main-container">
        <el-container>
            <sidebar :sidebar="sidebar" :routes="routes" :toggleTheme="toggleSideBarDarkTheme"/>
            <el-container direction="vertical">
                <header-bar :account="account" :sidebar="sidebar" :routes="routes" :toggleCollapse="toggleSideBarCollapse"/>
                <tag-view v-if="!sidebar.hidden"></tag-view>
                <el-main id="main-content" :class="{'no-padding': sidebar.hidden&&!$route.path.match('/dashboard')}">
                    <transition :enter-to-class="$route.params.backFlag||$route.query.backFlag?'animated bounceInLeft':'animated bounceInRight'" :leave-active-class="$route.params.backFlag||$route.query.backFlag?'animated bounceOutRight':'animated bounceOutLeft'" :duration="{ enter: 800, leave: 300 }">
                        <router-view ref="child-ref" :style="'min-height:'+(bodyHeight-86-(sidebar.hidden?-36:40))+'px;box-sizing: border-box'"/>
                    </transition>
                    <to-top/>
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
  data () {
    return {
      bodyHeight: document.body.offsetHeight || document.documentElement.clientHeight
    }
  },
  created () {
    let timer
    window.onresize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.toggleSideBar()
        window.screenWidth = document.body.offsetWidth || document.documentElement.clientWidth
        this.$set(this, 'bodyHeight', document.body.offsetHeight || document.documentElement.clientHeight)
        if (this.$refs['child-ref'].resizeCallBack) {
          this.$refs['child-ref'].resizeCallBack()
        }
      }, 100)
    }
  },
  computed: {
    account () {
      return this.$store.getters.account
    },
    sidebar () {
      return this.$store.getters.sidebar
    },
    routes () {
      return this.$store.getters.routes
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    toggleSideBarCollapse () {
      this.$store.dispatch('ToggleSideBarCollapse')
      this.$refs['child-ref'].resizeCallBack(true)
    },
    toggleSideBarDarkTheme () {
      this.$store.dispatch('ToggleSideBarDarkTheme')
    }
  }
}
</script>

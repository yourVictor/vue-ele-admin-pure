<template>
    <el-aside v-if="!sidebar.hidden" :class="{'el-aside-dark': sidebar.isDarkTheme, 'el-aside-collapse': sidebar.isCollapse}">
        <div :class="sidebar.isCollapse?'app-logo is-collapse':'app-logo'">
            <img src="../../../assets/logo.png"/>
            <div v-if="!sidebar.isCollapse">{{ appName }}</div>
        </div>
        <Menu :routes="routes" :sidebar="sidebar"></Menu>
        <div class="sidebar-footer" v-if="!sidebar.isCollapse">
            <div>{{$t('buttons.switchTheme')}}</div>
            <el-switch v-model="sidebar.isDarkTheme" @change="toggleTheme"></el-switch>
        </div>
    </el-aside>
</template>
<script>
import Menu from '../menu/index'
import config from '../../../utils/config'
import './index.scss'
export default {
  name: 'sidebar',
  props: {
    sidebar: {
      type: Object
    },
    routes: {
      type: Array
    },
    toggleTheme: {
      type: Function
    }
  },
  components: {
    Menu
  },
  data () {
    return {
      appName: config.appName
    }
  }
}
</script>

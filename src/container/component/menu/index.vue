<template>
  <el-menu
    unique-opened
    :background-color="!sidebar.hidden && sidebar.isDarkTheme ? '#4b4b4b' : '#fff'"
    :text-color="!sidebar.hidden && sidebar.isDarkTheme ? '#cacaca' : '#333'"
    :collapse="!sidebar.hidden && sidebar.isCollapse"
    :default-active="$route.meta.index ? $route.meta.index : $route.path"
    @select="menuSelect"
  >
    <template v-for="route in routes">
      <menu-item v-if="!route.meta.hidden && route.children" :key="route.name" :item="route" :base-path="route.path"></menu-item>
    </template>
  </el-menu>
</template>

<script>
import menuItem from './menuItem'
import './index.scss'
export default {
  name: 'Menu',
  components: {
    menuItem
  },
  props: {
    sidebar: {
      type: Object
    },
    routes: {
      type: Array
    },
    changeMenuPop: {
      type: Function
    }
  },
  methods: {
    menuSelect() {
      if (this.changeMenuPop) {
        this.changeMenuPop()
      }
    }
  }
}
</script>

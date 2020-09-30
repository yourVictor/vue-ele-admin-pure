<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <template v-if="item.meta.title">
          <span v-if="item.redirect || index === levelList.length - 1" class="no-redirect">{{ $t(item.meta.title) }}</span>
          <router-link v-else :to="item.redirect || item.path">{{ $t(item.meta.title) }}</router-link>
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import './index.scss'
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/', name: 'dashboard', meta: { title: 'routes.dashboard' } }].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

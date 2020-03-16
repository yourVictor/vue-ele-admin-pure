<template>
  <router-link v-if="onlyOneShowingChildren(item.children) && !item.children[0].children" :to="basePath+'/'+item.children[0].path">
    <el-menu-item :index="basePath+'/'+item.children[0].path">
      <i v-if="item.meta.icon" :class="item.meta.icon"></i>
      <span v-if="item.meta.title" slot="title">{{$t(item.meta.title)}}</span>
    </el-menu-item>
  </router-link>
  <div v-else class="el-submenu">
    <el-submenu :index="item.path" :key="item.name" :popper-append-to-body="true">
      <template slot="title">
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <span slot="title" v-if="item.meta.title">{{$t(item.meta.title)}}</span>
      </template>
      <template v-for="child in item.children">
        <template v-if="!child.meta.hidden">
          <router-link v-if="!child.children" :to="basePath+'/'+child.path" :key="child.path">
            <el-menu-item :index="basePath+'/'+child.path">
              <i v-if="child.meta.icon" :class="child.meta.icon"></i>
              <span v-if="child.meta.title" slot="title">{{$t(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
          <menu-item v-else :is-nest="true" :item="child" :key="child.path" :base-path="basePath+'/'+child.path" class="nest-menu"/>
        </template>
      </template>
    </el-submenu>
  </div>

</template>
<script>
export default {
  name: 'menuItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    onlyOneShowingChildren (children) {
      const showingChildren = children.filter(item => {
        return !item.meta || (item.meta && !item.meta.hidden)
      })
      // 某些菜单虽只有一个子菜单，也要显示父菜单
      if (showingChildren.length === 1 && children[0].meta && children[0].meta.showParent) {
        return false
      }
      return showingChildren.length === 1
    }
  }
}
</script>

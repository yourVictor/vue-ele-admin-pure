<template>
  <div class="tag-view-container">
    <el-tag
      v-if="visitedTagViews.length === 1 && visitedTagViews[0].path === '/dashboard'"
      :class="$route.path === visitedTagViews[0].path ? 'active' : ''"
      type="success"
      size="small"
      disable-transitions
    >
      {{ $t(visitedTagViews[0].meta.title) || '' }} {{ visitedTagViews[0].params.id ? `【${visitedTagViews[0].params.id}】` : '' }}
    </el-tag>
    <template v-else>
      <el-tag
        v-for="(item, index) in visitedTagViews"
        :key="item.path"
        :class="$route.path === item.path ? 'active' : ''"
        type="primary"
        size="small"
        closable
        disable-transitions
        @click="handleClick(item)"
        @close="handleClose(index, $route.path === item.path)"
      >
        {{ $t(item.meta.title) || '' }} {{ item.params.id ? `【${item.params.id}】` : '' }}
      </el-tag>
      <!--<span v-for="(item, index) in visitedTagViews" :key="item.path" @click.passive="handleClick(item)">
                <el-tag :class="$route.path===item.path?'active':''" type="primary" size="small" closable disable-transitions @close="handleClose(index, $route.path===item.path)">
                    {{$t(item.meta.title)||''}} {{item.params.id?`【${item.params.id}】`:''}}
                </el-tag>
            </span>-->
    </template>
  </div>
</template>
<script>
import './index.scss'
export default {
  name: 'tagView',
  data() {
    return {}
  },
  computed: {
    visitedTagViews() {
      return this.$store.getters.visitedTagViews
    }
  },
  watch: {
    $route() {
      this.addTagView()
    }
  },
  mounted() {
    this.addTagView()
  },
  methods: {
    addTagView() {
      if (this.$route.path) {
        this.$store.dispatch('addTagView', this.$route)
      }
    },
    handleClick(item) {
      const lastIndex = this.visitedTagViews.findIndex(i => i.name === this.$route.name)
      const newIndex = this.visitedTagViews.findIndex(i => i.name === item.name)
      this.$router.push({ path: item.path, query: { backFlag: lastIndex > newIndex } })
    },
    handleClose(index, currentActiveFlag) {
      this.$store.dispatch('delTagView', index)
      setTimeout(() => {
        if (currentActiveFlag) {
          if (this.visitedTagViews.length) {
            this.$router.push({ path: this.visitedTagViews[0].path, query: { backFlag: true } })
          } else {
            this.$router.push({ path: '/' })
          }
        }
      }, 100)
    }
  }
}
</script>

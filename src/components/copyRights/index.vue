<template>
  <div v-if="show" class="block-copy-rights" @click="toAuthorPage">
    <el-tooltip content="我也想做一个这样的网站，点击联系" placement="right">
      <span>@Mole 提供技术支持</span>
    </el-tooltip>
  </div>
</template>
<script>
import './index.scss'
export default {
  name: 'copy-rights',
  data() {
    return {
      showDate: new Date('2020-05-20').getTime(),
      show: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      const date = new Date().getTime()
      this.show = date > this.showDate
    },
    toAuthorPage() {
      window.open('https://github.com/yourVictor/Mole')
    }
  }
}
</script>

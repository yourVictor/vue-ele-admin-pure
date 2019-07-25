<template>
    <div class="base-components-container">
        base-components-container
        <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
</template>
<script>
import './index.scss'
export default {
  name: 'baseComponents',
  metaInfo () {
    return {
      /* titleTemplate: '%s - 基本组件',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'base-components-keyword' },
        { vmid: 'description', name: 'description', content: 'base-components-description' }
      ] */
    }
  },
  data () {
    return {
      input: ''
    }
  }
}
</script>

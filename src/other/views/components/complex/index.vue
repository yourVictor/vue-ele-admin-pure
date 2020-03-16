<template>
    <div class="complex-components-container">
        <tinymce-editor v-model="content"/>
        <div>{{content}}</div>

        <tinymce-editor v-model="newContent"/>
        <div>{{newContent}}</div>
    </div>
</template>
<script>
import tinymceEditor from '@/components/tinymceEditor/v1/index'
import './index.scss'
export default {
  name: 'complexComponents',
  metaInfo () {
    return {
      /* titleTemplate: '%s - 复杂组件',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'complex-components-keyword' },
        { vmid: 'description', name: 'description', content: 'complex-components-description' }
      ] */
    }
  },
  components: {
    tinymceEditor
  },
  data () {
    return {
      content: '',
      newContent: ''
    }
  }
}
</script>

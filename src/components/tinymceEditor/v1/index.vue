<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled"> </editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/index'
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/link' // 插入链接插件
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/textcolor'
import './index.scss'
export default {
  name: 'tinymceEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      // default: ''
      default: 'link lists image media table textcolor wordcount'
    },
    toolbar: {
      type: [String, Array],
      // default: ''
      default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    }
  },
  components: {
    Editor
  },
  data() {
    return {
      init: {
        language_url: `${process.env.BASE_URL}static/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `${process.env.BASE_URL}static/tinymce/skins/ui/oxide`,
        // skin_url: `${process.env.BASE_URL}static/tinymce/skins/ui/oxide-dark`,//暗色系
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // const file = blobInfo.blob()
          success(img)
          console.log(failure)
        }
      },
      myValue: this.value
    }
  },
  mounted() {
    tinymce.init({})
  },
  deactivated() {
    tinymce.remove()
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<template>
  <div class="base-components-container">
    <search-form :queryConfig="queryConfig" :listQuery="listQuery" :search="search"></search-form>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="60%">
      <tinymce-editor v-if="dialogVisible" v-model="content"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SearchForm from '@/components/searchForm/v1/index'
import tinymceEditor from '@/components/tinymceEditor/v1/index'
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
  components: {
    SearchForm,
    tinymceEditor
  },
  data () {
    let tempTypeData = [
      { label: '简单组件', value: 0 },
      { label: '高阶组件', value: 1 }
    ]
    return {
      queryConfig: [
        { type: 'input', label: '名称', prop: 'name' },
        { type: 'select', label: '类型', prop: 'type', data: tempTypeData },
        { type: 'daterange', label: '注册日期', prop: 'regDate' }
      ],
      listQuery: {
        name: '',
        type: '',
        regDate: []
      },
      dialogVisible: false,
      content: ''
    }
  },
  methods: {
    search () {
      this.dialogVisible = true
    }
  }
}
</script>

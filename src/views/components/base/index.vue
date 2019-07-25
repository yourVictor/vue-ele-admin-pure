<template>
  <div class="base-components-container">
    <search-form :queryConfig="queryConfig" :listQuery="listQuery" :search="search"></search-form>
  </div>
</template>
<script>
import SearchForm from '@/components/searchForm/v1/index'
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
    SearchForm
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
      }
    }
  }
}
</script>

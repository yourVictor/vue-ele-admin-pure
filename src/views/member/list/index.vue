<template>
  <div class="member-list-container">
    <search-form :queryConfig="queryConfig" :listQuery="listQuery" :search="search"></search-form>
  </div>
</template>
<script>
import SearchForm from '@/components/searchForm/v1/index'
import './index.scss'
export default {
  name: 'memberList',
  metaInfo () {
    return {
      /* titleTemplate: '%s - 用户管理',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'member-list-keyword' },
        { vmid: 'description', name: 'description', content: 'member-list-description' }
      ] */
    }
  },
  components: {
    SearchForm
  },
  data () {
    const tempSexData = [
      { label: '保密', value: 0 },
      { label: '男', value: 1 },
      { label: '女', value: 2 }
    ]
    return {
      queryConfig: [
        { type: 'input', label: '昵称', prop: 'nickname' },
        { type: 'select', label: '性别', prop: 'sex', data: tempSexData },
        { type: 'daterange', label: '注册日期', prop: 'regDate' }
      ],
      listQuery: {
        nickname: '',
        sex: '',
        regDate: []
      }
    }
  },
  methods: {
    search () {
      //
    }
  }
}
</script>

<template>
  <div class="user-list-container">
    <list-page :queryConfig="queryConfig" :listQuery="listQuery" :list="list" :listLoading="listLoading" :listTotal="listTotal" @fetchData="fetchData">
      <template slot="table-column">
        <el-table-column align="center" prop="nickname" label="会员昵称" min-width="100"></el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号码" min-width="100"></el-table-column>
        <el-table-column align="center" prop="" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="$router.push({ name: 'userDetail', params: { id: scope.row.id } })" plain>查看</el-button>
            <el-button type="primary" size="mini" v-if="scope.row.userLevel === 1" @click="operate(scope.row, 'update')" plain>升级</el-button>
            <el-button type="danger" size="mini" :loading="btnLoading" @click="operate(scope.row, 'operate')" plain>{{
              scope.row.enable === 2 ? '禁用' : scope.row.enable === 1 ? '启用' : ''
            }}</el-button>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>
<script>
import './index.scss'
export default {
  name: 'userList',
  metaInfo() {
    return {
      /* titleTemplate: '%s - 用户列表',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'user-list-keyword' },
        { vmid: 'description', name: 'description', content: 'user-list-description' }
      ] */
    }
  },
  components: {},
  data() {
    return {
      sexData: [
        { label: '保密', value: 0 },
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      listQuery: {
        nickname: '',
        sex: '',
        regDate: [],
        pageNo: 1,
        pageSize: 10
      },
      listLoading: false,
      listTotal: 0,
      list: []
    }
  },
  computed: {
    queryConfig: function() {
      return [
        { type: 'input', label: '昵称', prop: 'nickname' },
        { type: 'select', label: '性别', prop: 'sex', data: this.sexData },
        { type: 'daterange', label: '注册日期', prop: 'regDate' }
      ]
    }
  },
  methods: {
    async fetchData(listQuery) {
      if (listQuery) {
        this.listQuery = { ...listQuery }
      }
      this.listLoading = true
      // const res = await userList(this.listQuery, 'list')
      // if (res.success && res.data) {
      //   this.list = res.data.records
      //   this.listTotal = res.data.total
      // }
      this.listLoading = false
    }
  }
}
</script>

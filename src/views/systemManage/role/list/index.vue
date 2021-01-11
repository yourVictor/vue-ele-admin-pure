<template>
  <div class="role-list-container">
    <list-page :queryConfig="queryConfig" :listQuery="listQuery" :list="list" :listLoading="listLoading" :listTotal="listTotal" @fetchData="fetchData">
      <div slot="btns" class="btns-line">
        <el-button type="success" size="small" plain @click="$router.push({ name: 'roleAdd' })">新建角色</el-button>
      </div>
      <template slot="table-column">
        <el-table-column align="center" prop="key" label="key" min-width="100"></el-table-column>
        <el-table-column align="center" prop="roleName" label="角色名称" min-width="100"></el-table-column>
        <el-table-column align="center" prop="mobile" label="角色描述" min-width="100"></el-table-column>
        <el-table-column align="center" prop="" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="$router.push({ name: 'roleEdit', params: { id: scope.row.id } })" plain>编辑</el-button>
            <el-button type="danger" size="mini" @click="operate(scope.row, 'update')" plain>删除</el-button>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>
<script>
import './index.scss'
export default {
  name: 'RoleList',
  metaInfo() {
    return {
      /* titleTemplate: '%s - 角色列表',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'user-list-keyword' },
        { vmid: 'description', name: 'description', content: 'user-list-description' }
      ] */
    }
  },
  components: {},
  data() {
    return {
      listQuery: {
        roleName: '',
        pageNo: 1,
        pageSize: 10
      },
      listLoading: false,
      listTotal: 0,
      list: [{ key: 'hello' }]
    }
  },
  computed: {
    queryConfig: function() {
      return [{ type: 'input', label: '角色名称', prop: 'roleName' }]
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

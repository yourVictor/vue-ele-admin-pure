<template>
  <div class="list-page-container">
    <slot name="btns"></slot>
    <search-form v-if="queryConfig && queryConfig.length" :queryConfig="queryConfig" :spanConfig="spanConfig" :listQuery="listQuery" :search="search" :label-width="labelWidth"></search-form>
    <slot name="tabBefore"></slot>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一首歌的时间" @selection-change="handleSelectionChange" border stripe>
      <el-table-column type="selection" width="55" v-if="selectColumn"></el-table-column>
      <el-table-column v-if="indexColumn" align="center" type="index" label="序号" width="80" :index="index => indexMethod(index, listQuery)"></el-table-column>
      <slot name="table-column"></slot>
    </el-table>
    <el-pagination
      v-if="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery[pageKey]"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="listQuery[pageSizeKey]"
      :total="listTotal"
      layout="total, sizes, prev, pager, next, jumper"
      background
    >
    </el-pagination>
    <template v-if="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisibleSub" :modal-append-to-body="false">
        <el-form ref="form" :model="formData" label-width="130px" :disabled="disabled">
          <slot name="form-items"></slot>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">{{ disabled ? '关 闭' : '取 消' }}</el-button>
          <el-button v-if="!disabled" type="primary" :loading="btnLoading" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import SearchForm from '@/components/searchForm/v1/index'
import './index.scss'
export default {
  name: 'listPage',
  components: {
    SearchForm
  },
  props: {
    queryConfig: { type: Array, default: () => [] },
    spanConfig: { type: Object, default: () => ({ sm: 24, md: 12, lg: 8, xl: 6 }) },
    listQuery: { type: Object, default: () => ({}) },
    list: { type: Array, default: () => [] },
    indexColumn: { type: Boolean, default: true },
    listLoading: { type: Boolean, default: false },
    listTotal: { type: Number, default: 0 },
    pagination: { type: Boolean, default: true }, // 是否分页
    pageKey: { type: String, default: 'pageNo' },
    pageSizeKey: { type: String, default: 'pageSize' },
    dialog: { type: Boolean, default: false },
    dialogTitle: { type: String, default: '' },
    dialogFormVisible: { type: Boolean, default: false },
    btnLoading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    refName: { type: String, default: 'form' },
    formData: { type: Object, default: () => ({}) },
    labelWidth: { type: Number, default: 96 },
    selectColumn: { type: Boolean, default: false }
  },
  computed: {
    dialogFormVisibleSub: {
      get() {
        return this.dialogFormVisible
      },
      set() {
        this.handleClose()
      }
    }
  },
  methods: {
    search() {
      const listQuery = { ...this.listQuery }
      listQuery[this.pageKey] = 1
      this.$emit('fetchData', listQuery)
    },
    handleSizeChange(val) {
      const listQuery = { ...this.listQuery }
      listQuery[this.pageKey] = 1
      listQuery[this.pageSizeKey] = val
      this.$emit('fetchData', listQuery)
    },
    handleCurrentChange(val) {
      const listQuery = { ...this.listQuery }
      listQuery[this.pageSizeKey] = val
      this.$emit('fetchData', listQuery)
    },
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
    save() {
      this.$refs[this.refName].validate(async valid => {
        if (!valid) {
          return false
        }
        this.$emit('save')
      })
    },
    handleClose() {
      this.$emit('dialogClose')
    }
  }
}
</script>

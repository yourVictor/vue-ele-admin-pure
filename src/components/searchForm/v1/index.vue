<template>
  <el-form ref="searchForm" class="search-form" :model="listQuery" label-position="right" :label-width="`${labelWidth}px`">
    <!-- input holder start : 防止只有一个输入框时，按enter键刷新界面 -->
    <el-input v-show="false" />
    <!-- input holder end -->
    <el-row :gutter="30">
      <el-col v-for="(item, index) in queryConfig" :sm="spanConfig.sm" :md="spanConfig.md" :lg="spanConfig.lg" :xl="spanConfig.xl" :key="index">
        <el-form-item v-if="item.type === 'input'" :label="`${item.label}：`" :prop="item.prop">
          <el-input v-model="listQuery[item.prop]" :placeholder="item.label" :maxlength="item.maxlength || 25" size="medium" clearable @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item v-else-if="item.type === 'select'" :label="`${item.label}：`" :prop="item.prop">
          <el-select v-model="listQuery[item.prop]" placeholder="请选择" size="medium" filterable clearable>
            <el-option v-for="optionItem in item.data" :key="optionItem.value" :label="optionItem.label" :value="optionItem.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="item.type === 'daterange'" :label="`${item.label}：`" :prop="item.prop">
          <el-date-picker
            v-model="listQuery[item.prop]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            size="medium"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="item.type === 'datetime'" :label="`${item.label}：`" :prop="item.prop">
          <el-date-picker v-model="listQuery[item.prop]" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="item.label" size="medium"> </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="" class="btn-item">
      <el-button type="primary" size="mini" icon="el-icon-search" plain @click="search">搜索</el-button>
      <span class="btn-reset" @click="resetForm('searchForm')">清空搜索条件</span>
    </el-form-item>
  </el-form>
</template>
<script>
import './index.scss'
export default {
  name: 'searchForm',
  props: {
    labelWidth: {
      type: Number,
      default: 96
    },
    spanConfig: {
      type: Object,
      default() {
        return { sm: 24, md: 12, lg: 8, xl: 6 }
      }
    },
    listQuery: {
      type: Object,
      required: true
    },
    queryConfig: {
      type: Array,
      required: true
    },
    search: {
      type: Function,
      required: true
    }
  },
  methods: {
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.search()
      })
    }
  }
}
</script>

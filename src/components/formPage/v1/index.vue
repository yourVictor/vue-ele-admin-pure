<template>
  <div class="form-page-container">
    <el-form :ref="refName" :model="formData" :label-width="labelWidth" :disabled="disabled">
      <slot></slot>
      <el-form-item v-if="!disabled" label="">
        <slot name="btns"></slot>
        <el-button type="success" size="medium" :btnLoading="btnLoading" @click="save" plain>保存</el-button>
        <el-button v-if="showCancel" type="default" size="medium" plain @click="handleBack">取消</el-button>
      </el-form-item>
    </el-form>
    <div v-if="disabled && showCancel" class="btn-line">
      <el-button type="default" size="medium" plain @click="handleBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import './index.scss'
export default {
  name: 'formPage',
  props: {
    refName: {
      type: String,
      default: 'form'
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: '110px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnLoading: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    save() {
      this.$refs[this.refName].validate(async valid => {
        if (!valid) {
          return false
        }
        this.$emit('save')
      })
    },
    handleBack() {
      this.$emit('back')
    }
  }
}
</script>

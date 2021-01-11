<template>
  <div class="role-detail-container">
    <form-page :form-data="formData" :btn-loading="btnLoading" :disabled="disabled" @save="save" @back="back">
      <template slot="formContent">
        <el-form-item label="角色key：" prop="key" :rules="commonRule.noNullRule">
          <el-input v-model="formData.key" placeholder="角色key（英文字母）" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称：" prop="roleName" :rules="commonRule.noNullRule">
          <el-input v-model="formData.roleName" placeholder="角色名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" prop="roleDesc">
          <el-input v-model="formData.roleDesc" type="textarea" placeholder="角色描述" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分配资源：" prop="resourceList" :rules="commonRule.noNullRule">
          <!-- <resource :checked.sync="formData.resourceList" @change="changeResource" /> -->
        </el-form-item>
      </template>
    </form-page>
  </div>
</template>
<script>
// import resource from './resource'
import './index.scss'
export default {
  name: 'roleDetail',
  components: {
    // resource
  },
  metaInfo() {
    return {
      /* titleTemplate: '%s - 角色新建/编辑',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'member-detail-keyword' },
        { vmid: 'description', name: 'description', content: 'member-detail-description' }
      ] */
    }
  },
  data() {
    return {
      formData: {
        key: '',
        roleName: '',
        roleDesc: '',
        resourceList: []
      },
      btnLoading: false,
      disabled: false
    }
  },
  methods: {
    changeResource(resource) {
      this.formData.resourceList = resource
    },
    back() {},
    save() {}
  }
}
</script>

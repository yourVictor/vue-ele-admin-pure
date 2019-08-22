<template>
  <div class="login-container" :style="`background: url(${pageBgImg}) no-repeat;background-size: cover;`">
    <el-card class="animated zoomInRight login-form">
      <div class="form-title">{{appName}}</div>
      <el-form :model="form" :rules="formRules" ref="form" label-position="left">
        <el-form-item prop="username">
          <el-input name="username" type="text" v-model="form.username" autoComplete="off" :placeholder="$t('pages.login.username')" prefix-icon="el-icon-extend-username" clearable/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :type="passwordType" v-model="form.password" autocomplete="off" :placeholder="$t('pages.login.password')" prefix-icon="el-icon-extend-password" @keyup.enter.native="onLogin">
            <i v-if="passwordType==='password'" slot="suffix" class="el-input__icon el-icon-extend-eye_close" @click="changePasswordType"></i>
            <i v-else slot="suffix" class="el-input__icon el-icon-extend-eye" @click="changePasswordType"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onLogin" style="width: 100%">{{$t('buttons.login')}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import config, { debounce } from '@/utils/config'
import './index.scss'
export default {
  name: 'login',
  metaInfo () {
    return {
      titleTemplate: '%s - 登录',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'login-keyword' },
        { vmid: 'description', name: 'description', content: 'login-description' }
      ]
    }
  },
  data () {
    return {
      pageBgImg: `${process.env.BASE_URL}img/bg/page_login.jpg`,
      appName: config.appName,
      passwordType: 'password',
      loading: false,
      form: {
        username: 'admin',
        password: 'admin'
      },
      formRules: {
        username: [{ required: true, message: this.$t('pages.login.usernameError'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('pages.login.passwordError'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    changePasswordType () {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    onLogin: debounce(function () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        this.loading = true
        setTimeout(() => {
          this.$store.dispatch('Login', this.form)
            .then(() => {
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        }, 100)
      })
    }, 1500, true)
  }
}
</script>

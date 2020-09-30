<template>
  <el-header :class="{ 'header-wrapper': true, 'header-wrapper-margin': !sidebar.hidden }">
    <div class="btn" v-if="!sidebar.hidden" @click="toggleCollapse">
      <i v-if="sidebar.isCollapse" class="el-icon-extend-menu_unfold"></i>
      <i v-if="!sidebar.isCollapse" class="el-icon-extend-menu_fold"></i>
    </div>
    <el-popover v-else v-model="menuPop" width="200" popper-class="el-popover-header-bar" trigger="click">
      <Menu :routes="routes" :sidebar="sidebar" :changeMenuPop="changeMenuPop"></Menu>
      <div class="btn" slot="reference">
        <i class="el-icon-extend-menu"></i>
      </div>
    </el-popover>
    <div class="sub-item">
      <Breadcrumb v-if="!sidebar.hidden"></Breadcrumb>
    </div>
    <!--<div class="btn">
            <el-badge :value="5" :max="99" class="item">
                <i class="el-icon-extend-message"></i>
            </el-badge>
        </div>-->
    <el-dropdown @command="handleLanguageCommand" placement="bottom">
      <div class="btn language-btn">
        <svg class="icon" aria-hidden="true">
          <use v-if="$i18n.locale === 'en'" xlink:href="#el-icon-extend-language_en"></use>
          <use v-else xlink:href="#el-icon-extend-language_zh"></use>
        </svg>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="$i18n.locale !== 'en'">简体中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="$i18n.locale === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown :class="{ 'account-item': !sidebar.hidden }" @command="handleCommand" placement="bottom">
      <div class="btn account-btn">
        <i class="el-icon-extend-account"></i>
        <div>{{ account.username }}</div>
        <i class="el-icon-arrow-down" style="font-size: 10px"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">{{ $t('buttons.logout') }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>
<script>
import Menu from '../menu/index'
import Breadcrumb from '../breadcrumb/index'
import './index.scss'
export default {
  name: 'headerBar',
  props: {
    account: {
      type: Object
    },
    sidebar: {
      type: Object
    },
    routes: {
      type: Array
    },
    toggleCollapse: {
      type: Function
    }
  },
  components: {
    Menu,
    Breadcrumb
  },
  data() {
    return {
      menuPop: false
    }
  },
  methods: {
    changeMenuPop() {
      this.menuPop = false
    },
    handleLanguageCommand(command) {
      localStorage.setItem('locale', command)
      this.$i18n.locale = localStorage.getItem('locale')
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('Logout')
        this.$router.replace({ name: 'login' })
        setTimeout(() => {
          location.reload()
        }, 0)
      }
    }
  }
}
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import config from '@/utils/config'
export default {
  name: 'App',
  metaInfo: {
    title: config.appName,
    titleTemplate: '%s',
    meta: [
      { vmid: 'keyword', name: 'keyword', content: 'default-keyword' },
      { vmid: 'description', name: 'description', content: 'default-description' }
    ]
  }
}
</script>

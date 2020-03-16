<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: process.env.VUE_APP_PROJECT_NAME,
    titleTemplate: '%s',
    meta: [
      { vmid: 'keyword', name: 'keyword', content: 'default-keyword' },
      { vmid: 'description', name: 'description', content: 'default-description' }
    ]
  }
}
</script>

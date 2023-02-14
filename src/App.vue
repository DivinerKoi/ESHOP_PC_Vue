<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {
// 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('messageStore', JSON.stringify(this.$store.state))
    })
// 在页面加载时读取localStorage里的状态信息
    localStorage.getItem('messageStore') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem('messageStore'))))
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

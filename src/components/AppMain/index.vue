<template>
  <section class="app-main" :style="styleObj">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    styleObj() {
      return {
        width: this.$store.getters['asideRouters/isCollapse']
          ? 'calc(100% - 54px)'
          : 'calc(100% - 230px)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  background-color: #1d293b;
}
</style>

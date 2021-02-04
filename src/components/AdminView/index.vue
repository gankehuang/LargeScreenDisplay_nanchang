<template>
  <div class="page-box">
    <Sidebar
      class="sidebar-container"
      :class="[isCollapse ? 'hideSidebar' : 'openSidebar']"
    />
    <AppMain />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import AppMain from '@/components/AppMain'
export default {
  components: {
    Sidebar,
    AppMain
  },
  data () {
    return {}
  },
  computed: {
    isCollapse () {
      return this.$store.getters['asideRouters/isCollapse']
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  padding-top: 70px;
  display: flex;
  background: #172638;
}
</style>

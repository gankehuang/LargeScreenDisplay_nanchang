<template>
  <el-scrollbar style="width:100%;height:100%;">
    <hamburger
      :is-active="true"
      :style="styleObj1"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <el-menu
      mode="vertical"
      :style="styleObj1"
      :default-active="activeMenu"
      background-color="#304156"
      text-color="#bfcbd9"
      :unique-opened="true"
      active-text-color="#409eff"
      :collapse-transition="false"
      :collapse="isCollapse"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Hamburger },
  data () {
    return {}
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    routes () {
      return this.$store.state.asideRouters.adminRouters
    },
    isCollapse () {
      return this.$store.getters['asideRouters/isCollapse']
    },
    styleObj1 () {
      return {
        width: this.$store.getters['asideRouters/isCollapse'] ? '54px' : '230px'
      }
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.commit('asideRouters/SET_ASIDESTATUS', !this.isCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}

.hamburger-container {
  text-align: center;
  background: rgb(48, 65, 86);
}
</style>

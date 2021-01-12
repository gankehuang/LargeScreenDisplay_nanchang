<template>
  <div class="releaseManagement">
    <Tabs :tab-list="tabList" width="500px" :cur-index="1" />
    <AdminView />
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import AdminView from '@/components/AdminView'
import commonMixin from '../commonMixin'
export default {
  mixins: [commonMixin],
  components: {
    AdminView
  }
}
</script>
<style lang="scss" scoped>
.releaseManagement {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 60px 15px 5px 15px;
  background-color: #1d293b;
  background-size: 100% 100%;
}
</style>

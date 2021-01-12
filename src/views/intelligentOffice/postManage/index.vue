<template>
  <div class="materialSubmit">
    <Tabs :tab-list="tabList" width="500px" :cur-index="3" />
    <AdminView />
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import commonMixin from '../commonMixin'
import AdminView from '@/components/AdminView'
export default {
  mixins: [commonMixin],
  components: {
    AdminView
  }
}
</script>
<style lang="scss" scoped>
.materialSubmit {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 60px 15px 5px 15px;
  background-color: #1d293b;
  background-size: 100% 100%;
}
</style>

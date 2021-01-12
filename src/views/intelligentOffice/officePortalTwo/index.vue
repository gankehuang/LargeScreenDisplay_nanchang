<template>
  <div class="page-container">
    <Tabs :tab-list="tabList" width="500px" :cur-index="0" class="tabs" />
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script>
import commonMixin from '../commonMixin'
import Left from './Left'
import Right from './Right'
import Center from './Center'
export default {
  components: {
    Left,
    Right,
    Center
  },
  mixins: [commonMixin]
}
</script>

<style lang="scss" scoped>
.page-container {
  padding-top: 130px;
  background: url("~@/assets/image/intelligentOffice/组 81 (1).png") center
    center / 100% 100% no-repeat;
}
</style>

<template>
  <div class="page-box">
    <Tabs :tab-list="tabList" width="600px" :cur-index="2" />
  </div>
</template>

<script>
import commonMixin from '../commonMixin'
export default {
  mixins: [commonMixin],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  background: url("~@/assets/image/conflictMediation/page-bg.png") center center /
    100% 100% no-repeat;
}
</style>

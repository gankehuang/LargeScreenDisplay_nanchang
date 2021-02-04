<template>
  <div
    :key="i"
    class="earlyWarningDisposal"
  >
    <Tabs
      :tab-list="tabList"
      width="500px"
      :cur-index="2"
    />
    <div class="con-top">
      <eventNum />
      <eventDistrict />
      <eventType />
    </div>
    <div class="con-bottom">
      <bottomForm />
    </div>
  </div>
</template>
<script>
import eventNum from './top/eventNum'
import eventType from './top/eventType'
import eventDistrict from './top/eventDistrict'
import bottomForm from './bottom/bottomForm'
import commonMixin from '../commonMixin'
export default {
  components: {
    eventNum,
    eventType,
    eventDistrict,
    bottomForm
  },
  mixins: [commonMixin],
  data () {
    return {
      i: 0
    }
  },
  mounted () {
    this.$EventBus.$on('updateCommend', i => {
      this.i++
    })
  },
  beforeDestory () {
    this.$EventBus.$off('updateCommend')
  }
}
</script>
<style lang="scss" scoped>
.earlyWarningDisposal {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 140px 15px 5px 15px;
  background-color: #1d293b;
  background: url("~@/assets/image/intelligentService/page-bgm.png") no-repeat;
  background-size: 100% 100%;
}
.con-top {
  width: 100%;
  height: 275px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.con-bottom {
  width: 100%;
  height: calc(100% - 298px);
  display: flex;
  background: rgba(8, 28, 63, 0.47);
  border: 1px solid #0f4f8f;
}
</style>

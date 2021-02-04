<!-- 预警处置 页面 入口 -->
<template>
  <div class="earlyWarningDisposal">
    <Tabs
      :tab-list="tabList"
      width="500px"
      :cur-index="1"
    />
    <div class="con-top">
      <eventNum />
      <eventType />
      <eventDistrict />
    </div>
    <div class="con-bottom">
      <BottomForm @busData="busData" />
    </div>
  </div>
</template>
<script>
import eventNum from './top/eventNum'
import eventType from './top/eventType'
import eventDistrict from './top/eventDistrict'
import BottomForm from './bottom/'
import commonMixin from '../commonMixin'
export default {
  components: {
    eventNum,
    eventType,
    eventDistrict,
    BottomForm
  },
  provide () {
    return {
      injectData: this
    }
  },
  mixins: [commonMixin],
  data () {
    return {
      eventData: ''
    }
  },
  methods: {
    busData (data) {
      this.eventData = data
    }
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
.con-center {
  width: 100%;
  height: 123px;
  display: flex;
  background: rgba(8, 28, 63, 0.47);
  border: 1px solid #0f4f8f;
  margin-bottom: 15px;
}
.con-bottom {
  width: 100%;
  height: 498px;
  display: flex;
  background: rgba(8, 28, 63, 0.47);
  border: 1px solid #0f4f8f;
}
</style>

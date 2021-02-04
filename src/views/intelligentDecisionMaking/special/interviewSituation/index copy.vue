<template>
  <div class="page-container">
    <Tabs
      :tab-list="tabList"
      width="300px"
      :cur-index="2"
    />
    <centerMap @mapEvent="mapEvent" />
    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <leftInfo />
        <left2Info />
      </div>
    </transition>
    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <right1Info />
        <right2Info />
        <right3Info />
      </div>
    </transition>
    <div class="center">
      <centerInfo />
    </div>
  </div>
</template>
<script>
import leftInfo from './PageLeft/left1.vue'
import left2Info from './PageLeft/left2.vue'
import right1Info from './PageRight/right1.vue'
import right2Info from './PageRight/right2.vue'
import right3Info from './PageRight/right3.vue'
import centerInfo from './PageCenter/centerInfo.vue'
import centerMap from './centerMap'
import commonMixin from '../../commonMixin'
export default {
  components: {
    leftInfo,
    left2Info,
    right1Info,
    right2Info,
    right3Info,
    centerInfo,
    centerMap
  },
  mixins: [commonMixin],
  data () {
    return {
      countyList: null,
      isInfo: true
    }
  },
  methods: {
    mapEvent (data) {
      this.isInfo = false
      this.$nextTick(() => {
        this.isInfo = true
        this.countyList = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/interviewSituation/visit-bg.png") no-repeat
    center;
  background-size: 100% 100%;
  position: relative;
  .center {
    position: absolute;
    bottom: 15px;
    left: 50%;
    margin-left: -510px;
  }
}
</style>

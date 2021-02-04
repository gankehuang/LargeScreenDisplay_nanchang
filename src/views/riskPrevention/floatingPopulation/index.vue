<template>
  <div class="page-container">
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="1"
    />

    <TopStatistics />

    <ToggleView @updateView="updateView" />

    <PointView v-if="isShowPointView" />
    <MapView v-else />

    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <Left />
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <Right />
    </transition>
  </div>
</template>

<script>
import Left from './Left'
import Right from './Right'
import TopStatistics from './TopStatistics'
import PointView from './PointView'
import ToggleView from './ToggleView'
import MapView from './MapView'
import commonMixin from '../commonMixin'

export default {
  components: {
    Left,
    Right,
    TopStatistics,
    PointView,
    ToggleView,
    MapView
  },
  mixins: [commonMixin],
  data () {
    return {
      isShowPointView: false
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    updateView (isShowPointView) {
      this.isShowPointView = isShowPointView
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/floatingPopulation/page-bg.png") center
    center / 100% 100% no-repeat;
}
</style>

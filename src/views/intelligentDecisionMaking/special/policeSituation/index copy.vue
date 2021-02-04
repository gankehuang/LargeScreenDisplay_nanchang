<template>
  <div class="page-container">
    <Tabs
      :tab-list="tabList"
      width="300px"
      :cur-index="1"
    />
    <Pageleft />
    <centerMap />
    <PageRight />
    <PageCenter />
  </div>
</template>

<script>
import centerMap from './centerMap'
import Pageleft from './PageLeft'
import PageRight from './PageRight'
import PageCenter from './PageCenter'
import commonMixin from '../../commonMixin'
export default {
  components: {
    Pageleft,
    PageRight,
    PageCenter,
    centerMap
  },
  mixins: [commonMixin],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.eventMarker {
  padding-top: 10px;
  width: 150px;
  height: 85px;
  background: url("~@/assets/image/rentalHousing/组 63.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: center;
  color: #58a7fe;
  .position-icon {
    display: inline-block;
    margin-right: 6px;
  }
  .nums {
    color: #f2bd1b;
  }
}
</style>

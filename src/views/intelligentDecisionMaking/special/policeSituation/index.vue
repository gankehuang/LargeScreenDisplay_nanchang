<template>
  <Container>
    <Tabs
      :tab-list="tabList"
      width="300px"
      :cur-index="1"
    />
    <Map />
    <template v-slot:pageLeft>
      <PoliceInformationNum />
      <PoliceInformationNumDistribution />
    </template>
    <template v-slot:pageRight>
      <PoliceInformationReport />
      <PoliceInformationProblem />
      <PoliceInformationType />
    </template>
    <div class="center">
      <PageCenter />
    </div>
  </Container>
</template>

<script>
import Map from './Map'
import PoliceInformationNum from './Left/PoliceInformationNum'
import PoliceInformationNumDistribution from './Left/PoliceInformationNumDistribution'
import PoliceInformationReport from './Right/PoliceInformationReport'
import PoliceInformationProblem from './Right/PoliceInformationProblem'
import PoliceInformationType from './Right/PoliceInformationType'
import PageCenter from './PageCenter'
import commonMixin from '../../commonMixin'
export default {
  components: {
    PoliceInformationNum,
    PoliceInformationNumDistribution,
    PoliceInformationReport,
    PoliceInformationProblem,
    PoliceInformationType,
    PageCenter,
    Map
  },
  mixins: [commonMixin],
  data () {
    return {
      pdfModalVisible: false
    }
  }
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
.center {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 1017px;
}
</style>

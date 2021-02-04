<template>
  <Container>
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="1"
    />
    <Map />
    <template v-slot:pageLeft>
      <NumberOfHouses />
      <HouseType />
      <HouseNumChange />
    </template>
    <template v-slot:pageRight>
      <HouseDistribution />
      <RealTimeWarning />
    </template>
  </Container>
</template>
<script>
import commonMixin from '../commonMixin'
import Map from './Map'
import NumberOfHouses from './left/NumberOfHouses'
import HouseType from './left/HouseType'
import HouseNumChange from './left/HouseNumChange'
import HouseDistribution from './right/HouseDistribution'
import RealTimeWarning from './right/RealTimeWarning'
export default {
  components: {
    Map,
    NumberOfHouses,
    HouseType,
    HouseNumChange,
    HouseDistribution,
    RealTimeWarning
  },
  mixins: [commonMixin],
  data () {
    return {

    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>

</style>

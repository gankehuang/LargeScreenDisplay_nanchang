<template>
  <Container>
    <Tabs
      :tab-list="tabList"
      width="300px"
      :cur-index="0"
    />
    <Map />
    <template v-slot:pageLeft>
      <SafetyIndex />
      <IndexChangeTrend />
    </template>
    <template v-slot:pageRight>
      <ComprehensiveRanking />
    </template>
  </Container>
</template>

<script>
import SafetyIndex from './left/SafetyIndex'
import IndexChangeTrend from './left/IndexChangeTrend'
import ComprehensiveRanking from './right/ComprehensiveRanking'
import Map from './Map'
import commonMixin from '../commonMixin'
export default {
  components: {
    SafetyIndex,
    IndexChangeTrend,
    ComprehensiveRanking,
    Map
  },
  mixins: [commonMixin],
  data () {
    return {
      totalScore: 90
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

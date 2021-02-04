<template>
  <Container>
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="1"
    />
    <Map />
    <template v-slot:pageLeft>
      <EventOverview />
      <EventDistribution />
    </template>
    <template v-slot:pageRight>
      <EventChain />
      <EarlyWarningList />
    </template>
  </Container>
</template>
<script>
import Map from './map'
import EventOverview from './left/EventOverview'
import EventDistribution from './left/EventDistribution'
import EventChain from './right/EventChain'
import EarlyWarningList from './right/EarlyWarningList'
import commonMixin from '../commonMixin'
export default {
  components: {
    Map,
    EventOverview,
    EventDistribution,
    EventChain,
    EarlyWarningList
  },
  mixins: [commonMixin],
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>

</style>

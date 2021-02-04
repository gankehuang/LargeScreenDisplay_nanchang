<template>
  <Container>
    <Tabs
      :tab-list="tabList"
      width="300px"
      :cur-index="2"
    />
    <Map @mapEvent="mapEvent" />
    <template v-slot:pageLeft>
      <PersonnelIncidentsNum />
      <MonthlyPetitionRanking />
    </template>
    <template v-slot:pageRight>
      <InterviewAnalysisReport />
      <LettersProminentField />
      <PetitionChannels />
    </template>
    <div class="center">
      <centerInfo />
    </div>
  </Container>
</template>
<script>
import PersonnelIncidentsNum from './Left/PersonnelIncidentsNum'
import MonthlyPetitionRanking from './Left/MonthlyPetitionRanking'
import InterviewAnalysisReport from './Right/InterviewAnalysisReport'
import LettersProminentField from './Right/LettersProminentField'
import PetitionChannels from './Right/PetitionChannels'
import centerInfo from './PageCenter/centerInfo'
import Map from './Map'
import commonMixin from '../../commonMixin'
export default {
  components: {
    PersonnelIncidentsNum,
    MonthlyPetitionRanking,
    InterviewAnalysisReport,
    LettersProminentField,
    PetitionChannels,
    centerInfo,
    Map
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
    transform: translateX(-50%);
    width: 1017px;
  }
}
</style>

<template>
  <div class="officePortal">
    <Tabs
      :tab-list="tabList"
      width="500px"
      :cur-index="0"
    />
    <div class="office-con">
      <div class="office-left">
        <quickEntry />
        <systemConstruction />
        <workDynamics />
      </div>
      <div class="office-middle">
        <untreated />
        <notice />
      </div>
      <div class="office-right">
        <documentProcessing />
        <upcoming />
        <myEmail />
      </div>
    </div>
  </div>
</template>
<script>
import commonMixin from '../commonMixin'
import quickEntry from './quickEntry'
import systemConstruction from './systemConstruction'
import workDynamics from './workDynamics'
import documentProcessing from './documentProcessing'
import upcoming from './upcoming'
import myEmail from './myEmail'
import untreated from './untreated'
import notice from './notice'
export default {
  components: {
    quickEntry,
    systemConstruction,
    workDynamics,
    documentProcessing,
    upcoming,
    myEmail,
    untreated,
    notice
  },
  mixins: [commonMixin]
}
</script>
<style lang="scss" scoped>
.officePortal {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 140px 15px 5px 15px;
  background-color: #1d293b;
  background: url("~@/assets/image/intelligentOffice/lea-spe-bg.png") center
    center / 100% 100% no-repeat;
  background-size: 100% 100%;
  .office-con {
    width: 100%;
    height: 100%;
    display: flex;
    .office-left,
    .office-right {
      width: 587px;
      height: 100%;
    }
    .office-middle {
      width: 667px;
      height: 100%;
      margin: 0 20px;
    }
  }
}
</style>

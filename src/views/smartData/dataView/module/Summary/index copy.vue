<template>
  <div class="summary-container">
    <div v-if="tabName !== '进贤县'">
      <TotalData :total-data="totalData" />
      <BasicData />
      <Realhousing />
      <div style="float:left">
        <PubilcVideo />
        <GovOrganization />
      </div>
      <div style="float:right">
        <NetMix />
      </div>
    </div>
    <div v-else>
      <TotalDataCopy :total-data="totalData" />
      <BasicDataCopy />
      <RealhousingCopy />
      <div style="float:left">
        <PubilcVideoCopy />
        <GovOrganizationCopy />
      </div>
      <div style="float:right">
        <NetMixCopy />
      </div>
    </div>
  </div>
</template>

<script>
import TotalData from './TotalData'
import BasicData from './BasicData'
import Realhousing from './Realhousing'
import PubilcVideo from './PubilcVideo'
import GovOrganization from './GovOrganization'
import NetMix from './NetMix'
import TotalDataCopy from './copy/TotalDataCopy'
import BasicDataCopy from './copy/BasicDataCopy'
import RealhousingCopy from './copy/RealhousingCopy'
import PubilcVideoCopy from './copy/PubilcVideoCopy'
import GovOrganizationCopy from './copy/GovOrganizationCopy'
import NetMixCopy from './copy/NetMixCopy'
export default {
  components: {
    TotalData,
    BasicData,
    Realhousing,
    PubilcVideo,
    GovOrganization,
    NetMix,
    TotalDataCopy,
    BasicDataCopy,
    RealhousingCopy,
    PubilcVideoCopy,
    GovOrganizationCopy,
    NetMixCopy
  },
  props: {
    totalData: {
      type: Object,
      value: () => {}
    },
    tabName: {
      type: String,
      value: ''
    }
  },
  watch: {
    tabName (val) {
      // debugger
      this.tabName = val
    }
  }
}
</script>

<style lang="scss" scoped>
.summary-container {
  width: 100%;
  height: 100%;
}
</style>

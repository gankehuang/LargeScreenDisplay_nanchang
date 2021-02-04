<template>
  <div class="page-right">
    <ControlSituation />
    <EarlyWarningTrend />
    <DynamicEarlyWarning />
  </div>
</template>

<script>
import ControlSituation from './ControlSituation'
import EarlyWarningTrend from './EarlyWarningTrend'
import DynamicEarlyWarning from './DynamicEarlyWarning'
export default {
  components: {
    ControlSituation,
    EarlyWarningTrend,
    DynamicEarlyWarning
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

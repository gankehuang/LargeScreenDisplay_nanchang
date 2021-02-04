<template>
  <div class="page-right">
    <EmploymentSituation />
    <EarlyWarningTrend />
    <DynamicEarlyWarning />
  </div>
</template>

<script>
import EmploymentSituation from './EmploymentSituation'
import EarlyWarningTrend from './EarlyWarningTrend'
import DynamicEarlyWarning from './DynamicEarlyWarning'
export default {
  components: {
    EmploymentSituation,
    EarlyWarningTrend,
    DynamicEarlyWarning
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="page-right">
    <EarlyWarningTrend />
    <DynamicEarlyWarning />
  </div>
</template>

<script>
import EarlyWarningTrend from './EarlyWarningTrend'
import DynamicEarlyWarning from './DynamicEarlyWarning'
export default {
  components: {
    EarlyWarningTrend,
    DynamicEarlyWarning
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="page-left">
    <CorrectionStatistics />
    <RegionalDistribution />
  </div>
</template>

<script>
import CorrectionStatistics from './CorrectionStatistics'
import RegionalDistribution from './RegionalDistribution'
export default {
  components: {
    CorrectionStatistics,
    RegionalDistribution
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

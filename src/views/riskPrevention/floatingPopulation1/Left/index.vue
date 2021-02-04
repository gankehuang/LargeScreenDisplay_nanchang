<template>
  <div class="page-left">
    <DistrictSpread />
    <RegionalDistribution />
  </div>
</template>

<script>
import DistrictSpread from './DistrictSpread'
import RegionalDistribution from './RegionalDistribution'
export default {
  components: {
    DistrictSpread,
    RegionalDistribution
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

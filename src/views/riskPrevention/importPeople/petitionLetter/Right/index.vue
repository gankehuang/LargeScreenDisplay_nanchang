<template>
  <div class="page-right">
    <SpreadInfo />
    <EarlyWarningList />
  </div>
</template>

<script>
import SpreadInfo from './SpreadInfo'
import EarlyWarningList from './EarlyWarningList'
export default {
  components: {
    SpreadInfo,
    EarlyWarningList
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

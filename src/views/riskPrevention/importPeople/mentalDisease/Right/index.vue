<template>
  <div class="page-right">
    <VisitSituation />
    <EarlyWarningList />
  </div>
</template>

<script>
import VisitSituation from './VisitSituation'
import EarlyWarningList from './EarlyWarningList'
export default {
  components: {
    VisitSituation,
    EarlyWarningList
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

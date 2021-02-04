<template>
  <div class="ground-container">
    <BuildModal :visible.sync="buildModalVisible" />
    <div class="column">
      <Realhousing />
      <KeyPlace />
    </div>
    <div class="column">
      <BusinessPlace />
      <PublicSafety />
    </div>
  </div>
</template>

<script>
import Realhousing from './Realhousing'
import KeyPlace from './KeyPlace'
import BusinessPlace from './BusinessPlace'
import PublicSafety from './PublicSafety'
import BuildModal from '../BuildModal/index'
export default {
  components: {
    Realhousing,
    BusinessPlace,
    KeyPlace,
    PublicSafety,
    BuildModal
  },
  data () {
    return {
      buildModalVisible: false
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:buildModalVisible')
  },
  mounted () {
    this.$EventBus.$on(
      'update:buildModalVisible',
      visible => (this.buildModalVisible = visible)
    )
  }
}
</script>

<style lang="scss" scoped>
.ground-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.column {
  flex-basis: 98.5%;
  display: flex;
  justify-content: space-between;
}
</style>

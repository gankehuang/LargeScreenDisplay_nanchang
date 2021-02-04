<template>
  <div class="population-container">
    <div class="column">
      <Overview />
      <Structure />
    </div>
    <div class="column">
      <ChangeStatistics />
      <ImportantPerson />
    </div>
    <PopModal :visible.sync="popModalVisible" />
  </div>
</template>

<script>
import Overview from './Overview'
import ChangeStatistics from './ChangeStatistics'
import Structure from './Structure'
import ImportantPerson from './ImportantPerson'
import PopModal from '../PopModal/index'
export default {
  components: {
    Overview,
    ChangeStatistics,
    Structure,
    ImportantPerson,
    PopModal
  },
  data () {
    return {
      popModalVisible: false
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:popModalVisible')
  },
  mounted () {
    this.$EventBus.$on(
      'update:popModalVisible',
      visible => (this.popModalVisible = visible)
    )
  }
}
</script>

<style lang="scss" scoped>
.population-container {
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

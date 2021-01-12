<template>
  <div class="network-container">
    <div class="column">
      <StatisticalData />
      <GridManagement />
    </div>
    <div class="column">
      <GridConnected />
    </div>
  </div>
</template>

<script>
import StatisticalData from './StatisticalData'
import GridManagement from './GridManagement'
import GridConnected from './GridConnected'
export default {
  components: {
    StatisticalData,
    GridManagement,
    GridConnected
  }
}
</script>

<style lang="scss" scoped>
.network-container {
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

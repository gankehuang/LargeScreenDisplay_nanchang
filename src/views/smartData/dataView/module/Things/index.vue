<template>
  <div class="things-container">
    <div class="column">
      <Overview />
      <Handle />
    </div>
    <div class="column">
      <Origin />
      <Classify />
    </div>
  </div>
</template>

<script>
import Overview from './Overview'
import Classify from './Classify'
import Origin from './Origin'
import Handle from './Handle'
export default {
  components: {
    Overview,
    Classify,
    Origin,
    Handle
  }
}
</script>

<style lang="scss" scoped>
.things-container {
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

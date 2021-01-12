<template>
  <div class="network-container">
    <div class="column">
      <BasicLevel />
      <GovOrganizing />
    </div>
    <div class="column">
      <TheMassesOrganzing />
      <SocietyOragnzing />
    </div>
  </div>
</template>

<script>
import BasicLevel from './BasicLevel'
import GovOrganizing from './GovOrganizing'
import TheMassesOrganzing from './TheMassesOrganzing'
import SocietyOragnzing from './SocietyOragnzing'
export default {
  components: {
    BasicLevel,
    GovOrganizing,
    TheMassesOrganzing,
    SocietyOragnzing
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
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

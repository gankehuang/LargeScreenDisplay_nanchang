<template>
  <div class="things-container">
    <div class="column">
      <PublicVideo />
      <PassengerTraffic />
    </div>
    <div class="column">
      <PubilcFacilities />
      <Logistics />
    </div>
  </div>
</template>

<script>
import PublicVideo from './PublicVideo'
import PassengerTraffic from './PassengerTraffic'
import PubilcFacilities from './PubilcFacilities'
import Logistics from './Logistics'
export default {
  components: {
    PublicVideo,
    PassengerTraffic,
    PubilcFacilities,
    Logistics
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

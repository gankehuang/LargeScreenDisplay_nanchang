<template>
  <div class="page-left">
    <PersonnelProfile />
    <SpreadInfo />
  </div>
</template>

<script>
import PersonnelProfile from './PersonnelProfile'
import SpreadInfo from './SpreadInfo'
export default {
  components: {
    PersonnelProfile,
    SpreadInfo
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

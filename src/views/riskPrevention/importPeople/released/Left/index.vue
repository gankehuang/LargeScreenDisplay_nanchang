<template>
  <div class="page-left">
    <PersonnelProfile />
    <PersonnelDistribution />
  </div>
</template>

<script>
import PersonnelProfile from './PersonnelProfile'
import PersonnelDistribution from './PersonnelDistribution'
export default {
  components: {
    PersonnelProfile,
    PersonnelDistribution
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>

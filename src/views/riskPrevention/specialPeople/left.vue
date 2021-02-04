<template>
  <div class="page-left">
    <ListInfo />
    <PeopleInfo />
  </div>
</template>

<script>
import ListInfo from './listInfo'
import PeopleInfo from './peopleInfo'
export default {
  components: {
    ListInfo,
    PeopleInfo
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {}
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  color: #58a7fe;
  font-size: 24px;
}
</style>

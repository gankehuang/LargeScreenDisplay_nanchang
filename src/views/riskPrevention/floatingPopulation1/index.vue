<template>
  <Container :is-custom-page="true">
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="1"
    />

    <!--搜索人员名称-->
    <Search
      :cur-page-type="curPageType"
      @searchPersonMarker="onSearchPersonMarker"
    />

    <!--地图-->
    <Map
      ref="map"
      :cur-page-type="curPageType"
    />

    <!--切换页面-->
    <PageSwitch @switchPage="switchPage" />

    <!-- 失意人员弹框 -->
    <MessTable :visible.sync="messTableVisible" />

    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <Left />
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <Right />
    </transition>
  </Container>
</template>
<script>
import commonMixin from '../commonMixin'
import Map from './map'
import PageSwitch from './PageSwitch'
import Search from './Search'
import Left from 'Left/index'
import Right from 'Right/index'

export default {
  components: {
    Map,
    PageSwitch,
    Search,
    Left,
    Right
  },
  mixins: [commonMixin],
  data () {
    return {
      curPageType: 'airport'
    }
  },
  methods: {
    switchPage (pageTitle) {
      this.$refs.map.updateKeyPersonnelMarker(enumPersonType[this.curPageType].type, enumPersonType[this.curPageType].key)
    },
    onSearchPersonMarker (list) {
      this.$refs.map.showSearchMakerList(list, enumPersonType[this.curPageType].key)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

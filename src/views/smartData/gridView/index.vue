<template>
  <Container>
    <Tabs
      :tab-list="tabList"
      width="260px"
      :cur-index="1"
    />
    <Map
      ref="map"
      :cur-select-menu="curSelectMenu"
    />
    <SearchPoint @updateSearchResult="onSearchResult" />
    <MapOperate @updateMenu="onMenuChange" />
    <template v-slot:pageLeft>
      <Left />
    </template>
    <template v-slot:pageRight>
      <Right v-show="isShowRightBlock" />
    </template>
  </Container>
</template>
<script>
import commonMixin from '../commonMixin'
import Map from './map'
import SearchPoint from './SearchPoint'
import MapOperate from './MapOperate'

import Left from './left'
import Right from './right'
export default {
  components: {
    Map,
    SearchPoint,
    MapOperate,
    Left,
    Right
  },
  mixins: [commonMixin],
  data () {
    return {
      isShowRightBlock: false,
      curSelectMenu: null
    }
  },
  methods: {
    // 监听菜单切换
    onMenuChange (res) {
      // 注意此处为了节约性能，需要先重置上一次的操作的菜单，后面再赋值本次，顺序不能调整!!!
      this.$refs.map.resetMapMarker()
      this.curSelectMenu = res

      if (!res.active) {
        return
      }

      if (res.name === '天网' || res.name === '地网') {
        this.isShowRightBlock = true
      }

      // 防止curSelectMenu还没有传入map子组件,就触发下面逻辑
      setTimeout(() => {
        this.$refs.map.updateMapMarker()
      }, 200)
    },
    // 监听搜索
    onSearchResult (pos) {
      this.$refs.map.updateSearchResult(pos)
    }
  }
}
</script>

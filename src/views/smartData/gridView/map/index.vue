<template>
  <AMap
    ref="AMap"
    @mapInit="mapInit"
    @zoomChange="zoomChange"
    @mousewheel="mousewheel"
  >
    <CameraModal
      ref="cameraModal"
      :info="cameraModalInfo"
    />

    <PostInfoModal
      ref="postInfoModal"
      :info="postInfoModalInfo"
    />
  </AMap>
</template>

<script>
import polymerizationMixin from './polymerizationMixin'
import markerMixin from './markerMixin'
import searchMixin from './searchMixin'
import AMap from './AMap'
import CameraModal from './CameraModal'
import PostInfoModal from './PostInfoModal'

import { focusMap } from '@/utils/mapHelpler'

export default {
  components: {
    AMap,
    CameraModal,
    PostInfoModal
  },
  // 本页面逻辑分为 聚合标记、普通标记、搜索功能
  mixins: [polymerizationMixin, markerMixin, searchMixin],
  props: {
    curSelectMenu: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      cameraModalInfo: null,
      postInfoModalInfo: null
    }
  },
  beforeDestroy () {
    window.clusterer = null
  },
  methods: {
    mapInit (map) {
      this.map = map
      this.initSkynet()
      this.initRedGrid()
      this.renderSCHsPostMarkers()
      this.renderSCHsPropertyMarkers()
      this.renderLawMarkers(30)
      focusMap(this.map, [115.938066, 28.718901], 10)
    },
    // 更新地图标记
    updateMapMarker () {
      if (!this.curSelectMenu) {
        return
      }
      switch (this.curSelectMenu.name) {
        case '天网':
          this.skynet.markerList.forEach(item => item.show())
          break
        case '地网':
          break
        case '红色物业':
          this.markList.HSWYList.forEach(item => item.show())
          break
        case '红色驿站':
          this.markList.HSYZList.forEach(item => item.show())
          break
        case '法律援助组织':
          this.markList.lawList.forEach(item => item.show())
          break
        case '心防组织':
          this.initSCPsychological()
          break
        case '红色网格':
          this.redGrid.markerList.forEach(item => item.show())
          break
      }
    },
    // 重置地图标记
    resetMapMarker () {
      if (!this.curSelectMenu) {
        return
      }
      // 上一次点击的菜单操作还原
      switch (this.curSelectMenu.name) {
        case '天网':
          this.skynet.markerList.forEach(item => item.hide())
          if (window.clusterer) {
            window.clusterer.setMarkers([])
          }
          break
        case '地网':
          break
        case '红色物业':
          this.markList.HSWYList.forEach(item => item.hide())
          break
        case '红色驿站':
          this.markList.HSYZList.forEach(item => item.hide())
          break
        case '法律援助组织':
          this.markList.lawList.forEach(item => item.hide())
          break
        case '心防组织':
          if (window.clusterer) {
            window.clusterer.setMarkers([])
          }
          break
        case '红色网格':
          this.redGrid.markerList.forEach(item => item.hide())
          if (window.clusterer) {
            window.clusterer.setMarkers([])
          }
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .skynet-point {
  .icon {
    background: url("~@/assets/image/gridView/shexiangtou.png") no-repeat;
    background-size: 100% 100%;
  }
}

::v-deep .redGrid-point {
  .icon {
    background: url("~@/assets/image/gridView/hswgg-1.png") no-repeat;
    background-size: 100% 100%;
  }
}

::v-deep .xfzzz-point {
  .icon {
    background: url("~@/assets/image/gridView/xfzzz-1.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>

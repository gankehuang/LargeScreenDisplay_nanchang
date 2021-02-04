<template>
  <SimpleMap
    @mapInit="mapInit"
  >
    <!--切换视频播放方式-->
    <el-amap-info-window
      v-if="toggleVideoPlayWindow.visible"
      :auto-move="true"
      :show-shadow="true"
      :position="toggleVideoPlayWindow.position"
      :is-custom="true"
    >
      <ToggleVideoModal
        :visible.sync="toggleVideoPlayWindow.visible"
        @switchVideoPlay="switchVideoPlay"
      />
    </el-amap-info-window>

    <!--视频预览弹框-->
    <MovePlayModal :play-list="playList" />
  </SimpleMap>
</template>
<script>
import activeMixin from './activeMixin'
import mapBoxSelectMixin from './mapBoxSelectMixin'

import MovePlayModal from '@/components/MoveVideoPlayer'
import ToggleVideoModal from './ToggleVideoModal'

import { focusMap } from '@/utils/mapHelpler'

export default {
  components: { MovePlayModal, ToggleVideoModal },
  // 本页面逻辑拆分为活动、框选
  mixins: [activeMixin, mapBoxSelectMixin],
  props: {
    curOperateMapMenu: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      playList: [],
      map: null,
      toggleVideoPlayWindow: {
        visible: false,
        position: [115.94262, 28.584282],
        data: null
      }
    }
  },
  beforeDestroy () {
    window.clusterer = null
    window.pathSimplifierIns = null
    window.navg = null
    this.$EventBus.$off('delete:playerIndex')
  },
  mounted () {
    // 注册用于删除 playList 列表项的回调函数
    this.$EventBus.$on('delete:playerIndex', (index) => {
      this.playList.splice(index, 1)
    })
  },
  methods: {
    mapInit (map) {
      this.map = map
      this.createMouseTool(map) // 初始化圈选工具
      this.createRangingTool(map) // 初始化测距工具
      focusMap(this.map, [115.86198, 28.615349], 12)
    },
    // 重置地图图标
    resetMapMarker () {
      if (!this.curOperateMapMenu) {
        return
      }
      switch (this.curOperateMapMenu.name) {
        case '雪亮工程':
          if (window.clusterer) {
            window.clusterer.setMarkers([])
          }
          break
      }
    },
    // 点击视频marker切换播放方式
    switchVideoPlay (playType) {
      if (playType === 'previewToList') {
        // 列表预览
        const curMarkerVideoInfo = {
          cameraIndexCode: this.toggleVideoPlayWindow.data.gbIndexCode
            ? this.toggleVideoPlayWindow.data.gbIndexCode
            : this.toggleVideoPlayWindow.data.cameraIndexCode,
          positionName: this.toggleVideoPlayWindow.data.positionName
        }

        this.$emit('switchVideoPlay', curMarkerVideoInfo)
      } else if (playType === 'previewToVideo') {
        // 视频预览
        this.playList.push(this.toggleVideoPlayWindow.data)
      }

      // 操作完成，关闭该弹框
      this.toggleVideoPlayWindow.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
// 聚合视频样式
::v-deep .video-point {
  .icon {
    background: url("~@/assets/image/gridView/shexiangtou.png") no-repeat;
    background-size: 100% 100%;
  }
}

// 文字marker样式
::v-deep .position-label {
  background: #168eeb;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  padding: 5px;
  text-align: center;
  border: none;
}

::v-deep .amap-marker-label {
  background-color: transparent;
  border: none;
}
</style>

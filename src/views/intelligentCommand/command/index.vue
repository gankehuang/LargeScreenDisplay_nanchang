<template>
  <div
    class="page-container"
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <div class="activity-report" @click="openAddActiveModal">
      <span class="text">预案</span>
    </div>

    <ToolSelector slot="tool" @bindToolBtn="bindToolBtn" />

    <SwitchActiveRoute @switchActiveRoute="switchActiveRoute" />
    <MapOperate @updateMapMarker="updateMapMarker" />
    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-if="eventInfo"
        :vid="eventInfo.id"
        :position="[eventInfo.longitude, eventInfo.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div
          v-if="eventInfo.typeText === '政治安全'"
          class="zz-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="zz-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '社会治安'"
          class="sh-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="sh-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '矛盾纠纷'"
          class="md-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="md-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '公共安全'"
          class="gg-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="gg-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '网络安全'"
          class="wl-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="wl-twinkle"></div>
        </div>
      </el-amap-marker>

      <!--路线地点图标-->
      <el-amap-marker
        v-for="item in markingPointList"
        :key="item.id + 'markerPoint'"
        :vid="item.id"
        :position="[item.lon, item.lat]"
        :offset="[-35, -70]"
        :topWhenClick="true"
      >
        <img
          src="@/assets/image/command/icons.gif"
          width="40"
          height="60"
          @click="toggleActivePoint(item)"
        />
      </el-amap-marker>

      <!--路线地点文字标记-->
      <el-amap-text
        class="marker-text"
        v-for="item in markingPointList"
        :text="item.address"
        :key="item.id + 'markerText'"
        :offset="[20, -80]"
        :position="[item.lon, item.lat]"
      ></el-amap-text>

      <!--切换视频播放方式-->
      <el-amap-info-window
        v-if="toggleVideoPlayWindow.visible"
        :autoMove="true"
        :showShadow="true"
        :position="toggleVideoPlayWindow.position"
        :is-custom="true"
      >
        <ToggleVideoModal
          :visible.sync="toggleVideoPlayWindow.visible"
          @switchVideoPlay="switchVideoPlay"
        />
      </el-amap-info-window>
    </SimpleMap>

    <transition name="ani-left" mode="out-in" appear>
      <div class="page-left">
        <LeftBlock
          :cameraIndexCodeList="cameraIndexCodeList"
          :activeMes="curActiveObj"
          :curMarkerVideoInfo="curMarkerVideoInfo"
        />
      </div>
    </transition>

    <transition name="ani-right" mode="out-in" appear>
      <div class="page-right">
        <RightBox :gridName="curClickPointName" :activeMes="curActiveObj" />
      </div>
    </transition>

    <!--视频预览-->
    <VideoPlayback
      :visible.sync="videoPlaybackModal.visible"
      :info="videoPlaybackModal.info"
    />

    <!--增加活动弹框-->
    <AddActiveModal
      :visible.sync="addActiveModal.visible"
      :info="addActiveModal.info"
    />
  </div>
</template>

<script>
const initCameraIndexCodeList = [
  {
    cameraIndexCode: '36015603001320000845',
    positionName: ''
  },
  {
    cameraIndexCode: '36012120001320000099',
    positionName: ''
  },
  {
    cameraIndexCode: '36015602001320001610',
    positionName: ''
  },
  {
    cameraIndexCode: '36015602001320001774',
    positionName: ''
  },
  {
    cameraIndexCode: '36012102001310993251',
    positionName: ''
  },
  {
    cameraIndexCode: '36015603001320000553',
    positionName: ''
  }
]

import SimpleMap from '@/components/SimpleMap'
import MapOperate from './MapOperate'
import RightBox from './right'
import LeftBlock from './left/LeftBlock'
import VideoPlayback from './VideoPlayback'
import AddActiveModal from './active/addActiveModal'
import SwitchActiveRoute from './active/SwitchActiveRoute'
import ToggleVideoModal from './ToggleVideoModal'
import ToolSelector from './ToolSelector'

import commonMixin from '../commonMixin'
import eventMixin from './mixin/eventMixin'
import activeMixin from './mixin/activeMixin'
import mapBoxSelectMixin from './mixin/mapBoxSelectMixin'

export default {
  components: {
    SimpleMap,
    MapOperate,
    RightBox,
    LeftBlock,
    VideoPlayback,
    AddActiveModal,
    SwitchActiveRoute,
    ToggleVideoModal,
    ToolSelector
  },
  mixins: [commonMixin, activeMixin, eventMixin, mapBoxSelectMixin],
  data() {
    return {
      loading: false,
      map: null,
      curMarkerVideoInfo: Object.create(null),
      cameraIndexCodeList: [],
      curClickPointName: '市综治中心',
      curMenuItem: null,
      toggleVideoPlayWindow: {
        visible: false,
        position: [115.94262, 28.584282],
        data: null
      }
    }
  },
  created() {
    this.cameraIndexCodeList = initCameraIndexCodeList
  },
  methods: {
    mapInit(map) {
      this.map = map
      this.createMouseTool(map)
      this.createRangingTool(map)
      this._focusMap()
    },
    // 聚焦地图
    _focusMap(pos, zoom) {
      if (pos && zoom) {
        this.map.setCenter(pos)
        this.map.setZoom(zoom)
      } else {
        this.map.setCenter([115.86198, 28.615349])
        this.map.setZoom(12)
      }
    },
    // 更新地图图标
    updateMapMarker(res) {
      this._resetMapMarker()
      this.curMenuItem = res
      if (!res.active) {
        return
      }
      switch (res.name) {
        case '雪亮工程':
          this._getActiveVideoList(this.curActiveObj.id)
          break
      }
    },
    // 重置地图图标
    _resetMapMarker() {
      if (!this.curMenuItem) {
        return
      }
      switch (this.curMenuItem.name) {
        case '雪亮工程':
          window.clusterer ? window.clusterer.setMarkers([]) : null
          break
      }
    },
    // 切换视频播放方式
    switchVideoPlay(playType) {
      if (playType === 'realTime') {
        this.videoPlaybackModal.info = this.toggleVideoPlayWindow.data
        this.videoPlaybackModal.visible = true
      } else if (playType === 'nowPlay') {
        this.curMarkerVideoInfo = {
          cameraIndexCode: this.toggleVideoPlayWindow.data.gbIndexCode
            ? this.toggleVideoPlayWindow.data.gbIndexCode
            : this.toggleVideoPlayWindow.data.cameraIndexCode,
          positionName: this.toggleVideoPlayWindow.data.positionName
        }
      }

      this.toggleVideoPlayWindow.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
// 聚合视频样式
/deep/ .video-point {
  .icon {
    background: url("~@/assets/image/gridView/shexiangtou.png") no-repeat;
    background-size: 100% 100%;
  }
}

// 文字marker样式
/deep/ .amap-overlay-text-container {
  background: #168eeb;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  padding: 5px;
  text-align: center;
  border: none;
}

// 增加活动报备
.activity-report {
  position: fixed;
  z-index: 999;
  bottom: 35px;
  right: 442px;
  width: 70px;
  height: 70px;
  cursor: pointer;
  background: url("~@/assets/image/command/activity-report-bg.png") no-repeat
    100% 100%;
  background-size: 100% 100%;
  .text {
    color: #a9daff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

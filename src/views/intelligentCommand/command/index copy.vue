<template>
  <div
    class="page-container"
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <ToolSelector slot="tool" @bindToolBtn="bindToolBtn" />
    <div class="activity-report" @click="openAddActiveModal">
      <span class="text">预案</span>
    </div>

    <SwitchActiveRoute
      @switchActiveRoute="switchActiveRoute"
      @initActiveToMapRender="initActiveToMapRender"
    />
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

      <!--设备列表-->
      <el-amap-marker
        v-for="item in onlineList"
        :key="item.id"
        :vid="item.id"
        :position="[item.lon, item.lat]"
        :offset="[-12, -10]"
        :topWhenClick="true"
      >
        <div
          style="
                  color: #fff;
                  margin-bottom: 4px;
                  min-width: 200px;
                  white-space: nowrap;
                "
        >
          {{ item.nickName }}
        </div>
        <img
          src="@/assets/image/command/safe.png"
          @click="openDeviceModal(item)"
        />
      </el-amap-marker>

      <el-amap-info-window
        v-if="infoWindowData"
        :autoMove="true"
        :showShadow="true"
        :position="[infoWindowData.lon, infoWindowData.lat]"
        :events="infoWindowEvents"
        :offset="[0, -25]"
      >
        <div class="info-window">
          <div class="title">{{ infoWindowData.serialNumber }}</div>
          <div class="info">
            <div class="row">
              <span>用户名</span>
              <span>{{ infoWindowData.nickName }}</span>
            </div>
            <div class="row">
              <span>设备编号</span>
              <span>{{ infoWindowData.serialNumber }}</span>
            </div>
            <div class="row">
              <span>部门</span>
              <span>江西珉轩智能科技有限公司</span>
            </div>
            <div class="row">
              <span>当前所在群组</span>
              <span>默认群组</span>
            </div>
            <div class="row">
              <span>状态</span>
              <span v-if="infoWindowData.type === 0"
style="color: #00ffff"
                >定位失败</span
              >
              <span v-else-if="infoWindowData.type === 1"
style="color: #00ff00"
                >GPS定位成功</span
              >
              <span v-else-if="infoWindowData.type === 2"
style="color: #00ff00"
                >WIFI定位成功</span
              >
            </div>
            <div class="row">
              <span>经纬度</span>
              <span>{{ infoWindowData.lon }},{{ infoWindowData.lat }}</span>
            </div>
            <div class="row">
              <span>最后GPS定位时间</span>
              <span>{{
                new Date(infoWindowData.gpsTime).toLocaleString()
              }}</span>
            </div>
            <div class="row">
              <span>电量</span>
              <span
                :style="{
                  color: infoWindowData.power > 50 ? '#00FF00' : '#00FFFF'
                }"
                >{{ infoWindowData.power }}%</span
              >
            </div>
          </div>
          <div class="button-bar">
            <button @click="showPath(infoWindowData.id)">查看轨迹</button>
            <button @click="showMonitor(infoWindowData.id)">远程视频</button>
            <button @click="showVoice([infoWindowData.id])">语音对讲</button>
          </div>
        </div>
      </el-amap-info-window>
    </SimpleMap>

    <transition name="ani-left" mode="out-in" appear>
      <div class="page-left">
        <LeftBlock
          :cameraIndexCode="cameraIndexCodeList"
          :activeMes="curActiveObj"
        />
      </div>
    </transition>

    <transition name="ani-right" mode="out-in" appear>
      <div class="page-right">
        <RightBox
          :departmentList="departmentList"
          @focusDevice="focusDevice"
          :gridName="curClickPointName"
          @schedulingVideo="showMonitor"
          :activeMes="curActiveObj"
        />
      </div>
    </transition>

    <!--群防群治-->
    <Modal
      v-if="modal === 'device'"
      @bindBtnClose="modal = ''"
      :devices="departmentList"
      :selectedDevices="selectedDevices"
    />

    <!--远程视频-->
    <Monitor
      v-if="modal === 'monitor'"
      :userId="monitorId"
      @bindBtnClose="modal = ''"
    />

    <!--语音对讲-->
    <Voice
      v-if="modal === 'voice'"
      @bindBtnClose="modal = ''"
      :voiceIds="voiceIds"
    />

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
  '36015603001320000845',
  '36012120001320000099',
  '36011108001310563995',
  '36010300001320016797',
  '36015601001320000020',
  '36015603001320000553'
]

import SimpleMap from '@/components/SimpleMap'
import ToolSelector from './ToolSelector'
import Modal from './Modal'
import Voice from './Voice'
import Monitor from './Monitor'
import MapOperate from './MapOperate'
import RightBox from './right'
import LeftBlock from './left/LeftBlock'
import VideoPlayback from './VideoPlayback'
import AddActiveModal from './active/addActiveModal'
import SwitchActiveRoute from './active/SwitchActiveRoute'

import commonMixin from '../commonMixin'
import eventMixin from './mixin/eventMixin'
import mapBoxSelectMixin from './mixin/mapBoxSelectMixin'
import activeMixin from './mixin/activeMixin'

export default {
  components: {
    SimpleMap,
    MapOperate,
    Modal,
    ToolSelector,
    Monitor,
    Voice,
    RightBox,
    LeftBlock,
    VideoPlayback,
    AddActiveModal,
    SwitchActiveRoute
  },
  mixins: [commonMixin, activeMixin, mapBoxSelectMixin, eventMixin],
  data() {
    return {
      loading: false,
      map: null,
      cameraIndexCodeList: [],
      curClickPointName: '市综治中心',
      curMenuItem: null
    }
  },
  created() {
    this.cameraIndexCodeList = initCameraIndexCodeList
    this.getDepartmentList()
  },
  methods: {
    mapInit(map) {
      this.map = map
      this._focusMap([115.893868, 28.638082], 12)
    },
    // 聚焦地图
    _focusMap(pos, zoom) {
      if (this.map) {
        this.map.setCenter(pos)
        this.map.setZoom(zoom)
      } else {
        this.map.setCenter([115.893868, 28.638082])
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
        case '视频':
          this._getActiveVideoList(this.curActiveObj.id)
          break
      }
    },
    // 重置地图图标
    _resetMapMarker() {
      window.clusterer
        ? window.clusterer.removeMarkers(this.curPolymerizationList)
        : null
      window.clusterer = null
      this.curPolymerizationList = []
    }
  }
}
</script>

<style lang="scss" scoped>
// 聚合视频样式
/deep/ .video-point {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    display: inline-block;
    width: 26px;
    height: 26px;
    background: url("~@/assets/image/gridView/shexiangtou.png") no-repeat;
  }
  .num {
    color: #a9daff;
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

// 信息框样式
/deep/ .amap-info-content {
  width: 380px;
  height: 430px;
  background: url("~@/assets/image/command/info-content-bg.png") no-repeat 100%
    100%;
  background-size: 100% 100%;
}

/deep/ .amap-info-close {
  right: 22px !important;
  top: 20px !important;
}

.info-window {
  .title {
    line-height: 36px;
    font-size: 14px;
    color: #0ff;
    padding-left: 21px;
  }

  .info {
    margin-top: 18px;

    .row {
      line-height: 26px;
      font-size: 12px;

      span:nth-of-type(1) {
        color: #ffffff;
        width: 120px;
        margin-left: 5px;
        display: inline-block;
        text-align: right;
      }

      span:nth-of-type(2) {
        margin-left: 10px;
        color: #00ffff;
      }
    }
  }

  .button-bar {
    margin-top: 90px;
    display: flex;
    justify-content: space-evenly;

    button {
      background: url("~@/assets/image/warning/submit-btn.png");
      width: 104px;
      height: 38px;
      border: none;
      outline: none;
      color: #fff;
      cursor: pointer;
    }
  }
}

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

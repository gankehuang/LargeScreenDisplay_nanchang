<template>
  <SimpleMap
    @mapInit="mapInit"
  >
    <div
      v-if="showCloseButton"
      class="closeTrajectory"
      @click="closeTrajectory"
    >
      <i class="iconfont el-icon-close" />
      关闭轨迹
    </div>

    <!--人员轨迹标记点-人员信息弹框-->
    <el-amap-info-window
      v-if="infoWindowData"
      :auto-move="true"
      :show-shadow="true"
      :position="[infoWindowData.lon, infoWindowData.lat]"
      :is-custom="true"
    >
      <TrajectoryPointWindow
        :info-window-data="infoWindowData"
        @lookVideo="onLookVideo"
        @closeWindow="infoWindowData = null;"
      />
    </el-amap-info-window>

    <!--海量点点击人员信息-->
    <PeronInfoModal
      ref="personInfoModal"
      :info="personModalInfo"
      @showPath="showPath"
    />

    <!--轨迹标记点人员信息-视频按钮点击弹框-->
    <PersonVideoModal
      ref="personVideoModal"
      :info="personVideoModalInfo"
    />

    <!--事件弹框主页-->
    <EventHomeModal
      ref="eventHomeModal"
      :info="eventHomeInfo"
      @onEventBtnHandle="onEventBtnHandle"
    />

    <!--事件弹框指派或者上报-->
    <EventAssignmentReportModal
      ref="eventAssignmentReport"
      :info="eventAssignmentReportInfo"
      @onEventAssignmentReport="$refs.eventHomeModal.openModal()"
    />

    <!--事件弹框处置-->
    <EventHandleModal
      ref="eventHandleModal"
      :info="eventHandleInfo"
      @onEventHandleModal="$refs.eventHomeModal.openModal()"
    />

    <!--事件具体详情弹框-->
    <EventDetailModal
      :visible.sync="eventDetailModal.visible"
      :info="eventDetailModal.info"
      @update:visible="$refs.eventHomeModal.openModal()"
    />
  </SimpleMap>
</template>
<script>
import trajectoryMixin from './trajectoryMixin'
import eventMixin from './eventMixin'
import { focusMap } from '@/utils/mapHelpler'
import { getKeyPopulationGps } from '@/api/riskPrevention/importPeople'
import { createMapMarkerList, createPolymerizationMarker } from '@/common/createMapMarker'
import TrajectoryPointWindow from './TrajectoryPointWindow'
import PeronInfoModal from './PeronInfoModal'
import PersonVideoModal from './PersonVideoModal'

export default {
  components: {
    TrajectoryPointWindow,
    PeronInfoModal,
    PersonVideoModal
  },
  // 本页面逻辑分为 轨迹、事件
  mixins: [trajectoryMixin, eventMixin],
  props: {
    curPageType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      map: null,
      searchMarkerList: [],
      personModalInfo: null,
      personVideoModalInfo: null,
      infoWindowData: null
    }
  },
  beforeDestroy () {
    window.clusterer = null
    window.pathSimplifierIns = null
    window.navg = null
  },
  methods: {
    mapInit (map) {
      this.map = map
      this.updateKeyPersonnelMarker(3, 'mentalDisease')
      focusMap(this.map, [115.79799, 28.633771], 13)
    },
    // 更新获取人员点位列表
    async updateKeyPersonnelMarker (type, className) {
      this._resetMap()
      const list = await this._getKeyPersonnelList(type)
      this._createKeyPersonnelMarker(list, className)
    },
    // 获取重点人员列表
    async _getKeyPersonnelList (type) {
      const { status, data } = await getKeyPopulationGps({ type })
      if (status === 200) {
        return data
      }
    },
    // 创建重点人员标记列表
    _createKeyPersonnelMarker (list, className) {
      createPolymerizationMarker(
        this.map,
        list,
        {
          className: className,
          gridSize: 120
        },
        data => {
          this.$refs.personInfoModal.openModal()
          this.personModalInfo = {
            curPageType: this.curPageType,
            ...data
          }
        }
      )
    },
    // 显示搜索标记
    showSearchMakerList (list, className) {
      this._resetMap()
      if (!list.length) {
        return
      }
      this._createSearchMarkerList(list, className)
      focusMap(this.map, [list[0].lon, list[0].lat])
    },
    // 创建搜索标记
    _createSearchMarkerList (list, className) {
      this.searchMarkerList = createMapMarkerList(
        this.map,
        list,
        function (item) {
          return {
            position: [item.lon, item.lat],
            content: `<div class="massive-point ${className} twinkle1">
                        <i class="icon"></i><span class="num">1</span>
                      </div>`,
            extData: item,
            title: item.phychosis_NAME
          }
        },
        data => {
          this.$refs.personInfoModal.openModal()
          this.personModalInfo = {
            curPageType: this.curPageType,
            ...data
          }
        }
      )
    },
    // 重置地图标记
    _resetMap () {
      // 重置搜索标记
      if (this.searchMarkerList.length) {
        this.map.remove(this.searchMarkerList)
        this.searchMarkerList = []
      }

      // 重置聚合点
      if (window.clusterer) {
        window.clusterer.setMarkers([])
      }

      // 重置轨迹
      if (window.pathSimplifierIns) {
        window.pathSimplifierIns.setData([])
      }

      // 重置巡航器
      if (window.navg) {
        window.navg.destroy()
      }
    },
    // 查看人员视频
    onLookVideo (data) {
      this.personVideoModalInfo = data
      this.$refs.personVideoModal.openModal()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .mentalDisease {
  .icon {
    background: url('~@/assets/image/importPeople/jingshen.png') no-repeat;
    background-size: 100% 100%;
  }
}

::v-deep .petitionLetter {
  .icon {
    background: url('~@/assets/image/importPeople/xinfang.png') no-repeat;
    background-size: 100% 100%;
  }
}

::v-deep .retire {
  .icon {
    background: url('~@/assets/image/importPeople/tuiyijunren.png') no-repeat;
    background-size: 100% 100%;
  }
}

::v-deep .released {
  .icon {
    background: url('~@/assets/image/importPeople/xingshijiejie.png') no-repeat;
    background-size: 100% 100%;
  }
}

::v-deep .correct {
  .icon {
    background: url('~@/assets/image/importPeople/jiaozheng.png') no-repeat;
    background-size: 100% 100%;
  }
}

.closeTrajectory {
  position: absolute;
  top: 14%;
  right: 25%;
  width: 120px;
  line-height: 40px;
  font-size: 16px;
  color: #A9DAFF;
  cursor: pointer;
  text-align: center;
  background-size: 100% 100%;
  background: url('~@/assets/image/importPeople/close-button-bg.png') no-repeat center;
}

</style>

<template>
  <SimpleMap
    :is-need-render-grid="true"
    @mapInit="mapInit"
  >
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
import { resultEventMarker, focusMap } from '@/utils/mapHelpler'
import eventMixin from './eventMixin'

export default {
  mixins: [eventMixin],
  data () {
    return {
      map: null,
      curEventMarker: null
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('focusEvent')
  },
  mounted () {
    this.onFocusEvent()
  },
  methods: {
    mapInit (map) {
      this.map = map
      focusMap(this.map, [116.002424, 28.692519], 10)
    },
    // 监听页面右下角预警列表聚焦事件
    onFocusEvent () {
      this.$EventBus.$on('focusEvent', res => {
        const data = { ...res }
        this._focusEventBefore(data)
        this._createFocusEventMarker(data)
      })
    },
    // 聚焦事件前重置操作
    _focusEventBefore (data) {
      if (!data.longitude || !data.latitude) {
        this.$message.warning('未获取到该事件的位置信息')
        return
      }
      if (this.curEventMarker) {
        this.map.remove(this.curEventMarker)
      }
      if (this.eventMarkerList.length) {
        this.map.remove(this.eventMarkerList)
      }
    },
    // 创建聚焦事件marker
    _createFocusEventMarker (data) {
      this.curEventMarker = resultEventMarker(data.typeText, [data.longitude, data.latitude])
      this.curEventMarker.on('click', () => {
        this.eventHomeInfo = { ...data }
        this.$refs.eventHomeModal.openModal()
      })
      this.map.add(this.curEventMarker)
      focusMap(this.map, [data.longitude, data.latitude], 18)
    }
  }
}
</script>

<style lang="scss" scoped></style>

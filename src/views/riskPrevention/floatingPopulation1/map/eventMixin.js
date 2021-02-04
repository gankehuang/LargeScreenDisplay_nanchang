import EventHomeModal from '@/components/evenModule/EventHomeModal'
import EventAssignmentReportModal from '@/components/evenModule/EventAssignmentReportModal'
import EventHandleModal from '@/components/evenModule/EventHandleModal'
import EventDetailModal from '@/components/evenModule/EventDetails/DetailModal'
import { focusMap, resultEventMarker } from '@/utils/mapHelpler'
export default {
  components: {
    EventHomeModal,
    EventAssignmentReportModal,
    EventHandleModal,
    EventDetailModal
  },
  data () {
    return {
      curEventMarker: null,
      eventHomeInfo: null,
      eventAssignmentReportInfo: null,
      eventHandleInfo: null,
      eventDetailModal: {
        visible: false,
        info: null
      }
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('focusEvent')
  },
  mounted () {
    this.onFocusEvent()
  },
  methods: {
    // 监听页面右下角预警列表聚焦事件
    onFocusEvent () {
      this.$EventBus.$on('focusEvent', res => {
        const data = { ...res }
        this._focusEventBefore(data)
        this._createFocusEventMarker(data)
      })
    },
    // 聚焦事件重置操作
    _focusEventBefore (data) {
      if (!data.longitude || !data.latitude) {
        this.$message.warning('未获取到该事件的位置信息')
        return
      }
      if (this.curEventMarker) {
        this.map.remove(this.curEventMarker)
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
    },
    // 监听事件弹框主页不同按钮操作
    onEventBtnHandle (eventData) {
      if (eventData.btnTypeText === '指派' || eventData.btnTypeText === '上报') {
        this.eventAssignmentReportInfo = eventData
        this.$refs.eventAssignmentReport.openModal()
        return
      }

      if (eventData.btnTypeText === '处置') {
        this.eventHandleInfo = eventData
        this.$refs.eventHandleModal.openModal()
        return
      }

      if (eventData.btnTypeText === '详情') {
        this.eventDetailModal.visible = true
        this.eventDetailModal.info = eventData
      }
    }
  }
}

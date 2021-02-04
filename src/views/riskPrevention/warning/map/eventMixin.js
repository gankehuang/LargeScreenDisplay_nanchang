import EventHomeModal from '@/components/evenModule/EventHomeModal'
import EventAssignmentReportModal from '@/components/evenModule/EventAssignmentReportModal'
import EventHandleModal from '@/components/evenModule/EventHandleModal'
import EventDetailModal from '@/components/evenModule/EventDetails/DetailModal'
import { toArrRepeat } from '@/utils/common'
import { getEventArr } from '@/api/intelligentCommand/warning'
import { resultEventMarker } from '@/utils/mapHelpler'
export default {
  components: {
    EventHomeModal,
    EventAssignmentReportModal,
    EventHandleModal,
    EventDetailModal
  },
  data () {
    return {
      eventList: [],
      eventMarkerList: [],
      eventHomeInfo: null,
      eventAssignmentReportInfo: null,
      eventHandleInfo: null,
      eventDetailModal: {
        visible: false,
        info: null
      }
    }
  },
  mounted () {
    this.initMapMarker()
  },
  methods: {
    // 初始化地图标记
    async initMapMarker () {
      await this._getEventList()
      this._createEventMarkerList()
    },
    // 获取事件列表
    async _getEventList () {
      const { data } = await getEventArr({
        excludeEventCodeList: 'supervise'
      })

      this.eventList = toArrRepeat(data, 'deviceSerialNo')
        .filter(item => (item.longitude && item.latitude))
        .slice(0, 50)
    },
    // 创建事件marker列表
    _createEventMarkerList () {
      this.eventList.forEach(item => {
        const itemMaker = resultEventMarker(item.typeText, [item.longitude, item.latitude])
        itemMaker.on('click', () => {
          this.eventHomeInfo = { ...item }
          this.$refs.eventHomeModal.openModal()
        })
        this.eventMarkerList.push(itemMaker)
      })
      this.map.add(this.eventMarkerList)
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

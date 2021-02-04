import EventModal from './EventModal'
import EventCirculationModal from './EventCirculationModal'
import EventHandleModal from './EventHandleModal'
import EventDetailModal from './EventDetails/DetailModal'
import EarlyWarningModal from './EarlyWarningModal'

// import { getEventArr } from '@/api/intelligentCommand/warning'
import { selectByGeo } from '@/api/riskPrevention/KeyThrong'
export default {
  components: {
    EventModal,
    EventCirculationModal,
    EventHandleModal,
    EventDetailModal,
    EarlyWarningModal
  },
  data () {
    return {
      modal: '',
      eventInfo: null,
      needEventId: '',
      dealModalTitle: '',
      focusingId: null,
      eventList: [],
      eventDetailModal: {
        visible: false,
        info: null
      },
      advancedForm: {
        latitude: '28.640193',
        longitude: '115.816114',
        distance: '1'
      },
      pagination: {
        pageNum: 1,
        pageSize: 30,
        total: 0
      },
      gridCode: ''
    }
  },
  created () {
    this.getAllEventList()
  },
  methods: {
    // 获取全部事件
    async getAllEventList () {
      const { data } = await selectByGeo(
        this.pagination.pageNum,
        this.pagination.pageSize,
        this.advancedForm
      )
      this.eventList = data.list.filter((item, index) => {
        item.isShow = true
        return (item.longitude && item.latitude) && (item.statusText !== '已处置' && item.statusText !== '已归档' && item.peopleLabel !== '退役人员')
      })

      this.eventList = this.eventList.slice(0, 50)
    },
    // 聚焦当前点击事件
    focusEvent (item) {
      if (item.position.length && item.position[0] && item.position[1]) {
        this.eventInfo = item
        this.map.setCenter([item.longitude, item.latitude])
        this.map.setZoom(32)
      } else {
        this.$message.warning('未获取到该事件的位置信息')
      }
    },
    detailsEvent (item) {
      this.eventInfo = item
      this.showEventDetail()
    },
    // 监听事件指派和上报弹框
    onDealModal () {
      this.modal = ''
    },
    // 监听事件详情弹框
    onEventModal (title, id, gridCode, personItem) {
      if (title === '事件指派' || title === '事件上报') {
        this.modal = 'report'
        this.dealModalTitle = title
        this.needEventId = id
        this.gridCode = gridCode
        return
      }

      if (title === '事件详情') {
        this.modal = ''
        this.eventDetailModal.visible = true
        this.eventDetailModal.info = {
          id: id,
          personItem
        }
        return
      }

      if (title === '轨迹追踪') {
        this.modal = ''
        this.earlyWarningModal.visible = true
        this.earlyWarningModal.info = {
          id: id
        }
        return
      }

      if (title === '事件处置') {
        this.modal = 'deal'
        this.needEventId = id
        return
      }

      this.modal = ''
    },
    // 监听事件处置弹框
    onShowToast () {
      this.modal = ''
    },
    // 查看事件弹框
    showEventDetail () {
      this.modal = 'event'
    }
  }
}

import EventModal from './EventModal'
import EventCirculationModal from './EventCirculationModal'
import EventHandleModal from './EventHandleModal'
import EventDetailModal from './EventDetails/DetailModal'

import { getEventArr } from '@/api/intelligentCommand/warning'
export default {
  components: {
    EventModal,
    EventCirculationModal,
    EventHandleModal,
    EventDetailModal
  },
  data() {
    return {
      isGas: false,
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
      gridCode: ''
    }
  },
  created() {
    this.getAllEventList()
  },
  methods: {
    // 获取全部事件
    async getAllEventList() {
      const list = {
        eventCodeList: ''
      }
      if (this.isGas) {
        list.eventCodeList = 'gas_station_smoke_call,gas_station_fire'
      } else {
        // list.eventCodeList = '62053,PEOPLE_GATHERING'
      }
      const { data } = await getEventArr(list)
      this.eventList = data.filter((item, index) => {
        item.isShow = true
        return item.longitude && item.latitude
      })

      this.eventList = this.eventList.slice(0, 50)
    },
    // 聚焦当前点击事件
    focusEvent(item) {
      if (item.position.length && item.position[0] && item.position[1]) {
        this.eventInfo = item
        this.map.setCenter([item.longitude, item.latitude])
        this.map.setZoom(32)
      } else {
        this.$message.warning('未获取到该事件的位置信息')
      }
    },
    detailsEvent(item) {
      this.eventInfo = item
      this.showEventDetail()
    },
    // 监听事件指派和上报弹框
    onDealModal() {
      this.modal = ''
    },
    // 监听事件详情弹框
    onEventModal(title, id, gridCode) {
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
    onShowToast() {
      this.modal = ''
    },
    // 查看事件弹框
    showEventDetail() {
      this.modal = 'event'
    }
  }
}

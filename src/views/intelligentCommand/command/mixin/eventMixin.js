export default {
  components: {},
  data() {
    return {
      eventInfo: null,
      eventTypeText: ''
    }
  },
  watch: {
    map() {
      const { latitude, longitude, source } = this.$route.query
      if (latitude && longitude && source) {
        this.focusEvent()
      }
    }
  },
  methods: {
    // 聚焦当前点击事件
    focusEvent() {
      const { latitude, longitude, source } = this.$route.query

      if (source === 'DEVICE_AWARENESS') {
        this.eventTypeText = '设备感知'
      } else if (source === 'ACTIVE_DISCOVERY') {
        this.eventTypeText = '主动发现'
      } else if (source === 'MASS_REPORT') {
        this.eventTypeText = '群众上报'
      } else if (source === 'SUPERVISORY_CO_ORGANIZER') {
        this.eventTypeText = '督导协办'
      }
      this.$nextTick(() => {
        this.eventInfo = {
          position: [longitude, latitude],
          id: '00001',
          longitude: longitude,
          latitude: latitude
        }
        this.map.setCenter([longitude, latitude])
        this.map.setZoom(32)
      })
    }
  }
}

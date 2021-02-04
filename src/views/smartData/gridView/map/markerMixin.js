import { getSCHsPost, getSCHsProperty, selectSafetyLocation } from '@/api/smartData/gridView'
import { createMapMarkerList } from '@/common/createMapMarker'

export default {
  data () {
    return {
      markList: {
        HSYZList: [],
        HSWYList: [],
        lawList: []
      }
    }
  },
  methods: {
    // 渲染红色驿站 markers
    async renderSCHsPostMarkers () {
      const { status, data } = await getSCHsPost()
      if (status === 200) {
        this.markList.HSYZList = createMapMarkerList(
          this.map,
          data,
          function (item) {
            return {
              icon: require('@/assets/image/gridView/hsyzz-1.png'),
              position: [item.jd, item.wd],
              title: item.hszzmc || '',
              extData: {
                ...item,
                address: item.hszzdz,
                img: item.zp,
                name: item.hszzmc
              },
              visible: false
            }
          },
          data => {
            this.postInfoModalInfo = data
            this.$refs.postInfoModal.open()
          }
        )
      }
    },
    // 渲染红色物业 markers
    async renderSCHsPropertyMarkers () {
      const { status, data } = await getSCHsProperty()
      if (status === 200) {
        this.markList.HSWYList = createMapMarkerList(
          this.map,
          data,
          function (item) {
            if (item.hswyszjd && item.hswyszwd) {
              return {
                icon: require('@/assets/image/gridView/hswyy-1.png'),
                title: item.hswymc || '',
                visible: false,
                position: [item.hswyszjd, item.hswyszwd],
                extData: {
                  ...item,
                  address: item.hswymc,
                  img: item.zp,
                  name: item.ysxhswydsq
                }
              }
            }
          },
          data => {
            this.postInfoModalInfo = data
            this.$refs.postInfoModal.open()
          }
        )
      }
    },
    // 渲染法律援助 markers
    async renderLawMarkers (locationType) {
      const { status, data } = await selectSafetyLocation({
        locationType: locationType
      })
      if (status === 200) {
        this.markList.lawList = createMapMarkerList(this.map,
          data,
          function (item) {
            if (item.longitude && item.latitude) {
              return {
                icon: require('@/assets/image/gridView/flyzz-1.png'),
                position: [item.longitude, item.latitude],
                title: item.safetyLocationName || '',
                extData: item,
                visible: false
              }
            }
          })
      }
    }
  }
}

import { focusMap } from '@/utils/mapHelpler'
import { enumRegion } from '@/config/common'
import { createPolymerizationMarker, createMapMarker } from '@/common/createMapMarker'

export default {
  data () {
    return {
      searchMarker: null
    }
  },
  methods: {
    // 地图查询
    updateSearchResult (pois) {
      if (this.searchMarker) {
        this.map.remove(this.searchMarker)
      }

      if (pois && pois.length > 0) {
        this.searchMarker = createMapMarker({
          position: pois,
          visible: true
        })

        this._searchSkynetPolymerizationMarker(pois)

        focusMap(this.map, pois, 15)
        this.map.add(this.searchMarker)
      }
    },
    // 搜索区域的聚合
    _searchSkynetPolymerizationMarker (pos) {
      // eslint-disable-next-line handle-callback-err
      window.localforage.getItem('regionVideoObj', (err, value) => {
        let gridName = ''
        for (let i = 0; i < this.$refs.AMap.firstPolygons.length; i++) {
          const item = this.$refs.AMap.firstPolygons[i]
          if (item.contains(pos)) {
            gridName = item.w.extData.name
            break
          }
        }
        const list = value[enumRegion[gridName]]
        if (list) {
          createPolymerizationMarker(
            this.map,
            list,
            {
              gridSize: 150,
              maxZoom: 17,
              className: 'skynet-point'
            },
            data => {
              this.cameraModal.info = data
              this.cameraModal.visible = true
            }
          )
        }
      })
    }
  }
}

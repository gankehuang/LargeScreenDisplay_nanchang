import {
  createPolymerizationMarker,
  createMapMarkerList,
  createMassiveMakerList
} from '@/common/createMapMarker'
import {
  countCameraByRegion,
  getSCPsychologicalCounseling,
  queryCountRedGrid,
  queryRedGrid
} from '@/api/smartData/gridView'

const codeList = [
  '360123',
  '360105',
  '360122',
  '360125',
  '360102',
  '360107',
  '360103',
  '360104',
  '360111',
  '360106',
  '360121',
  '360124'
]

export default {
  data() {
    return {
      redGridMarkerList: [],
      skynetMarkerList: [],
      allPolymerizationInfo: {
        redGridPolymerization: {
          firstPolymerizationArr: [],
          polymerizationArrList: [],
          className: 'redGrid-point',
          isStartPolymerization: false
        },
        skynetPolymerization: {
          className: 'skynet-point',
          isStartPolymerization: false
        }
      }
    }
  },
  methods: {
    // 初始化天网聚合点
    async initSkynetPolymerization() {
      const { data, status } = await countCameraByRegion()
      if (status === 200) {
        this.skynetMarkerList = createMapMarkerList(this.map, data, function(
          item
        ) {
          return {
            position: [item.longitude, item.latitude],
            content: `<div class="massive-point skynet-point">
            <i class="icon"></i>
            <span class="num">${item.count}</span>
            </div>`,
            offset: [-15, -15],
            extData: item,
            visible: false
          }
        })
      }
    },
    // 初始化红色网格海量点
    async initRedGridPolymerization() {
      const { data, status } = await queryCountRedGrid()
      if (status === 200) {
        this.redGridMarkerList = createMapMarkerList(this.map, data, function(
          item
        ) {
          return {
            position: [item.longitude, item.latitude],
            content: `<div class="massive-point redGrid-point">
    <i class="icon"></i>
    <span class="num">${item.numVal}</span>
    </div>`,
            offset: [-15, -15],
            extData: item,
            visible: false
          }
        })

        // 提前存储聚合点makers(聚合12个区域数据)
        const fetchList = codeList.map(item => {
          return new Promise((resolve, reject) => {
            queryRedGrid({
              gridCode: item,
              level: 5
            })
              .then(res => {
                const { status, data } = res
                if (status === 200) {
                  resolve(data)
                } else {
                  this.loading = false
                  reject('error')
                }
              })
              .catch(err => {
                this.loading = false
                reject(err)
              })
          })
        })

        Promise.all(fetchList).then(res => {
          this.allPolymerizationInfo['redGridPolymerization'][
            'polymerizationArrList'
          ] = Object.freeze(
            createMassiveMakerList(res.flat(), {
              className: 'redGrid-point',
              compatibleKeys: {
                longitude: 'cenLon',
                latitude: 'cenLat',
                title: 'gridName'
              }
            })
          )

          this.allPolymerizationInfo['redGridPolymerization'][
            'firstPolymerizationArr'
          ] = Object.freeze([res.flat()[0]])
        })
      }
    },
    // 获取心防组织
    setSCPsychologicalPolymerization() {
      getSCPsychologicalCounseling().then(res => {
        const { status, data } = res
        if (status === 200) {
          createPolymerizationMarker(this.map, data, {
            className: 'xfzzz-point',
            compatibleKeys: {
              longitude: 'xljd',
              latitude: 'xlwd',
              title: 'szcsqhzgzdz'
            }
          })
        }
      })
    }
  }
}

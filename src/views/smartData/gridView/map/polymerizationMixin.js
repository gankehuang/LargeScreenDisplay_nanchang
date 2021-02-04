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
import { enumRegion } from '@/config/common'

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
  data () {
    return {
      lastPolymerizationName: '',
      skynet: {
        markerList: [],
        polymerization: {
          className: 'skynet-point',
          isStartPolymerization: false
        }
      },
      redGrid: {
        markerList: [],
        polymerization: {
          firstPolymerizationArr: [],
          polymerizationArrList: [],
          className: 'redGrid-point',
          isStartPolymerization: false
        }
      }
    }
  },
  methods: {
    // 监听鼠标滚轮开始缩放地图时触发
    mousewheel (event) {
      const { lnglat } = event

      // 判断当前是否激活天网，此处以下为针对天网的特殊逻辑
      if (
        !this.curSelectMenu ||
        !this.curSelectMenu.active ||
        this.curSelectMenu.name !== '天网'
      ) {
        return
      }

      // 当前放大区域的经纬度
      const curMousewheelPosition = [lnglat.lng, lnglat.lat]
      let gridName = ''

      // 查询当前放大区域，经纬度所在12个区县中的哪一块
      for (let i = 0; i < this.$refs.AMap.firstPolygons.length; i++) {
        const item = this.$refs.AMap.firstPolygons[i]
        if (item.contains(curMousewheelPosition)) {
          gridName = item.w.extData.name
          break
        }
      }

      // 如果没有符合的区域，则不用进行下面的聚合操作
      if (!gridName) {
        return
      }

      // 判断上一次聚合名称与放大区域名称是否相同，相同则不用重新聚合，否则要重新聚合
      if (this.lastPolymerizationName !== gridName) {
        this.skynet.polymerization.isStartPolymerization = false

        this.lastPolymerizationName = gridName
      }

      // 判断当前放大zoom是否大于11，并且初始化的12个区域点已经渲染完成，并且还没有开始进行聚合，避免多次聚合
      if (
        this.zoom >= 11 &&
        this.skynet.markerList.length &&
        !this.skynet.polymerization.isStartPolymerization
      ) {
        this.skynet.markerList.forEach(item => item.hide())
        this.skynet.polymerization.isStartPolymerization = true
        // 将当前放大的区域进行聚合效果，隐藏初始化的12个区域点
        // eslint-disable-next-line handle-callback-err
        window.localforage.getItem('regionVideoObj', (err, value) => {
          const list = value[enumRegion[gridName]]
          if (list) {
            createPolymerizationMarker(
              this.map,
              list,
              {
                gridSize: 120,
                maxZoom: 17,
                className: 'skynet-point',
                compatibleKeys: {
                  title: 'positionName'
                }
              },
              data => {
                this.$refs.cameraModal.open()
                this.cameraModalInfo = data
              }
            )
          }
        })
      }
    },
    // 监听地图放大缩小,此处为聚合的关键逻辑
    zoomChange (zoom) {
      this.zoom = zoom

      // 如果当前没有激活的项目
      if (!this.curSelectMenu || !this.curSelectMenu.active) {
        return
      }

      switch (this.curSelectMenu.name) {
        case '红色网格':
          this._onStartPolymerization(
            zoom,
            'redGrid',
            {
              longitude: 'cenLon',
              latitude: 'cenLat',
              title: 'gridName'
            }
          )
          this._onStopPolymerization(
            zoom,
            'redGrid'
          )
          break

        case '天网': {
          this._onStopPolymerization(
            zoom,
            'skynet'
          )
          break
        }
      }
    },
    // 监听放大开启聚合
    _onStartPolymerization (
      zoom,
      polymerizationName,
      compatibleKeys
    ) {
      // 判断当前放大zoom是否大于11，并且初始化的12个区域点已经渲染完成，并且还没有开始进行聚合，避免多次聚合
      if (
        zoom >= 11 &&
        this[polymerizationName].markerList.length &&
        !this[polymerizationName].polymerization.isStartPolymerization
      ) {
        this[polymerizationName].markerList.forEach(item => item.hide())
        createPolymerizationMarker(
          this.map,
          this[polymerizationName].polymerization.firstPolymerizationArr,
          {
            className: this[polymerizationName].polymerization.className,
            gridSize: 120,
            averageCenter: false,
            compatibleKeys: compatibleKeys
          }
        )
        if (window.clusterer) {
          window.clusterer.setMarkers(
            this[polymerizationName].polymerization.polymerizationArrList
          )
        }
      }
    },
    // 监听缩放停止聚合
    _onStopPolymerization (zoom, polymerizationName) {
      // 当放大倍数小于10的时候，则不进行聚合，显示初始化的12个区域点
      if (zoom <= 10) {
        if (window.clusterer) {
          window.clusterer.setMarkers([])
        }
        if (this[polymerizationName].markerList.length) {
          this[polymerizationName].markerList.forEach(item => item.show())
        }

        this[polymerizationName].polymerization.isStartPolymerization = false
      }
    },
    // 初始化天网
    async initSkynet () {
      const { data, status } = await countCameraByRegion()
      if (status === 200) {
        this.skynet.markerList = createMapMarkerList(this.map, data, function (
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
    // 初始化红色网格
    async initRedGrid () {
      const { data, status } = await queryCountRedGrid()
      if (status === 200) {
        // 初始化按照区域划分的marker列表
        this.redGrid.markerList = createMapMarkerList(this.map, data, function (
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

        // 提前存储聚合点makers
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
                }
              })
              .catch(err => {
                this.loading = false
                reject(err)
              })
          })
        })

        // 将各区域数据合并成一个聚合数组
        Promise.all(fetchList).then(res => {
          this.redGrid.polymerization.polymerizationArrList = Object.freeze(
            createMassiveMakerList(res.flat(), {
              className: 'redGrid-point',
              compatibleKeys: {
                longitude: 'cenLon',
                latitude: 'cenLat',
                title: 'gridName'
              }
            })
          )

          this.redGrid.polymerization.firstPolymerizationArr = Object.freeze([res.flat()[0]])
        })
      }
    },
    // 初始化心防组织
    async initSCPsychological () {
      const { status, data } = await getSCPsychologicalCounseling()
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
    }
  }
}

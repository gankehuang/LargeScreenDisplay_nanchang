<template>
  <div class="page-container">
    <MapOperate @updateMapMarker="updateMapMarker" />
    <AMap
      ref="AMap"
      @mapInit="mapInit"
      @zoomChange="zoomChange"
      @mousewheel="mousewheel"
    ></AMap>
    <div class="position-bg">
      <div class="dd">定位地点</div>
      <el-amap-search-box
        class="search-box"
        placeholder="请输入定位地点"
        :search-option="searchOption"
        :on-search-result="onSearchResult"
      >
      </el-amap-search-box>
    </div>

    <Tabs :tab-list="tabList" width="260px" :cur-index="1" />

    <transition name="ani-left" mode="out-in" appear>
      <div class="page-left">
        <LeftBlock />
      </div>
    </transition>

    <transition name="ani-right" mode="out-in" appear>
      <div class="page-right" v-if="isShowRightBlock">
        <PublicVideo />
      </div>
    </transition>

    <CameraModal :visible.sync="cameraModal.visible" :info="cameraModal.info" />
    <PostInfoModal :visible.sync="postModal.visible" :info="postModal.info" />
  </div>
</template>

<script>
import {
  queryCameraList,
  selectSafetyLocation,
  getSCHsPost,
  getSCHsProperty
} from '@/api/smartData/gridView'
import '@/plugins/amap'
import AMap from '@/components/AMap'
import CameraModal from './CameraModal'
import LeftBlock from './LeftBlock'
import MapOperate from './MapOperate'
import PublicVideo from './PublicVideo'
import commonMixin from '../commonMixin'
import massivePointMixin from './mixin/massivePointMixin'
import PostInfoModal from './PostInfoModal'
import {
  createMapMarkerList,
  createPolymerizationMarker
} from '@/common/createMapMarker'
import { enumRegion } from '@/config/common'
export default {
  components: {
    AMap,
    CameraModal,
    LeftBlock,
    MapOperate,
    PublicVideo,
    PostInfoModal
  },
  mixins: [commonMixin, massivePointMixin],
  data() {
    return {
      map: null,
      searchOption: {
        city: '南昌',
        citylimit: true
      },
      marker: null,
      cameraModal: {
        info: null,
        visible: false
      },
      DHVideoList: [],
      DHPointSimplifierIns: null,
      isShowRightBlock: false,
      markList: {
        lawList: [],
        HSWYList: [],
        HSYZList: [],
        XFzzList: []
      },
      curSelectMenu: null,
      postModal: {
        info: null,
        visible: false
      },
      zoom: 10,
      lastPolymerizationName: ''
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:changeRegionInfo')
    this.$EventBus.$off('update:regionInfo')
    window.clusterer = null
  },
  methods: {
    mapInit(map) {
      this.map = map
      this._focusMap()
      this.queryCameraDHVideoList()
      this.getSCHsPost()
      this.getSCHsProperty()
      this.selectSafetyLocation(30) // 法律援助
      this.initRedGridPolymerization()
      this.initSkynetPolymerization()
    },
    // 聚焦地图
    _focusMap(pos, zoom) {
      if (pos && zoom) {
        this.map.setCenter(pos)
        this.map.setZoom(zoom)
      } else {
        this.map.setCenter([115.938066, 28.718901])
        this.map.setZoom(10)
      }
    },
    // 监听鼠标滚轮开始缩放地图时触发
    mousewheel(event) {
      const { lnglat } = event

      // 判断当前是否激活天网
      if (
        !this.curSelectMenu ||
        !this.curSelectMenu['active'] ||
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

      if (!gridName) {
        return
      }

      // 判断上一次聚合名称与放大区域名称是否相同，相同则不用重新聚合，否则要重新聚合
      if (this.lastPolymerizationName !== gridName) {
        this.allPolymerizationInfo['skynetPolymerization'][
          'isStartPolymerization'
        ] = false

        this.lastPolymerizationName = gridName
      }

      // 判断当前放大zoom是否大于11，并且初始化的12个区域点已经渲染完成，并且还没有开始进行聚合，避免多次聚合
      if (
        this.zoom >= 11 &&
        this.skynetMarkerList.length &&
        !this.allPolymerizationInfo['skynetPolymerization'][
          'isStartPolymerization'
        ]
      ) {
        this.skynetMarkerList.forEach(item => item.hide())
        this.allPolymerizationInfo['skynetPolymerization'][
          'isStartPolymerization'
        ] = true
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
                this.cameraModal.info = data
                this.cameraModal.visible = true
              }
            )
          }
        })
      }
    },
    // 监听地图放大缩小
    zoomChange(zoom) {
      this.zoom = zoom
      if (!this.curSelectMenu || !this.curSelectMenu['active']) {
        return
      }

      switch (this.curSelectMenu.name) {
        case '红色网格':
          this._startPolymerization(
            zoom,
            'redGridMarkerList',
            'redGridPolymerization',
            {
              longitude: 'cenLon',
              latitude: 'cenLat',
              title: 'gridName'
            }
          )
          this._stopPolymerization(
            zoom,
            'redGridMarkerList',
            'redGridPolymerization'
          )
          break

        case '天网': {
          this._stopPolymerization(
            zoom,
            'skynetMarkerList',
            'skynetPolymerization'
          )
          break
        }
      }
    },
    // 放大开启聚合
    _startPolymerization(
      zoom,
      initMarkerListName,
      needPolymerizationInfoName,
      compatibleKeys
    ) {
      // 判断当前放大zoom是否大于11，并且初始化的12个区域点已经渲染完成，并且还没有开始进行聚合，避免多次聚合
      if (
        zoom >= 11 &&
        this[initMarkerListName].length &&
        !this.allPolymerizationInfo[needPolymerizationInfoName][
          'isStartPolymerization'
        ]
      ) {
        this[initMarkerListName].forEach(item => item.hide())
        createPolymerizationMarker(
          this.map,
          this.allPolymerizationInfo[needPolymerizationInfoName][
            'firstPolymerizationArr'
          ],
          {
            className: this.allPolymerizationInfo[needPolymerizationInfoName][
              'className'
            ],
            gridSize: 120,
            averageCenter: false,
            compatibleKeys: compatibleKeys
          }
        )
        window.clusterer
          ? window.clusterer.setMarkers(
            this.allPolymerizationInfo[needPolymerizationInfoName][
              'polymerizationArrList'
            ]
          )
          : null
      }
    },
    // 缩放停止聚合
    _stopPolymerization(zoom, initMarkerListName, needPolymerizationInfoName) {
      // 当放大倍数小于10的时候，则不进行聚合，显示初始化的12个区域点
      if (zoom <= 10) {
        window.clusterer ? window.clusterer.setMarkers([]) : null
        this[initMarkerListName].length
          ? this[initMarkerListName].forEach(item => item.show())
          : null

        this.allPolymerizationInfo[needPolymerizationInfoName][
          'isStartPolymerization'
        ] = false
      }
    },
    // 地图查询
    onSearchResult(pois) {
      this.marker ? this.map.remove(this.marker) : null
      if (pois && pois.length > 0) {
        this.marker = new window.AMap.Marker({
          position: [pois[0].lng, pois[0].lat],
          visible: true
        })
        this._searchPosToPolymerizationMarker([pois[0].lng, pois[0].lat])
        this.map.setCenter([pois[0].lng, pois[0].lat])
        this.map.setZoom(15)
        this.map.add(this.marker)
      }
    },
    // 搜索区域的聚合
    _searchPosToPolymerizationMarker(pos) {
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
    },
    // 更新地图标记
    updateMapMarker(res) {
      this._resetMapMarker()
      this.curSelectMenu = res
      if (!res.active) {
        return
      }
      switch (res.name) {
        case '天网':
          this.isShowRightBlock = true
          this.skynetMarkerList.forEach(item => item.show())
          break
        case '地网':
          this.isShowRightBlock = true
          this.DHPointSimplifierIns ? this.DHPointSimplifierIns.show() : null
          break
        case '红色物业':
          this.markList.HSWYList.forEach(item => item.show())
          break
        case '红色驿站':
          this.markList.HSYZList.forEach(item => item.show())
          break
        case '法律援助组织':
          this.markList.lawList.forEach(item => item.show())
          break
        case '心防组织':
          this.setSCPsychologicalPolymerization()
          break
        case '红色网格':
          this.redGridMarkerList.forEach(item => item.show())
          break
      }

      // this._focusMap()
    },
    // 重置地图标记
    _resetMapMarker() {
      if (!this.curSelectMenu) {
        return
      }
      // 上一次点击的菜单操作还原
      switch (this.curSelectMenu.name) {
        case '天网':
          this.isShowRightBlock = false
          this.skynetMarkerList.forEach(item => item.hide())
          window.clusterer ? window.clusterer.setMarkers([]) : null
          break
        case '地网':
          this.isShowRightBlock = false
          this.DHPointSimplifierIns ? this.DHPointSimplifierIns.hide() : null
          break
        case '红色物业':
          this.markList.HSWYList.forEach(item => item.hide())
          break
        case '红色驿站':
          this.markList.HSYZList.forEach(item => item.hide())
          break
        case '法律援助组织':
          this.markList.lawList.forEach(item => item.hide())
          break
        case '心防组织':
          window.clusterer ? window.clusterer.setMarkers([]) : null
          break
        case '红色网格':
          this.redGridMarkerList.forEach(item => item.hide())
          window.clusterer ? window.clusterer.setMarkers([]) : null
          break
      }
    },
    // 绘制大华设备地图标记
    async queryCameraDHVideoList() {
      const { data } = await queryCameraList(1, 100, { type: 1 })
      const firstList = data.list.filter(
        item => item.longitude && item.latitude
      )
      this.DHVideoList.push(...firstList)
      const pageNum = Math.ceil(data.total / 100)
      let count = 0
      if (pageNum <= 1) {
        this.createDHVideoPoint()
        return
      }
      for (let i = 2; i <= pageNum; i++) {
        queryCameraList(i, 100, { type: 1 }).then(res => {
          count++
          const list = res.data.list.filter(
            item => item.longitude && item.latitude
          )
          this.DHVideoList = [...this.DHVideoList, ...list]
          if (count === pageNum - 1) {
            this.createDHVideoPoint()
          }
        })
      }
    },
    createDHVideoPoint() {
      const that = this
      window.AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], function(
        PointSimplifier,
        $
      ) {
        if (!PointSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }

        let groupStyleMap = null
        const DHPointSimplifierIns = new PointSimplifier({
          zIndex: 999,
          map: that.map,
          getPosition: function(item) {
            if (!item) {
              return null
            }
            return [item.longitude, item.latitude]
          },
          getHoverTitle: function(dataItem) {
            return dataItem.positionName
          },
          autoSetFitView: false,
          renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
          renderOptions: {
            // 点的样式
            pointStyle: {
              // 宽度
              width: 48,
              // 高度
              height: 60,
              // 定位点为底部中心
              offset: ['-50%', '-100%'],
              fillStyle: null,
              strokeStyle: null
            },
            getGroupId: function(item, idx) {
              return item.status
            },
            groupStyleOptions: function(gid) {
              return groupStyleMap[gid]
            },
            hoverTitleStyle: {
              classNames: 'hoverTitleStyle'
            }
          }
        })

        groupStyleMap = {
          // 0: {
          //   pointStyle: {
          //     // 绘制点占据的矩形区域
          //     content: PointSimplifier.Render.Canvas.getImageContent(
          //       require('@/assets/image/gridView/DH-video-marker-off-line.png'),
          //       function onload() {
          //         DHPointSimplifierIns.renderLater()
          //       },
          //       function onerror(e) {
          //         console.log('图片加载失败！')
          //       }
          //     ),
          //     // 宽度
          //     width: 48,
          //     // 高度
          //     height: 60,
          //     // 定位点为中心
          //     offset: ['-50%', '-50%'],
          //     fillStyle: null
          //   }
          // },
          1: {
            pointStyle: {
              // 绘制点占据的矩形区域
              content: PointSimplifier.Render.Canvas.getImageContent(
                require('@/assets/image/gridView/dw-1.png'),
                function onload() {
                  DHPointSimplifierIns.renderLater()
                },
                function onerror(e) {
                  console.log('图片加载失败！')
                }
              ),
              // 宽度
              width: 28,
              // 高度
              height: 26,
              // 定位点为中心
              offset: ['-50%', '-50%'],
              fillStyle: null
            }
          }
        }
        that.DHPointSimplifierIns = DHPointSimplifierIns
        that.DHPointSimplifierIns.setData(that.DHVideoList)
        that.DHPointSimplifierIns.hide()

        // 监听事件
        DHPointSimplifierIns.on('pointClick', function(e, record) {
          that.cameraModal.info = record.data
          that.cameraModal.visible = true
        })
      })
    },
    // 获取红色驿站
    getSCHsPost() {
      getSCHsPost().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.HSYZList = createMapMarkerList(
            this.map,
            data,
            function(item) {
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
              this.postModal.info = data
              this.postModal.visible = true
            }
          )
        }
      })
    },
    // 获取红色物业
    getSCHsProperty() {
      getSCHsProperty().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.HSWYList = createMapMarkerList(
            this.map,
            data,
            function(item) {
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
              this.postModal.info = data
              this.postModal.visible = true
            }
          )
        }
      })
    },

    // 获取法律援助
    selectSafetyLocation(locationType) {
      selectSafetyLocation({
        locationType: locationType
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.markList.lawList = createMapMarkerList(this.map, data, function(
            item
          ) {
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
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .skynet-point {
  .icon {
    background: url("~@/assets/image/gridView/shexiangtou.png") no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .redGrid-point {
  .icon {
    background: url("~@/assets/image/gridView/hswgg-1.png") no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .xfzzz-point {
  .icon {
    background: url("~@/assets/image/gridView/xfzzz-1.png") no-repeat;
    background-size: 100% 100%;
  }
}
.position-bg {
  display: flex;
  width: 387px;
  height: 43px;
  background: url("~@/assets/image/gridView/location-pos.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 20px;
  z-index: 100;
  top: 222px;
  .dd {
    line-height: 43px;
    font-size: 16px;
    padding: 0 20px;
    color: #82c2ff;
  }
  /deep/ .search-box {
    width: 252px;
    height: 36px;
    top: 3px;
    background-color: transparent;
    background-size: 100% 100%;
    z-index: 200 !important;
    border: 0;
    outline: 0;
    box-shadow: none;
    input {
      width: 100%;
      height: 100%;
      background-color: transparent !important;
      border: none;
      color: #a9daff;
    }
    .search-btn {
      display: none !important;
    }
    .search-tips {
      background: transparent;
      border: none;
      color: #b2d9fb;
    }
    .autocomplete-selected {
      background: #3b9afe !important;
    }
  }
}
//
</style>

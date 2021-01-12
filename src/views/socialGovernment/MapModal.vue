<template>
  <div
    class="map-modal-container"
    v-if="visible"
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.3)"
  >
    <div class="close" @click="close" />
    <SimpleMap @mapInit="mapInit" @zoomChange="zoomChange" class="map" />
    <ConflictModal
      :visible.sync="conflictmodalVisible"
      :modalValue.sync="conflictmodalValue"
    />
    <PostInfo :visible.sync="postVisible" :info="info" />
  </div>
</template>

<script>
import {
  getSCHsProperty,
  getSCHsPost,
  getquerySocialOrg,
  getqueryHFZX,
  getqueryZZZX,
  getQueryDQFWZX,
  queryFZWHGY,
  getFLFWData,
  getZHPAXQData,
  getLLZXData,
  getZJHDCSData,
  getJCMZXSData
} from '@/api/smartData/dataView'
import {
  getKeyPopulationGps,
  getKeyPopulationCountByRegion
} from '@/api/riskPrevention/importPeople'
import {
  queryGridThreeLine,
  queryRedGrid,
  queryCountRedGrid
} from '@/api/smartData/gridView'
import { queryConflictCenter } from '@/api/riskPrevention/conflict'
import ConflictModal from '@/views/riskPrevention/conflict/Modal'
import SimpleMap from '@/components/SimpleMap'
import PostInfo from './PostInfo'

import {
  createMapMarkerList,
  createPolymerizationMarker,
  createMassiveMakerList
} from '@/common/createMapMarker'

let massiveMakerList = [] // 存储待聚合的makers
let isPolymerization = false // 是否已经聚合
let firstPolymerizationArr = [] // 第一个聚合点
let toRegionMarkerList = [] // 按照区域划分markerList
let className = '' // 聚合的className
const personTypeEnum = {
  // 页面类型对应接口字段枚举
  mentalDisease: 3,
  petitionLetter: 4,
  released: 1,
  correct: 2
}
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
  components: {
    SimpleMap,
    PostInfo,
    ConflictModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: [String, Number],
      default: ''
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.postVisible = false
        this.conflictmodalVisible = false
      }
    }
  },
  data() {
    return {
      map: null,
      loading: false,
      postVisible: false,
      conflictmodalVisible: false,
      conflictmodalValue: '',
      info: {}
    }
  },
  beforeDestroy() {
    window.clusterer = null
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      toRegionMarkerList = []
      isPolymerization = false
    },
    mapInit(map) {
      this.map = map
      this.map.setZoom(10)
      this.selectMarketType()
    },
    zoomChange(zoom) {
      // 以下逻辑针对重点人群图标撒点
      if (
        !personTypeEnum.hasOwnProperty(this.type) &&
        this.type !== 'redWangge'
      ) {
        return
      }
      if (zoom >= 11 && !isPolymerization && toRegionMarkerList.length) {
        this.map.remove(toRegionMarkerList)
        isPolymerization = true
        createPolymerizationMarker(this.map, firstPolymerizationArr, {
          className: className,
          gridSize: 120,
          averageCenter: false
        })
        window.clusterer ? window.clusterer.setMarkers(massiveMakerList) : null
      }

      if (zoom <= 10) {
        window.clusterer ? window.clusterer.setMarkers([]) : null
        toRegionMarkerList.length ? this.map.add(toRegionMarkerList) : null
        isPolymerization = false
      }
    },
    selectMarketType() {
      if (personTypeEnum.hasOwnProperty(this.type)) {
        this.fetchAboutPersonList(personTypeEnum[this.type])
        return
      }

      switch (this.type) {
        case 'redPost':
          this.handleGetSCHsPost()
          break
        case 'redwuye':
          this.handleGetSCHsProperty()
          break
        case 'redWangge':
          this.handleGetSCHsGrid()
          break
        case 'socialOrganization':
          this.handleGetquerySocialOrg()
          break
        case 'treatmentCenter':
          this.handleGetqueryZZZX()
          break
        case 'groupService':
          this.handleGetQueryDQFWZX()
          break
        case 'socialCenter':
          this.getqueryHFZX()
          break
        case 'legalEducation':
          this.handleSelectSafetyLocation()
          break
        case 'publicLoyalService':
          this.getFLFWData()
          break
        case 'smartCommunity':
          this.getZHPAXQData()
          break
        case 'neiborCenter':
          this.getLLZXData()
          break
        case 'xqmtzx':
          this.handleQueryConflictCenter()
          break
        case 'religionManage':
          this.getZJHDCSData()
          break
        case 'consultativeDemocracy':
          this.getJCMZXSData()
          break
        default:
          break
      }
    },
    // 获取红色驿站撒点
    async handleGetSCHsPost() {
      try {
        const { status, data } = await getSCHsPost()
        if (status === 200) {
          createMapMarkerList(
            this.map,
            data,
            function(item) {
              return {
                icon: require('@/assets/image/gridView/hsyzz-1.png'),
                position: [item.jd, item.wd],
                title: item.hszzmc || '',
                extData: {
                  ...item,
                  name: item.hszzmc || '',
                  address: item.hszzdz,
                  img: item.zp
                },
                visible: true
              }
            },
            data => {
              this.info.name = data.name
              this.info.img = data.img
              this.info.address = data.address
              this.postVisible = true
            }
          )
        }
      } catch (error) {}
    },
    // 红色物业撒点
    async handleGetSCHsProperty() {
      try {
        const { status, data } = await getSCHsProperty()
        if (status === 200) {
          createMapMarkerList(
            this.map,
            data,
            function(item) {
              return {
                icon: require('@/assets/image/gridView/hswyy-1.png'),
                position: [item.hswyszjd, item.hswyszwd],
                title: item.hswymc || '',
                extData: {
                  ...item,
                  name: item.hswymc,
                  address: item.ysxhswydsq
                },
                visible: true
              }
            },
            data => {
              this.info.name = data.name
              this.info.img = data.img
              this.info.address = data.address
              this.postVisible = true
            }
          )
        }
      } catch (error) {}
    },

    // 获取社会组织
    async handleGetquerySocialOrg() {
      try {
        const { status, data } = await getquerySocialOrg()
        if (status === 200) {
          createMapMarkerList(
            this.map,
            data,
            function(item) {
              return {
                icon: require('@/assets/image/gridView/shzzz-1.png'),
                position: [item.hswyszjd, item.hswyszwd],
                title: item.hswymc || '',
                extData: {
                  ...item,
                  name: item.name,
                  img: item.photo,
                  address: item.addr
                },
                visible: true
              }
            },
            data => {
              this.info.name = data.name
              this.info.img = data.img
              this.info.address = data.address
              this.postVisible = true
            }
          )
        }
      } catch (error) {}
    },

    // 获取基层民主协商
    async getJCMZXSData() {
      try {
        const { status, data } = await getJCMZXSData()
        if (status === 200) {
          createMapMarkerList(
            this.map,
            data,
            function(item) {
              if (item.jd && item.wd) {
                return {
                  icon: require('@/assets/image/gridView/jcmzxs.png'),
                  position: [item.jd, item.wd],
                  title: item.mc || '',
                  extData: {
                    ...item,
                    name: item.mc,
                    address: item.dz,
                    img: item.wjm
                  },
                  visible: true
                }
              }
            },
            data => {
              this.info.name = data.mc
              this.info.img = data.wjm
              this.info.address = data.dz
              this.postVisible = true
            }
          )
        }
      } catch (error) {}
    },

    // 获取孵化中心
    async getqueryHFZX() {
      try {
        const { status, data } = await getqueryHFZX()
        if (status === 200) {
          createMapMarkerList(
            this.map,
            data,
            function(item) {
              return {
                icon: require('@/assets/image/gridView/fhhh-1.png'),
                position: [item.lon, item.lat],
                title: item.name || '',
                extData: {
                  ...item,
                  name: item.name,
                  img: item.photo,
                  address: item.addr
                },
                visible: true
              }
            },
            data => {
              this.info.name = data.name
              this.info.img = data.img
              this.info.address = data.address
              this.postVisible = true
            }
          )
        }
      } catch (error) {}
    },

    // 获取综治中心
    async handleGetqueryZZZX() {
      try {
        const { status, data } = await getqueryZZZX()
        if (status === 200) {
          createMapMarkerList(
            this.map,
            data,
            function(item) {
              return {
                icon: require('@/assets/image/gridView/health.png'),
                position: [item.lon, item.lat],
                title: item.name || '',
                extData: {
                  ...item,
                  name: item.name,
                  address: item.addr,
                  img: item.photo
                },
                visible: true
              }
            },
            data => {
              this.info.name = data.name
              this.info.img = data.img
              this.info.address = data.address
              this.postVisible = true
            }
          )
        }
      } catch (error) {}
    },

    // 获取宗教活动场所
    async getZJHDCSData() {
      this.loading = true
      try {
        getZJHDCSData().then(res => {
          this.loading = false
          const { status, data } = res
          if (status === 200) {
            createPolymerizationMarker(
              this.map,
              data,
              {
                className: 'religion-point',
                compatibleKeys: {
                  longitude: 'jd',
                  latitude: 'wd',
                  title: 'name'
                }
              },
              data => {
                this.info.name = data.name
                this.info.img = data.zp
                this.info.address = data.csdz
                this.postVisible = true
              }
            )
          }
        })
      } catch (error) {}
    },

    // 党群服务
    async handleGetQueryDQFWZX() {
      try {
        const { status, data } = await getQueryDQFWZX()
        if (status === 200) {
          createMapMarkerList(
            this.map,
            data,
            function(item) {
              return {
                icon: require('@/assets/image/gridView/dqfww-1.png'),
                position: [item.lon, item.lat],
                title: item.name || '',
                extData: {
                  ...item,
                  name: item.name,
                  address: item.addr,
                  img: item.photo
                },
                visible: true
              }
            },
            data => {
              this.info.name = data.name
              this.info.img = data.img
              this.info.address = data.bgdz
              this.postVisible = true
            }
          )
        }
      } catch (error) {}
    },

    // 获取法制宣传教育
    async handleSelectSafetyLocation() {
      const { status, data } = await queryFZWHGY()
      if (status === 200) {
        createMapMarkerList(
          this.map,
          data,
          function(item) {
            return {
              icon: require('@/assets/image/gridView/fzxcjy.png'),
              position: [item.jd, item.wd],
              title: item.safetyLocationName || '',
              extData: {
                ...item,
                name: item.mc,
                address: item.dz,
                img: item.tp
              },
              visible: true
            }
          },
          data => {
            this.info.name = data.mc
            this.info.img = data.tp
            this.info.address = data.dz
            this.postVisible = true
          }
        )
      }
    },

    // 获取公共法律服务
    async getFLFWData() {
      const { status, data } = await getFLFWData()
      if (status === 200) {
        createMapMarkerList(
          this.map,
          data,
          function(item) {
            return {
              icon: require('@/assets/image/gridView/ggflfw.png'),
              position: [item.jd, item.wd],
              title: item.bgdz || '',
              extData: {
                ...item,
                name: item.mc,
                address: item.bgdz,
                img: item.tp
              },
              visible: true
            }
          },
          data => {
            this.info.name = data.mc
            this.info.img = data.tp
            this.info.address = data.bgdz
            this.postVisible = true
          }
        )
      }
    },
    // 获取邻里中心
    async getLLZXData() {
      const { status, data } = await getLLZXData()
      if (status === 200) {
        createMapMarkerList(
          this.map,
          data,
          function(item) {
            return {
              icon: require('@/assets/image/gridView/llzx.png'),
              position: [item.jd, item.wd],
              title: item.yyysqllzxmc || '',
              extData: {
                ...item,
                name: item.yyysqllzxmc,
                address: item.xxdz
                // img: item.photoUrl
              },
              visible: true
            }
          },
          data => {
            this.info.name = data.yyysqllzxmc
            this.info.img = data.img
            this.info.address = data.xxdz
            this.postVisible = true
          }
        )
      }
    },
    // 获取智慧小区
    async getZHPAXQData() {
      const { status, data } = await getZHPAXQData()
      if (status === 200) {
        createMapMarkerList(
          this.map,
          data,
          function(item) {
            return {
              icon: require('@/assets/image/gridView/zhpaxq.png'),
              position: [item.jd, item.wd],
              title: item.xqmc || '',
              extData: {
                ...item,
                name: item.xqmc,
                address: item.szcsq
              },
              visible: true
            }
          },
          data => {
            this.info.name = data.xqmc
            this.info.img = data.img
            this.info.address = data.szcsq
            this.postVisible = true
          }
        )
      }
    },

    // 获取红色网格
    async handleGetSCHsGrid() {
      className = 'redGrid-point'
      this.renderGrid()
      const { data, status } = await queryCountRedGrid()
      if (status !== 200) {
        return
      } else {
        toRegionMarkerList = createMapMarkerList(this.map, data, item => {
          return {
            content: `<div class="massive-point ${className}"><i class="icon"></i><span class="num">${item.numVal}</span></div>`,
            position: [item.longitude, item.latitude],
            title: item.name || '',
            extData: item
          }
        })
      }

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
        firstPolymerizationArr = [res.flat()[0]]
        massiveMakerList = createMassiveMakerList(res.flat(), {
          className: className,
          compatibleKeys: {
            longitude: 'cenLon',
            latitude: 'cenLat',
            title: 'gridName'
          }
        })
      })
    },

    // 获取刑满释放人员，社区矫正人员，精神障碍人员，信访人员 聚合点
    fetchAboutPersonList(type) {
      className = this.type
      this.renderGrid()
      // 创建按照区域划分的markers列表
      getKeyPopulationCountByRegion({
        type: personTypeEnum[this.type]
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          toRegionMarkerList = createMapMarkerList(this.map, data, item => {
            return {
              content: `<div class="massive-point ${className}"><i class="icon"></i><span class="num">${item.count}</span></div>`,
              position: [item.longitude, item.latitude],
              title: item.gridName || '',
              extData: item
            }
          })
        }
      })
      // 初始化聚合对象
      getKeyPopulationGps({
        type
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          firstPolymerizationArr = [data[0]]
          massiveMakerList = createMassiveMakerList(data, {
            className: className
          })
        }
      })
    },

    // 获取矛调中心
    async handleQueryConflictCenter() {
      const { status, data } = await queryConflictCenter()
      if (status === 200) {
        createMapMarkerList(
          this.map,
          data,
          item => {
            if (item.name.indexOf('江西省南昌市医疗纠纷解调处中心') !== -1) {
              return {
                icon: require('@/assets/image/gridView/mdjf-2.png'),
                position: [item.lon, item.lat],
                extData: {
                  ...item,
                  name: `${item.name}(${item.addr})`,
                  needMarkClickFunc: true,
                  modalValue: 'https://67elemu5d.wasee.com/wt/67elemu5d'
                }
              }
            } else if (item.name.indexOf('青云谱区施尧村解忧铺子') !== -1) {
              return {
                icon: require('@/assets/image/gridView/mdjf-2.png'),
                position: [item.lon, item.lat],
                extData: {
                  ...item,
                  name: `${item.name}(${item.addr})`,
                  needMarkClickFunc: true,
                  modalValue: 'https://93d1f1ntx.wasee.com/wt/93d1f1ntx'
                }
              }
            } else if (item.name.indexOf('沙井街道沙井派出所') !== -1) {
              return {
                icon: require('@/assets/image/gridView/mdjf-2.png'),
                position: [item.lon, item.lat],
                extData: {
                  ...item,
                  name: `${item.name}(${item.addr})`,
                  needMarkClickFunc: true,
                  modalValue: 'https://93dxbvnvc.wasee.com/wt/93dxbvnvc'
                }
              }
            } else if (item.name.indexOf('青山湖法院') !== -1) {
              return {
                icon: require('@/assets/image/gridView/mdjf-2.png'),
                position: [item.lon, item.lat],
                extData: {
                  ...item,
                  needMarkClickFunc: true,
                  name: `${item.name}(${item.addr})`,
                  modalValue: 'https://93dfteo0i.wasee.com/wt/93dfteo0i'
                }
              }
            } else {
              return {
                icon: require('@/assets/image/gridView/chuizi.png'),
                position: [item.lon, item.lat],
                extData: {
                  ...item,
                  needMarkClickFunc: false,
                  name: `${item.name}(${item.addr})`
                }
              }
            }
          },
          data => {
            if (data.needMarkClickFunc) {
              this.conflictmodalVisible = true
              this.conflictmodalValue = data.modalValue
            }
          }
        )
      }
    },
    // 初始化图层
    async renderGrid() {
      let gridArr = []
      const polygons = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
      }

      gridArr.forEach((item, index) => {
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.3,
          fillColor: this._randomColor(),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName
          }
        })

        polygons.push(ploygon)
      })

      this.map.add(polygons)
      this.map.setFitView(polygons)
    },
    // 随机颜色
    _randomColor() {
      const colorArr = ['#3B9AFE', '#00FFFF', '#246BBB', '#0055FF', '#A9DAFF']
      return colorArr[Math.floor(Math.random() * colorArr.length)]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.mask-container {
  z-index: 2020;
}

.map-modal-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2001;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/image/socialGovernment/popup_bg.png") center center /
    100% 100% no-repeat;
}

.map {
  position: initial;
  margin-top: 20px;
  width: 93%;
  height: 93%;
}

.close {
  cursor: pointer;
  position: absolute;
  z-index: 2002;
  top: 25px;
  right: 25px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}

/deep/ .redGrid-point {
  .icon {
    background: url("~@/assets/image/gridView/hswgg-1.png") no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .religion-point {
  .icon {
    background: url("~@/assets/image/gridView/zjhd.png") no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .mentalDisease {
  .icon {
    background: url("~@/assets/image/importPeople/jingshen.png") no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .petitionLetter {
  .icon {
    background: url("~@/assets/image/importPeople/xinfang.png") no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .released {
  .icon {
    background: url("~@/assets/image/importPeople/xingshijiejie.png") no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .correct {
  .icon {
    background: url("~@/assets/image/importPeople/jiaozheng.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>

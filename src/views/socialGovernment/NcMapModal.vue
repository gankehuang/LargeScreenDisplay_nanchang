<template>
  <div
    v-if="visible"
    v-loading="loading"
    class="map-modal-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.3)"
  >
    <div
      class="close"
      @click="close"
    />
    <div
      v-if="sumList.length > 0"
      class="sumList"
    >
      <div
        v-for="(item, index) in sumList"
        :key="index"
        class="sum"
      >
        {{ item.name }}
        <span>
          {{ item.count }}
        </span>
      </div>
    </div>
    <SimpleMap
      class="map"
      @mapInit="mapInit"
    >
      <el-amap-info-window
        v-if="infoWindowData && select0ne.data"
        :auto-move="true"
        :show-shadow="true"
        :position="[infoWindowData.lng, infoWindowData.lat]"
        :events="infoWindowEvents"
        :is-custom="true"
        :offset="[160, 200]"
      >
        <div class="modal-content">
          <img
            class="close-btn"
            src="@/assets/image/KeyThrong/close.png"
            @click="
              infoWindowData = null
              select0ne.data = null
            "
          >
          <TwoCenterDialog
            v-if="typeNc === 'TwoCenterNcMap'"
            :select0ne="select0ne"
          />
          <GridDialog
            v-else-if="typeNc === 'GriddingNcMap'"
            :select0ne="select0ne"
          />
          <NcDialog
            v-else
            :select0ne="select0ne"
          />
        </div>
      </el-amap-info-window>
    </SimpleMap>
  </div>
</template>

<script>
import {
  queryGridThreeLine,
  queryQFQZ,
  queryZFDWJS,
  getQYZHGKData,
  queryLSYTLZX,
  queryGridDetailInfo
} from '@/api/smartData/gridView'
import {
  getJYYWData,
  getSFZRZData,
  queryXSDWMCJZ
} from '@/api/smartData/dataView'
import NcDialog from './amapInfoWindowContent/NcDialog'
import TwoCenterDialog from './amapInfoWindowContent/TwoCenterDialog'
import GridDialog from './amapInfoWindowContent/GridDialog'
const GroupDefenseNcMapObj = [
  ['qfqzrs', '人数', '人'],
  ['qfqzdws', '队伍数', '个']
]

const TeamBuildingNcMapObj = [
  ['fy', '法院', '人'],
  ['jcy', '检察院', '人'],
  ['sgaj', '公安局', '人'],
  ['sfj', '司法局', '人']
]

const SafeServiceNcMapObj = [
  ['zcs', '总人数', '人'],
  ['dws', '队伍数', '个'],
  ['hdzs', '开展活动数', '个']
]

const jyywNcMapObj = [
  ['qgbz', '全国表彰', '人'],
  ['sjbz', '省级表彰', '人'],
  ['shijbz', '市级表彰', '人'],
  ['xqjbz', '县（区）级表彰', '人']
]

const xsdwmcjzNcMapObj = [
  ['xsl', '实践中心', '个'],
  ['xiangsl', '实践所', '个'],
  ['csl', '实践站', '个']
]

const sfzrzggNcMapObj = [
  ['yefg', '员额法官', '人'],
  ['jctd', '检察团队', '个'],
  ['nsjg', '检察内设机构', '个'],
  ['jcfzry', '检察辅助人员', '人'],
  ['yejcg', '员额检察官', '人'],
  ['sptd', '审判团队', '个'],
  ['nsjg1', '法院内设机构', '个'],
  ['fgzl', '法官助理', '人']
]

const TwoCenterNcMapObj = [
  ['sfsl', '提升改造数量', '所'],
  ['sfzj', '提升改造资金', '元'],
  ['pcssl', '提升改造数量', '所'],
  ['pcszj', '提升改造资金', '元'],
  ['ftsl', '提升改造数量', '所'],
  ['ftzj', '提升改造资金', '元'],
  ['xzxfsl', '提升改造数量', '所'],
  ['xzxfzj', '提升改造资金', '元'],
  ['xzzzzxsl', '提升改造数量', '所'],
  ['xzzzzxzj', '提升改造资金', '元'],
  ['jtsl', '提升改造数量', '所'],
  ['jtzj', '提升改造资金', '元']
]

export default {
  components: {
    NcDialog,
    TwoCenterDialog,
    GridDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    typeNc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      map: null,
      textList: [],
      dataList: [],
      infoWindowData: null,
      infoWindowEvents: {
        close: () => {
          this.infoWindowData = null
          this.sumList = []
        }
      },
      select0ne: {
        data: null,
        name: '',
        type: ''
      },
      lat: null,
      lng: null,
      dialogVisable: false,
      sumList: []
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.infoWindowData = null
        this.sumList = []
      }
    }
  },
  mounted () {},
  methods: {
    async mapInit (map) {
      this.map = map
      await this.renderGrid()
      this.map.setCenter([116.026842, 28.688883])
      this.map.setZoom(9)
      this.getList()
    },
    // 绘制地图 初始化图层
    async renderGrid () {
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
          fillOpacity: 0.6,
          fillColor: this.randomColor(),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          cursor: 'pointer',
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName,
            total: item.total
          }
        })
        // 点击区县切换分数排名、详情
        ploygon.on(
          'click',
          ({
            lnglat: { lat, lng },
            target: {
              w: { extData }
            }
          }) => {
            this.changeData(extData, lat, lng)
          }
        )
        polygons.push(ploygon)
        // 悬浮色块出现分数和名称
        ploygon.on(
          'mouseover',
          ({
            target: {
              w: { extData }
            }
          }) => {
            this.handleAmapText(extData.code)
          }
        )
        ploygon.on(
          'mouseout',
          ({
            target: {
              w: { extData }
            }
          }) => {
            this.handleAmapText(undefined)
          }
        )
        // 绘制县区名称和分数
        if (item.gridLevel === 3) {
          let position = []
          if (item.gridName === '青云谱区') {
            position = [115.919124, 28.626145]
          } else if (item.gridName === '红谷滩区') {
            position = [115.772439, 28.605425]
          } else if (item.gridName === '青山湖区') {
            position = [115.980493, 28.639178]
          } else if (item.gridName === '新建区') {
            position = [116.011049, 28.979415]
          } else if (item.gridName === '经开区') {
            position = [115.87166, 28.768364]
          } else if (item.gridName === '东湖区') {
            position = [115.908738, 28.733148]
          }

          const text = new window.AMap.Text({
            text: item.gridName,
            anchor: 'center', // 设置文本标记锚点
            // cursor: 'pointer',
            style: {
              'font-size': '24px',
              'text-align': 'center',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            extData: {
              code: item.gridCode,
              path: item.gridPath,
              gridLevel: item.gridLevel,
              name: item.gridName,
              total: item.total
            },
            visible: false,
            position: position.length ? position : [item.cenLon, item.cenLat]
          })
          // 点击区县切换分数排名、详情
          text.on(
            'click',
            ({
              lnglat: { lat, lng },
              target: {
                w: { extData }
              }
            }) => {
              this.changeData(extData, lat, lng)
            }
          )
          // 悬浮色块出现分数和名称
          text.on(
            'mouseover',
            ({
              target: {
                w: { extData }
              }
            }) => {
              this.handleAmapText(extData.code)
            }
          )
          text.on(
            'mouseout',
            ({
              target: {
                w: { extData }
              }
            }) => {
              this.handleAmapText(undefined)
            }
          )
          this.textList.push(text)
        }
      })
      this.map.add(polygons)
      this.map.add(this.textList)
    },

    async getList () {
      switch (this.typeNc) {
        case 'GroupDefenseNcMap': {
          const { status, data } = await queryQFQZ()
          if (status === 200) {
            this.dataList = data
            this.sumList = [
              {
                name: '总人数',
                count: '25211人'
              },
              {
                name: '队伍总数',
                count: '2704个'
              }
            ]
          }
          break
        }

        case 'TeamBuildingNcMap': {
          const { status, data } = await queryZFDWJS()
          if (status === 200) {
            this.dataList = data
            this.sumList = [
              {
                name: '法院',
                count: '1044人'
              },
              {
                name: '检察院',
                count: '523人'
              },
              {
                name: '公安局',
                count: '9846人'
              },
              {
                name: '司法局',
                count: '639人'
              }
            ]
          }
          break
        }
        case 'SafeServiceNcMap': {
          const { status, data } = await getQYZHGKData()
          if (status === 200) {
            this.dataList = data
            const sum = data.find(item => item.mc === '总计')
            this.sumList = [
              {
                name: '志愿者总数',
                count: sum.zcs + '人'
              },
              {
                name: '队伍总数',
                count: sum.dws + '个'
              },
              {
                name: '活动总数',
                count: sum.hdzs + '个'
              }
            ]
          }
          break
        }
        case 'jyywNcMap': {
          const { status, data } = await getJYYWData()
          if (status === 200) {
            // debugger
            this.dataList = data
            this.sumList = [
              {
                name: '全国表彰',
                count: '6人'
              },
              {
                name: '省级表彰',
                count: '6人'
              },
              {
                name: '市级表彰',
                count: '7人'
              },
              {
                name: '县（区）级表彰',
                count: '224人'
              }
            ]
          }
          break
        }
        case 'xsdwmcjzNcMap': {
          const { status, data } = await queryXSDWMCJZ()
          if (status === 200) {
            // debugger
            this.dataList = data
            this.sumList = [
              {
                name: '实践中心',
                count: '12个'
              },
              {
                name: '实践所',
                count: '123个'
              },
              {
                name: '实践站',
                count: '1753个'
              }
            ]
          }
          break
        }
        case 'sfzrzggNcMap': {
          const { status, data } = await getSFZRZData()
          if (status === 200) {
            console.log(data)
            this.dataList = data
            this.sumList = [
              {
                name: '员额检察官',
                count: '41人'
              },
              {
                name: '检察辅助人员',
                count: '43人'
              },
              {
                name: '检察内设机构',
                count: '17个'
              },
              {
                name: '检察团队',
                count: '54个'
              },
              {
                name: '员额法官',
                count: '86人'
              },
              {
                name: '法官助理',
                count: '10人'
              },
              {
                name: '法院内设机构',
                count: '13个'
              },
              {
                name: '审判团队',
                count: '13个'
              }
            ]
          }
          break
        }

        case 'TwoCenterNcMap': {
          const { status, data } = await queryLSYTLZX()
          if (status === 200) {
            this.dataList = data
            this.sumList = [
              {
                name: '提升改造数量',
                count: '145个'
              },
              {
                name: '提升改造资金',
                count: '4915万元'
              }
            ]
          }

          break
        }
        case 'GriddingNcMap': {
          this.sumList = [
            {
              name: '网格员',
              count: '9066人'
            },
            {
              name: '网格数',
              count: '8729个'
            },
            {
              name: '网格融入',
              count: '2693人'
            }
          ]
        }
      }
    },
    // 随机颜色
    randomColor () {
      const colorArr = ['#3B9AFE', '#00FFFF', '#246BBB', '#0055FF', '#A9DAFF']
      return colorArr[Math.floor(Math.random() * colorArr.length)]
    },
    close () {
      this.$emit('update:visible', false)
      this.markerList = []
    },
    changeData (data, lat, lng) {
      switch (this.typeNc) {
        case 'GroupDefenseNcMap':
          this.handleBackendData('xq', data, GroupDefenseNcMapObj, '群防群治')
          break
        case 'TeamBuildingNcMap':
          this.handleBackendData(
            'xt',
            data,
            TeamBuildingNcMapObj,
            '政法队伍建设'
          )
          break
        case 'SafeServiceNcMap':
          console.log('12412441414141')
          this.handleBackendData('mc', data, SafeServiceNcMapObj, '平安志愿者')
          break
        case 'jyywNcMap':
          this.handleBackendData('xq', data, jyywNcMapObj, '见义勇为')
          break
        case 'xsdwmcjzNcMap':
          this.handleBackendData(
            'szx',
            data,
            xsdwmcjzNcMapObj,
            '新时代文明促进站'
          )
          break
        case 'sfzrzggNcMap':
          this.handleBackendData('dw', data, sfzrzggNcMapObj, '司法体制改革')
          break
        case 'TwoCenterNcMap':
          this.handleBackendData(
            'xq',
            data,
            TwoCenterNcMapObj,
            '两所一庭二中心'
          )
          break

        case 'GriddingNcMap':
          this.loading = true
          queryGridDetailInfo({
            gridCode: data.code
          }).then(res => {
            this.loading = false
            if (res.status === 200) {
              this.select0ne.name = data.name
              this.select0ne.type = '网格化管理'
              this.select0ne.data = {
                grid: res.data.grid,
                gridFuse: res.data.gridFuse
              }
            }
          })
          break
      }
      this.infoWindowData = { lng, lat }
    },
    // 处理返回后台返回数据
    handleBackendData (compatibleName, data, modalKeysObj, title, sum) {
      this.select0ne.data = []
      const curItem = this.dataList.find(item => {
        if (item[compatibleName].indexOf('湾里') > -1) {
          item[compatibleName] = '湾里管理局'
        }
        if (item[compatibleName].indexOf('红谷滩') > -1) {
          item[compatibleName] = '红谷滩区'
        }
        if (
          item[compatibleName].indexOf('经开') > -1 ||
          item[compatibleName].indexOf('经济') > -1
        ) {
          item[compatibleName] = '经开区'
        }
        if (item[compatibleName].indexOf('高新') > -1) {
          item[compatibleName] = '经开区'
        }
        return item[compatibleName] === data.name
      })

      if (curItem) {
        this.select0ne.name = data.name
        this.select0ne.type = title
        // for (const key in modalKeysObj) {
        //   this.select0ne.data.push({
        //     name: modalKeysObj[key],
        //     value: curItem[key] || '-'
        //   })
        // }
        modalKeysObj.forEach(item => {
          this.select0ne.data.push({
            value: curItem[item[0]] || '-',
            name: item[1],
            unit: item[2]
          })
        })
        this.dialogVisable = true
      }
    },
    // 悬浮处理
    handleAmapText (flag) {
      if (!flag) {
        this.textList.forEach(item => {
          item.hide()
        })
      } else {
        this.textList.forEach(item => {
          if (flag === item.w.extData.code) {
            item.show()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.map {
  position: initial;
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
  background: url('~@/assets/image/socialGovernment/popup_bg.png') center center /
    100% 100% no-repeat;
}
.map {
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
  background: url('~@/assets/image/dataView/pop-modal-close.png') center center /
    100% 100% no-repeat;
}
/deep/ .redGrid-point {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    display: inline-block;
    width: 28px;
    height: 26px;
    background: url('~@/assets/image/gridView/hswgg-1.png') no-repeat;
  }
  .num {
    color: #a9daff;
  }
}

.modal-content {
  position: relative;
  // top: 200px;
  // left: 150px;
  width: 327px !important;
  height: 395px !important;
  padding: 10px 20px;
  background: url('~@/assets/image/dataView/ncMap-modal-bg.png') no-repeat 100%
    100%;
  background-size: 100% 100%;
  display: flex;
  .close-btn {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
}
.sumList {
  position: absolute;
  top: 10%;
  left: 45px;
  z-index: 9999;
  .sum {
    margin-bottom: 15px;
    width: 184px;
    height: 27px;
    line-height: 27px;
    padding-left: 18px;
    line-height: 27px;
    font-size: 16px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    background: url('~@/assets/image/socialGovernment/sum-count-bg.png')
      no-repeat left top;
    background-size: 136px 27px;
    span {
      font-weight: bold;
    }
  }
}
</style>

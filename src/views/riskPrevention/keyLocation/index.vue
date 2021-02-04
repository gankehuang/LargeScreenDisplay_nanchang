<template>
  <div class="page-container">
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="3"
    />

    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-if="eventInfo"
        :vid="eventInfo.id"
        :position="[eventInfo.longitude, eventInfo.latitude]"
        :offset="[-27, -40]"
        :top-when-click="true"
      >
        <div
          v-if="eventInfo.typeText === '政治安全'"
          class="zz-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="zz-twinkle" />
        </div>

        <div
          v-if="eventInfo.typeText === '社会治安'"
          class="sh-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="sh-twinkle" />
        </div>

        <div
          v-if="eventInfo.typeText === '矛盾纠纷'"
          class="md-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="md-twinkle" />
        </div>

        <div
          v-if="eventInfo.typeText === '公共安全'"
          class="gg-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="gg-twinkle" />
        </div>

        <div
          v-if="eventInfo.typeText === '网络安全'"
          class="wl-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="wl-twinkle" />
        </div>
      </el-amap-marker>
    </SimpleMap>

    <locationType @focusKeyAreas="focusKeyAreas" />

    <div class="search-btn">
      <el-input
        v-model="searchItem"
        placeholder="请输入"
        @change="toSearch"
      />
      <div
        class="searchIcon"
        @click="toSearch"
      />
    </div>
    <div
      v-if="ifHuaduo"
      class="hdhw"
      @click="toHuaduo"
    />

    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <div class="page-left">
        <component
          :is="leftOne"
          v-if="update"
          :client-details="clientDetails"
        />
        <timeVideo :video-list="videoList" />
      </div>
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <div class="page-right">
        <component :is="rightOne" />
        <component :is="rightTwo" />
        <EventInfo
          :event-all-list="eventList"
          :is-gas="isGas"
          @focusEvent="focusEvent"
          @detailsEvent="detailsEvent"
        />
      </div>
    </transition>

    <!--事件详情弹框-->
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="modal = ''"
    />

    <!--事件指派或上报弹框-->
    <EventCirculationModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      @onDealModal="onDealModal"
      @bindBtnClose="modal = 'event'"
    />

    <!--事件处置弹框-->
    <EventHandleModal
      v-if="modal === 'deal'"
      :event-id="needEventId"
      :grid-code="gridCode"
      @onShowToast="onShowToast"
      @closeModal="modal = 'event'"
    />

    <!--事件具体详情弹框-->
    <EventDetailModal
      :visible.sync="eventDetailModal.visible"
      :info="eventDetailModal.info"
      @update:visible="modal = 'event'"
    />
  </div>
</template>
<script>
import commonMixin from '../commonMixin'
import eventMixin from './evenModule/eventMixin'

import EventInfo from './EventInfo'
import locationType from './locationType'
import TimeVideo from './TimeVideo'
import leftOneSchool from './leftOne/school'
import leftOneHospital from './leftOne/hospital'
import leftOneGasStation from './leftOne/gasStation'
import leftOneconstructionSite from './leftOne/constructionSite'
import leftOneRiverCrossingBridge from './leftOne/riverCrossingBridge'
import rightOneSchool from './rightOne/school'
import rightOneHospital from './rightOne/hospital'
import rightOneGasStation from './rightOne/gasStation'
import rightOneconstructionSite from './rightOne/constructionSite'
import rightOneRiverCrossingBridge from './rightOne/riverCrossingBridge'
import rightTwoSchool from './rightTwo/school'
import rightTwoHospital from './rightTwo/hospital'
import rightTwoGasStation from './rightTwo/gasStation'
import rightTwoconstructionSite from './rightTwo/constructionSite'
import rightTwoRiverCrossingBridge from './rightTwo/riverCrossingBridge'

import { getKeySafetyLocationList } from '@/api/riskPrevention/KeyThrong'
export default {
  components: {
    locationType,
    TimeVideo,
    leftOneSchool,
    leftOneHospital,
    leftOneGasStation,
    leftOneconstructionSite,
    leftOneRiverCrossingBridge,
    rightOneSchool,
    rightOneHospital,
    rightOneGasStation,
    rightOneconstructionSite,
    rightOneRiverCrossingBridge,
    rightTwoSchool,
    rightTwoHospital,
    rightTwoGasStation,
    rightTwoconstructionSite,
    rightTwoRiverCrossingBridge,
    EventInfo
  },
  mixins: [commonMixin, eventMixin],
  data () {
    return {
      ifHuaduo: true, // 或多护卫
      isType: '全部',
      map: null,
      markList: {
        schoolList: [],
        hospitalList: [],
        gasStationList: [],
        constructionSiteList: [],
        riverCrossingBridgeList: [],
        searchList: []
      },
      isMark: 'school',
      isMarhList: [],
      leftOne: 'leftOneSchool',
      rightOne: 'rightOneSchool',
      rightTwo: 'rightTwoSchool',
      videoList: [
        '36015601001310610579',
        '36015601001320000413',
        '36015603001320000947',
        '36015603001320000289',
        '36015601001310898416',
        '36015604001320000762'
      ],
      clientDetails: null,
      update: true,
      searchItem: ''
    }
  },
  methods: {
    // 跳转到护卫花朵
    toHuaduo () {
      window.open('http://172.118.210.201:9020/hdhw', '_blank')
    },
    mapInit (map) {
      this.map = map
      this.map.setCenter([115.880886, 28.676192])
      this.map.setZoom(14)
      this.getKeySafetyLocationList()
    },
    // 聚焦地图中心点
    _focusMap (pos, zoom) {
      this.map.setCenter(pos)
      this.map.setZoom(zoom)
    },
    // 搜索框
    toSearch () {
      this.markList.searchList = []
      this.markList.searchList.push(
        ...this.isMarhList.filter(item =>
          item.w.extData.name
            ? item.w.extData.name.indexOf(this.searchItem) > -1
            : false
        )
      )
      for (const key in this.markList) {
        key === 'searchList'
          ? this.markList[key].forEach((item, index) => {
            item.show()
            if (index === 0) {
              this._focusMap(
                [item.w.extData.longitude, [item.w.extData.latitude]],
                12
              )
            }
          })
          : this.markList[key].forEach(item => item.hide())
      }
    },
    conreload () {
      // 移除组件
      this.update = false
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true
      })
    },
    // 聚焦当前类型地图标记点
    focusKeyAreas (curItem) {
      this._resetMapMarker()
      this.markList[curItem.icon + 'List'].forEach(item => item.show())
      switch (curItem.icon) {
        case 'school':
          this.isGas = false // 是否是加油站
          this.ifHuaduo = true
          this.getAllEventList()
          this._handleFocusResult(
            [
              '36015601001310610579',
              '36015601001320000413',
              '36015603001320000947',
              '36015603001320000289',
              '36015601001310898416',
              '36015604001320000762'
            ],
            leftOneSchool,
            rightOneSchool,
            rightTwoSchool,
            this.markList.schoolList.length,
            'schoolList',
            [115.880886, 28.676192],
            14
          )
          break

        case 'hospital':
          this.ifHuaduo = false
          this.isGas = false
          this.getAllEventList()
          this._handleFocusResult(
            [
              '36015602001310354750',
              '36015603001320000205',
              '36015603001320000003',
              '36015601001320000203',
              '36018802031320024414',
              '36010206001320000132'
            ],
            leftOneHospital,
            rightOneHospital,
            rightTwoHospital,
            this.markList.hospitalList.length,
            'hospitalList',
            [115.91098, 28.668247],
            15
          )
          break

        case 'gasStation':
          this.ifHuaduo = false
          this.isGas = true
          this.getAllEventList()
          this._handleFocusResult(
            [
              '36015601001310180624',
              '36015601001320000280',
              '36015603001320000123',
              '36015602001320000669',
              '36015603001320000124',
              '36015602001310181692'
            ],
            leftOneGasStation,
            rightOneGasStation,
            rightTwoGasStation,
            this.markList.gasStationList.length,
            'gasStationList',
            [115.909993, 28.666534],
            13
          )
          break

        case 'constructionSite':
          this.ifHuaduo = false
          this.isGas = false
          this.getAllEventList()
          this._handleFocusResult(
            [
              '36015606001310763553',
              '36015606001320000409',
              '36015606001320000411',
              '36015601001320000751',
              '36015601001320000042',
              '36015601001320000007'
            ],
            leftOneconstructionSite,
            rightOneconstructionSite,
            rightTwoconstructionSite,
            this.markList.constructionSiteList.length,
            'constructionSiteList',
            [115.915915, 28.676173],
            14
          )
          break

        case 'riverCrossingBridge':
          this.ifHuaduo = false
          this.isGas = false
          this.getAllEventList()
          this._handleFocusResult(
            [
              '36015603001310829479',
              '36015603001320000973',
              '36015603001320000846',
              '36015603001320000797',
              '36015601001320000770',
              '36015603001320000591'
            ],
            leftOneRiverCrossingBridge,
            rightOneRiverCrossingBridge,
            rightTwoRiverCrossingBridge,
            this.markList.riverCrossingBridgeList.length,
            'riverCrossingBridgeList',
            [115.874201, 28.682912],
            13
          )
          break
      }

      curItem.icon === 'gasStation'
        ? this.getAllEventList({
          eventCodeList: 'gas_station_smoke_call,gas_station_fire'
        })
        : this.getAllEventList({})
    },
    _handleFocusResult (
      videoList,
      leftOne,
      rightOne,
      rightTwo,
      clientDetails,
      isMarhList,
      pos,
      zoom
    ) {
      this.videoList = videoList
      this.leftOne = leftOne
      this.rightOne = rightOne
      this.rightTwo = rightTwo
      this.clientDetails = clientDetails
      this.conreload()
      this.isMarhList = this.markList[isMarhList]
      this._focusMap(pos, zoom)
    },
    // 重置隐藏地图标记点
    _resetMapMarker () {
      this.eventInfo = null
      for (const markListKey in this.markList) {
        if (markListKey !== 'searchList') {
          this.markList[markListKey].forEach(item => item.hide())
        }
      }
    },
    createMarker (icon, pos, types, item) {
      const marker = new window.AMap.Marker({
        icon: icon,
        position: pos,
        offset: new window.AMap.Pixel(-13, -30),
        extData: item,
        visible: false
      })
      marker.on('click', event => {})
      if (types === 'gjdqList') {
        marker.setLabel({
          offset: new window.AMap.Pixel(20, -10), // 设置文本标注偏移量
          content: `<div style="background: rgba(0, 255, 255, 1) !important; color: #051122 !important;">${item.name ||
            item.vehicleNumber ||
            item.personName ||
            item.deviceName ||
            item.safetyLocationName ||
            item.produceUnitName}</div>`, // 设置文本标注内容
          direction: 'right' // 设置文本标注方位
        })
      } else {
        marker.on('mousemove', event => {
          marker.setLabel({
            offset: new window.AMap.Pixel(20, -10), // 设置文本标注偏移量
            content: `<div style="background: rgba(0, 255, 255, 1) !important; color: #051122 !important;">${item.name ||
              item.vehicleNumber ||
              item.personName ||
              item.deviceName ||
              item.safetyLocationName ||
              item.produceUnitName}</div>`, // 设置文本标注内容
            direction: 'right' // 设置文本标注方位
          })
        })
        marker.on('mouseout', event => {
          marker.setLabel()
        })
      }
      return marker
    },
    // 重置删除地图标记点
    _removeMapMarker () {
      if (this.map) {
        for (const markListKey in this.markList) {
          if (markListKey !== 'searchList') {
            this.map.remove(this.markList[markListKey])
            this.markList[markListKey] = []
          }
        }
      }
    },
    // 查询类型点列表
    getKeySafetyLocationList () {
      this._removeMapMarker()
      getKeySafetyLocationList().then(res => {
        if (res.status === 200) {
          const list = res.data
          for (const key in list) {
            switch (key) {
              case 'xxList':
                list[key].forEach(item => {
                  this.markList.schoolList.push(
                    this.createMarker(
                      require('@/assets/image/keyLocation/xuexiao-1.png'),
                      [item.longitude, item.latitude],
                      'xxList',
                      { ...item }
                    )
                  )
                })

                this.map.add(this.markList.schoolList)
                break
              case 'yyList':
                list[key].forEach(item => {
                  this.markList.hospitalList.push(
                    this.createMarker(
                      require('@/assets/image/keyLocation/yiyuan-1.png'),
                      [item.longitude, item.latitude],
                      'yyList',
                      { ...item }
                    )
                  )
                })
                this.map.add(this.markList.hospitalList)
                break

              case 'jyzList':
                list[key].forEach(item => {
                  this.markList.gasStationList.push(
                    this.createMarker(
                      require('@/assets/image/keyLocation/jiayouzhan-1.png'),
                      [item.longitude, item.latitude],
                      'jyzList',
                      { ...item }
                    )
                  )
                })
                this.map.add(this.markList.gasStationList)
                break

              case 'jzgdList':
                list[key].forEach(item => {
                  this.markList.constructionSiteList.push(
                    this.createMarker(
                      require('@/assets/image/keyLocation/jianzhugongdi-1.png'),
                      [item.longitude, item.latitude],
                      'jzgdList',
                      { ...item }
                    )
                  )
                })
                this.map.add(this.markList.constructionSiteList)
                break

              case 'gjdqList':
                list[key].forEach(item => {
                  this.markList.riverCrossingBridgeList.push(
                    this.createMarker(
                      require('@/assets/image/keyLocation/guojiangdaqiao-1.png'),
                      [item.longitude, item.latitude],
                      'gjdqList',
                      { ...item }
                    )
                  )
                })
                this.map.add(this.markList.riverCrossingBridgeList)
                break
            }
          }

          this.markList.schoolList.forEach(item => item.show())
          this.isMarhList = this.markList.schoolList
          this.clientDetails = this.markList.schoolList.length
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hdhw {
  position: absolute;
  width: 50px;
  height: 50px;
  background: url("~@/assets/image/keyLocation/huaicon.png");
  background-size: 100% 100%;
  bottom: 75px;
  right: 465px;
}
/deep/.search-btn {
  position: absolute;
  width: 252px;
  height: 36px;
  background: url("~@/assets/image/common/组 106.png");
  background-size: 100% 100%;
  top: 150px;
  left: 450px;
  display: inline-flex;
  .el-input {
    width: calc(100% - 30px);
    height: 36px;
  }
  .el-input__inner {
    height: 36px;
    display: inline-block;
    border: none;
    &::placeholder {
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: #2971c2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }
  }
  .searchIcon {
    width: 18px;
    height: 36px;
    background: url("~@/assets/image/common/搜索 (1).png") no-repeat;
    background-position: 0 8px;
  }
}
/deep/ .select-container {
  left: 29%;
  top: 80px;
}
/deep/ .map-reset {
  right: 30px !important;
}
/deep/ .map-zoom {
  right: 30px !important;
}
/deep/ .amap-marker-label {
  background: rgba(0, 255, 255, 1);
  opacity: 0.9;
  border-radius: 6px;
  padding: 3px 5px;
  border: 1px solid rgba(0, 0, 0, 0.51);
}

/deep/ .hoverTitleStyle {
  height: 25px;
  background: rgba(0, 255, 255, 1) !important;
  color: #051122 !important;
  display: block;
}

.main {
  .left {
    z-index: 99;
  }
}

.twinkle {
  animation-name: flash;
  animation-duration: 5s;
}

@keyframes flash {
  0%,
  25%,
  100%,
  75%,
  50% {
    opacity: 1;
  }

  37.5%,
  12.5%,
  62.5%,
  87.5% {
    opacity: 0;
  }
}
.amap-icon {
  img {
    width: 26px;
    height: 26px;
  }
}
</style>

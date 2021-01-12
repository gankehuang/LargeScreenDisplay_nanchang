<template>
  <div class="page-container">
    <Tabs :tab-list="tabList" width="600px" :cur-index="3" />
    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-if="eventInfo"
        :vid="eventInfo.id"
        :position="[eventInfo.longitude, eventInfo.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div
          v-if="eventInfo.typeText === '政治安全'"
          class="zz-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="zz-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '社会治安'"
          class="sh-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="sh-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '矛盾纠纷'"
          class="md-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="md-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '公共安全'"
          class="gg-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="gg-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '网络安全'"
          class="wl-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventInfo.typeText }}</p>
          <div class="wl-twinkle"></div>
        </div>
      </el-amap-marker>

      <EarlyWarningModal
        :visible.sync="earlyWarningModal.visible"
        :info="earlyWarningModal.info"
        @update:visible="modal = 'event'"
      />
    </SimpleMap>

    <throngType @focusKeyAreas="focusKeyAreas"></throngType>

    <div class="btns">
      <button
        v-for="(item, index) in btnlist"
        :key="index"
        :class="{ active: item.ifShow }"
        @click="showCircle(index)"
      >
        {{ item.title }}
      </button>
    </div>

    <transition name="ani-left" mode="out-in" appear>
      <div class="page-left">
        <component :is="leftOne"></component>
        <timeVideo :isType="isType" />
      </div>
    </transition>
    <transition name="ani-right" mode="out-in" appear>
      <div class="page-right">
        <component :is="rightOne"></component>
        <component :is="rightTwo"></component>
        <EventInfo :eventAllList="eventList" @focusEvent="focusEvent"  @detailsEvent="detailsEvent"/>
      </div>
    </transition>

    <CameraModal :visible.sync="cameraModal.visible" :info="cameraModal.info" />

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
      :grid-code="gridCode"
      @onDealModal="onDealModal"
      @bindBtnClose="modal = 'event'"
    />

    <!--事件处置弹框-->
    <EventHandleModal
      v-if="modal === 'deal'"
      :event-id="needEventId"
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
import SimpleMap from '@/components/SimpleMap'
import CameraModal from './CameraModal'
import EventInfo from './EventInfo'
import TimeVideo from './TimeVideo'
import throngType from './throngType'
import leftOneSxz from './leftOne/sxz'
import leftOneShixz from './leftOne/shixz'
import leftOneBygc from './leftOne/bygc'
import leftOneQsgc from './leftOne/qsgc'
import rightOneSxz from './rightOne/sxz'
import rightOneShixz from './rightOne/shixz'
import rightOneBygc from './rightOne/bygc'
import rightOneQsgc from './rightOne/qsgc'
import rightTwoSxz from './rightTwo/sxz'
import rightTwoShixz from './rightTwo/shixz'
import rightTwoBygc from './rightTwo/bygc'
import rightTwoQsgc from './rightTwo/qsgc'
import commonMixin from '../commonMixin'
import eventByLocationMixin from './evenModule/eventByLocationMixin'
import { queryCameraBySafeLocationId } from '@/api/riskPrevention/KeyThrong'
import {
  square,
  square1,
  square2,
  administration,
  administration1,
  administration2,
  qiushui,
  qiushui1,
  qiushui2,
  province,
  province1,
  province2
} from './mock'
import {
  sxzTwo,
  sxzThree,
  shixzTwo,
  shixzThree,
  bygcTwo,
  bygcThree,
  qsgcTwo,
  qsgcThree
} from './videomMock'
export default {
  mixins: [commonMixin, eventByLocationMixin],
  components: {
    EventInfo,
    SimpleMap,
    CameraModal,
    TimeVideo,
    throngType,
    leftOneSxz,
    leftOneShixz,
    leftOneBygc,
    leftOneQsgc,
    rightOneSxz,
    rightOneShixz,
    rightOneBygc,
    rightOneQsgc,
    rightTwoSxz,
    rightTwoShixz,
    rightTwoBygc,
    rightTwoQsgc
  },
  data() {
    return {
      btnlist: [
        { title: '第一圈层', ifShow: false },
        { title: '第二圈层', ifShow: false },
        { title: '第三圈层', ifShow: false }
      ],
      circleList: [],
      throngMarkList: [], // 区域点
      earlyWarningModal: {
        info: null,
        visible: false
      },
      throngList: [
        {
          name: '省行政中心',
          lat: '28.640193',
          lon: '115.816114'
        },
        {
          name: '市行政中心',
          lat: '28.684541',
          lon: '115.859085'
        },
        {
          name: '八一广场',
          lat: '28.67401',
          lon: '115.904464'
        },
        {
          name: '秋水广场',
          lat: '28.682829',
          lon: '115.862542'
        }
      ],
      map: null,
      cameraModal: {
        info: null,
        visible: false
      },
      leftOne: 'leftOneSxz',
      rightOne: 'rightOneSxz',
      rightTwo: 'rightTwoSxz',
      ploygon: null,
      ploygons: null, // 圈级图层
      videoMarkerList: [],
      twoVideoMarkerList: [],
      threeVideoMarkerList: [],
      isType: '全部',
      isSelected: ''
    }
  },
  methods: {
    // 地图加载
    mapInit(map) {
      this.map = map
      this._initThrong()
      this._updateMap('省行政中心')
    },
    // 初始化重点区域标记
    _initThrong() {
      this.throngList.forEach(item => {
        this.throngMarkList.push(
          this._createMarker(
            require('@/assets/image/command/icons.gif'),
            [item.lon, item.lat],
            { ...item }
          )
        )
      })
      this.map.add(this.throngMarkList)
      this.throngMarkList.forEach(item => {
        item.w.extData.name === '省行政中心' ? item.show() : item.hide()
      })
    },
    // 创建区域点
    _createMarker(icon, pos, item) {
      const marker = new window.AMap.Marker({
        icon: new window.AMap.Icon({
          image: icon,
          size: new window.AMap.Size(40, 60), // 图标所处区域大小
          imageSize: new window.AMap.Size(40, 60) // 图标大小
        }),
        zIndex: 999,
        size: [16, 16],
        position: pos,
        offset: new window.AMap.Pixel(-35, -70),
        extData: item,
        visible: true
      })
      marker.setLabel({
        offset: new window.AMap.Pixel(10, -30), // 设置文本标注偏移量
        content: `<div style="  background: #168eeb !important;
                  border-radius: 6px !important;
                  font-size: 16px !important;
                  font-weight: 400 !important;
                  color: #ffffff !important;
                  padding: 5px !important;
                  text-align: center !important;
                  border: none; !important">
                  ${item.name}</div>` // 设置文本标注内容
      })
      return marker
    },
    // 点击地图按钮
    showCircle(index) {
      this.btnlist[index].ifShow = !this.btnlist[index].ifShow
      this.btnlist[0].ifShow
        ? this.circleList[0].show()
        : this.circleList[0].hide()
      this.btnlist[1].ifShow
        ? this.circleList[1].show()
        : this.circleList[1].hide()
      this.btnlist[2].ifShow
        ? this.circleList[2].show()
        : this.circleList[2].hide()
      this.btnlist[0].ifShow
        ? this.map.add(this.videoMarkerList)
        : this.map.remove(this.videoMarkerList)
      this.btnlist[1].ifShow
        ? this.map.add(this.twoVideoMarkerList)
        : this.map.remove(this.twoVideoMarkerList)
      this.btnlist[2].ifShow
        ? this.map.add(this.threeVideoMarkerList)
        : this.map.remove(this.threeVideoMarkerList)
    },
    // 创建第一圈视频监控点
    createVideoMarker(id) {
      queryCameraBySafeLocationId({
        id: id
      }).then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            this.videoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })
        }
      })
    },
    _getVideoMarker(pos, item) {
      const marker = new window.AMap.Marker({
        content: `<div class="point"><i class="icon"></i></div>`,
        // icon: require('@/assets/image/keyLocation/sxt-1.png'),
        position: pos,
        extData: item,
        visible: true,
        title: item.positionName
      })

      marker.on('click', event => {
        this.cameraModal.visible = true
        this.cameraModal.info = item
      })

      return marker
    },
    // 聚焦当前重点区域
    focusKeyAreas(curItem) {
      this._removeMapMarker()
      this.advancedForm.longitude = curItem.lon
      this.advancedForm.latitude = curItem.lat
      this.getAllEventList()
      this._updateMap(curItem.name)
    },
    _removeMapMarker() {
      this.circleList.forEach(item => {
        this.map.remove(item)
      })
      this.btnlist.forEach(item => {
        item.ifShow = false
      })
      this.videoMarkerList ? this.map.remove(this.videoMarkerList) : null
      this.twoVideoMarkerList ? this.map.remove(this.twoVideoMarkerList) : null
      this.threeVideoMarkerList
        ? this.map.remove(this.threeVideoMarkerList)
        : null
      this.ploygon = []
      this.videoMarkerList = []
      this.twoVideoMarkerList = []
      this.threeVideoMarkerList = []
      this.circleList = []
    },
    // 聚焦地图中心点
    _focusMap(pos, zoom) {
      this.map.setCenter(pos)
      this.map.setZoom(zoom)
    },
    // 创建重点区域图层
    _createThrongLayer(list, index) {
      const needList = []
      const list1 = list.split(';')
      list1.forEach(item => {
        const longitude = item.split(',')[0]
        const latitude = item.split(',')[1]
        needList.push([longitude, latitude])
      })
      switch (index) {
        case 1:
          this.ploygon = new window.AMap.Polygon({
            path: needList,
            strokeColor: '#C0330E',
            fillOpacity: 0.23,
            fillColor: '#FF2400',
            strokeStyle: 'solid',
            strokeWeight: 2,
            extData: {}
          })
          break

        case 2:
          this.ploygon = new window.AMap.Polygon({
            path: needList,
            strokeColor: '#C0330E',
            fillOpacity: 0.23,
            fillColor: '#FFCA3C',
            strokeStyle: 'solid',
            strokeWeight: 2,
            extData: {}
          })
          break

        case 3:
          this.ploygon = new window.AMap.Polygon({
            path: needList,
            strokeColor: '#326713',
            fillOpacity: 0.23,
            fillColor: '#5AE424',
            strokeStyle: 'solid',
            strokeWeight: 2,
            extData: {}
          })
          break
      }
      this.map.add([this.ploygon])
      this.circleList.push(this.ploygon)
      this.circleList.forEach(item => {
        item.hide()
      })
    },
    // 切换重点区域，更新地图
    _updateMap(curPostion) {
      this.isSelected = curPostion
      switch (curPostion) {
        case '八一广场':
          this.isType = '八一广场'
          this.leftOne = leftOneBygc
          this.rightOne = rightOneBygc
          this.rightTwo = rightTwoBygc

          this.throngMarkList.forEach(item =>
            item.w.extData.name === '八一广场' ? item.show() : item.hide()
          )
          this._createThrongLayer(square, 1)
          this._createThrongLayer(square1, 2)
          this._createThrongLayer(square2, 3)

          this.createVideoMarker('eecd1a1fcd534de88060be83cc5e92be')
          bygcTwo.forEach(item => {
            this.twoVideoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })
          bygcThree.forEach(item => {
            this.threeVideoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })

          this._focusMap([115.904521, 28.673808], 17)
          break

        case '省行政中心':
          this.isType = '省行政中心'
          this.leftOne = leftOneSxz
          this.rightOne = rightOneSxz
          this.rightTwo = rightTwoSxz

          this.throngMarkList.forEach(item => {
            item.w.extData.name === '省行政中心' ? item.show() : item.hide()
          })
          this._createThrongLayer(province, 1)
          this._createThrongLayer(province1, 2)
          this._createThrongLayer(province2, 3)
          this.createVideoMarker('3087c4cfacf840f09bf268d7d926403d')
          sxzTwo.forEach(item => {
            this.twoVideoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })
          sxzThree.forEach(item => {
            this.threeVideoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })

          this._focusMap([115.816573, 28.640264], 15)
          break
        case '市行政中心':
          this.isType = '市行政中心'
          this.leftOne = leftOneShixz
          this.rightOne = rightOneShixz
          this.rightTwo = rightTwoShixz

          this.throngMarkList.forEach(item => {
            item.w.extData.name === '市行政中心' ? item.show() : item.hide()
          })

          this._createThrongLayer(administration, 1)
          this._createThrongLayer(administration1, 2)
          this._createThrongLayer(administration2, 3)

          this.createVideoMarker('4a92cafadf604243818c0220f745d287')
          shixzTwo.forEach(item => {
            this.twoVideoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })
          shixzThree.forEach(item => {
            this.threeVideoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })

          this._focusMap([115.859085, 28.684541], 16)

          break

        case '秋水广场':
          this.isType = '秋水广场'
          this.leftOne = leftOneQsgc
          this.rightOne = rightOneQsgc
          this.rightTwo = rightTwoQsgc

          this.throngMarkList.forEach(item => {
            item.w.extData.name === '秋水广场' ? item.show() : item.hide()
          })

          this._createThrongLayer(qiushui, 1)
          this._createThrongLayer(qiushui1, 2)
          this._createThrongLayer(qiushui2, 3)
          this.createVideoMarker('0419b1838b8544deabbc70de3b1cb0d6')
          qsgcTwo.forEach(item => {
            this.twoVideoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })
          qsgcThree.forEach(item => {
            this.threeVideoMarkerList.push(
              this._getVideoMarker([item.longitude, item.latitude], item)
            )
          })

          this._focusMap([115.862676, 28.682808], 17)
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .amap-marker-label {
  background-color: transparent !important;
  border: none;
}
.btns {
  position: absolute;
  width: 100px;
  height: 130px;
  top: 130px;
  right: 500px;
  button {
    cursor: pointer;
    width: 100px;
    height: 42px;
    line-height: 42px;
    background: url("~@/assets/image/KeyThrong/btn_bgm.png") no-repeat 100% 100%;
    border-radius: 4px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #a9daff;
    border: none;
    margin-bottom: 10px;
    outline: none; //消除默认点击蓝色边框效果
    cursor: pointer;
  }
}
.active {
  background: url("~@/assets/image/KeyThrong/onbtn_bgm.png") no-repeat 100% 100% !important;
}
/deep/ .point {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("~@/assets/image/gridView/shexiangtou.png") no-repeat;
  }
  .num {
    color: #a9daff;
  }
}
.amap-icon {
  img {
    width: 26px;
    height: 26px;
  }
}
</style>

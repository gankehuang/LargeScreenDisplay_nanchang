<template>
  <div class="conflict-container page-container">
    <Tabs :tab-list="tabList" width="600px" :cur-index="2" />

    <!-- 关闭轨迹 -->
    <div v-if="navg" class="hide-path-button" @click="hidePath">
      <div class="close"></div>
      <span>关闭轨迹</span>
    </div>

    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-if="eventInfo.info.id"
        :vid="eventInfo.info.id"
        :position="[eventInfo.info.longitude, eventInfo.info.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div class="md-text-twinkle" @click="showEventInfoModal">
          <p>{{ eventInfo.info.typeText }}</p>
          <div class="md-twinkle"></div>
        </div>
      </el-amap-marker>
    </SimpleMap>

    <Left
      :visible.sync="modalVisible"
      :modalType.sync="modalType"
      @showMapMarkerList="showMapMarkerList"
    />
    <Xuanze />
    <Right @focusEvent="focusEvent" @detailsEvent="detailsEvent" />
    <Bottom />

    <Modal
      :visible.sync="modalVisible"
      :modalType.sync="modalType"
      :modalValue.sync="modalValue"
    />

    <!--人员信息-->
    <PeronInfoModal
      :visible.sync="personModal.visible"
      :info="personModal.info"
      @showPath="showPath"
    />
    <!-- 聚集人员 -->
    <EventInfoModal
      :visible.sync="eventInfo.modalVisible"
      :info="eventInfo.info"
      @showPath="showPath"
    />
  </div>
</template>

<script>
import commonMixin from '../commonMixin'
import trajectoryMixin from './trajectoryMixin'
import SimpleMap from '@/components/SimpleMap'
import Left from './Left'
import Right from './Right'
import Modal from './Modal'
import Bottom from './Bottom'
import Xuanze from './xuanze'
import PeronInfoModal from './PeronInfoModal'
import EventInfoModal from './EventInfoModal'
import { queryConflictCenter } from '@/api/riskPrevention/conflict'
import { getZhqList } from '@/api/riskPrevention/specialPeople'
export default {
  mixins: [commonMixin, trajectoryMixin],
  components: {
    SimpleMap,
    Left,
    Right,
    Modal,
    Bottom,
    PeronInfoModal,
    Xuanze,
    EventInfoModal
  },
  data() {
    return {
      modalVisible: false,
      markerList: [],
      map: null,
      modalType: 'zhq',
      modalValue: '',
      zhqMarkerList: [],
      personModal: {
        visible: false,
        info: {}
      },
      eventInfo: {
        modalVisible: false,
        info: {}
      }
    }
  },
  methods: {
    async mapInit(map) {
      this.map = map
      this.map.setZoom(13)
      this.map.setCenter([115.874384, 28.667946])
      this.handleQueryConflictCenter()
      this.getZhqList()
    },
    async handleQueryConflictCenter() {
      const { status, data } = await queryConflictCenter()
      if (status === 200) {
        this.markerList = data.map(item => {
          if (item.name.indexOf('江西省南昌市医疗纠纷解调处中心') !== -1) {
            return this.createMarker(
              require('@/assets/image/gridView/mdjf-2.png'),
              [item.lon, item.lat],
              {
                ...item,
                name: `${item.name}(${item.addr})`
              },
              function(data) {
                this.modalVisible = true
                this.modalType = 'VR'
                this.modalValue = 'https://67elemu5d.wasee.com/wt/67elemu5d'
              }
            )
          } else if (item.name.indexOf('青云谱区施尧村解忧铺子') !== -1) {
            return this.createMarker(
              require('@/assets/image/gridView/mdjf-2.png'),
              [item.lon, item.lat],
              {
                ...item,
                name: `${item.name}(${item.addr})`
              },
              function(data) {
                this.modalVisible = true
                this.modalType = 'VR'
                this.modalValue = 'https://93d1f1ntx.wasee.com/wt/93d1f1ntx'
              }
            )
          } else if (item.name.indexOf('沙井街道沙井派出所') !== -1) {
            return this.createMarker(
              require('@/assets/image/gridView/mdjf-2.png'),
              [item.lon, item.lat],
              {
                ...item,
                name: `${item.name}(${item.addr})`
              },
              function(data) {
                this.modalVisible = true
                this.modalType = 'VR'
                this.modalValue = 'https://93dxbvnvc.wasee.com/wt/93dxbvnvc'
              }
            )
          } else if (item.name.indexOf('青山湖法院') !== -1) {
            return this.createMarker(
              require('@/assets/image/gridView/mdjf-2.png'),
              [item.lon, item.lat],
              {
                ...item,
                name: `${item.name}(${item.addr})`
              },
              function(data) {
                this.modalVisible = true
                this.modalType = 'VR'
                this.modalValue = 'https://93dfteo0i.wasee.com/wt/93dfteo0i'
              }
            )
          } else {
            return this.createMarker(
              require('@/assets/image/gridView/chuizi.png'),
              [item.lon, item.lat],
              {
                ...item,
                name: `${item.name}(${item.addr})`
              },
              function(data) {
                this.modalVisible = false
                // this.modalType = 'zhq'
              }
            )
          }
        })
        this.map.add(this.markerList)
      }
    },
    // 获取中华情列表
    async getZhqList() {
      const { status, data } = await getZhqList({ name: '中华情' })
      if (status === 200) {
        this.zhqMarkerList = data.map(item => {
          return this.createMarker(
            require('@/assets/image/specialPeople/zhonghuaqing.png'),
            [item.zb.split(',')[0], item.zb.split(',')[1]],
            {
              ...item,
              name: `${item.xm}`,
              id: `${item.id}`
            },
            function(data) {
              this.personModal.visible = true
              this.personModal.info = data
            }
          )
        })
      }
    },
    // 中华情人员切换
    showMapMarkerList(name) {
      this.map.remove(this.markerList)
      this.map.remove(this.zhqMarkerList)

      switch (name) {
        case '中华情':
          this.map.add(this.zhqMarkerList)
          break

        case '初始化图标':
          this.map.add(this.markerList)
          break
      }
    },
    createMarker(icon, pos, item, pointClick = function() {}) {
      const marker = new window.AMap.Marker({
        icon: new window.AMap.Icon({
          image: icon,
          size: new window.AMap.Size(50, 60), // 图标所处区域大小
          imageSize: new window.AMap.Size(28, 26) // 图标大小
        }),
        position: pos,
        offset: new window.AMap.Pixel(-25, -30),
        extData: item,
        visible: true,
        title: item.name
      })

      marker.on('click', event => {
        pointClick.call(this, event.target.w.extData)
      })
      return marker
    },
    // 地图标点
    focusEvent(item) {
      if (item.longitude && item.latitude) {
        this.eventInfo.info = item
        this.map.setCenter([item.longitude, item.latitude])
        this.map.setZoom(32)
      } else {
        this.$message.warning('未获取到该事件的位置信息')
      }
    },
    detailsEvent(item) {
      this.eventInfo.info = item
      this.showEventInfoModal()
    },
    // 弹出弹窗
    showEventInfoModal() {
      this.eventInfo.modalVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.conflict-container {
  overflow: hidden;
  position: relative;
}
.hide-path-button {
  position: absolute;
  top: 180px;
  right: 450px;
  z-index: 100;
  width: 120px;
  height: 40px;
  cursor: pointer;
  color: #a9daff;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background: url('~@/assets/image/conflict/hide_path.png') center center / 100%
    100% no-repeat;
  .close {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .close::before,
  .close::after {
    content: '';
    width: 2px;
    height: 18px;
    background: #a9daff;
    position: absolute;
    left: 20px;
  }
  .close::before {
    transform: rotate(45deg);
  }
  .close::after {
    transform: rotate(-45deg);
  }
  span {
    display: inline-block;
    font-size: 16px;
  }
}
</style>

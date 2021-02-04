<template>
  <div
    v-if="visible"
    class="modal-box"
  >
    <div class="mask" />
    <div
      v-loading="loading"
      class="modal-container"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba( 0, 0, 0, 0.7)"
    >
      <img
        class="btn-close"
        src="@/assets/image/common/close-btn.png"
        @click="bindBtnClose"
      >
      <div class="item-block">
        <div
          v-for="(item, index) in videoList1"
          :key="index"
          class="video-box"
        >
          <IframeVideoPlay
            :camera-index-code="item.code"
            class="video-item"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <div class="item-block">
        <IframeVideoPlay
          camera-index-code="36015607001320000323"
          class="video-item"
          width="100%"
          height="100%"
        />
      </div>
      <div class="item-block">
        <SimpleMap
          :is-need-set-map-style="false"
          @mapInit="mapInit"
        />
      </div>
      <div class="item-block">
        <div class="top-imgs">
          <div class="img-item">
            <img src="./person1.jpg">
          </div>
          <div class="img-item">
            <img src="./person1.jpg">
          </div>
          <div class="img-item">
            <img src="./person1.jpg">
          </div>
        </div>

        <div class="bottom-imgs">
          <div class="img-item">
            <img src="./person1.jpg">
          </div>
          <div class="img-item">
            <img src="./person1.jpg">
          </div>
          <div class="img-item">
            <img src="./person1.jpg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchSnap } from '@/api/riskPrevention/KeyThrong'
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      map: null,
      loading: false,
      videoList1: [
        {
          code: '36015602001320001532',
          name: '红谷滩462红谷中大道与新府路交界东侧人行道01B',
          position: [115.85641400909992, 28.68478876416517]
        },
        {
          code: '36015602001320001827',
          name: '红谷滩463红谷中大道与新府路交界东侧人行道02B',
          position: [115.85641400909992, 28.68478876416517]
        },
        {
          code: '36015602001320001653',
          name: '红谷滩427赣江中大道与新府路交界西南角角A',
          position: [115.86105922218337, 28.682669913948658]
        },
        {
          code: '36015602001320001765',
          name: '红谷滩425赣江中大道与世贸路交界西北角人行道B',
          position: [115.86044548945485, 28.681294065829018]
        },
        {
          code: '36015602001320001129',
          name: '红谷滩1119(全局)世贸路与翠林路交界西北角人行道01(枪)',
          position: [115.853377, 28.685201]
        },
        {
          code: '36015602001320000997',
          name: '红谷滩1120(全局)世贸路与翠林路交界西北角人行道02(枪)',
          position: [115.85828843770727, 28.68187990849682]
        },
        {
          code: '36015602001310027549',
          name: '红谷滩235雄州路29号红谷滩会展中心门口',
          position: [115.856062, 28.687263]
        },
        {
          code: '36015602001320001022',
          name: '红谷滩1093(全局)雄州路169号南昌市委东南角三岔路口人行道02(球)',
          position: [115.860967526407, 28.6839388210897]
        },
        {
          code: '36015602001320001161',
          name: '红谷滩1126(全局)新府路198号市政协西侧人行道02(枪)',
          position: [115.8557733975458, 28.683351977794537]
        },
        {
          code: '36015602001320001792',
          name: '红谷滩464新府路118号南昌市行政中心东侧翠林路小门01C',
          position: [115.85852294163952, 28.68241584535141]
        },
        {
          code: '36015602001320001873',
          name: '红谷滩1613翠林路南昌市人民政府-人民群众来访接待室大门北01',
          position: [115.85907374857128, 28.68325745207556]
        },
        {
          code: '36015602001320001612',
          name: '红谷滩232雄州路199号市人大小门',
          position: [115.85713936263528, 28.685338884554394]
        },
        {
          code: '36015602001320000978',
          name: '红谷滩455雄州路市人大小门',
          position: [115.85722317273522, 28.68539778076271]
        },
        {
          code: '36015602001320001114',
          name: '红谷滩1098雄州路29号红谷滩会展中心西北角内三岔路口02',
          position: [115.86075811956073, 28.68552911099157]
        },
        {
          code: '36015602001320001811',
          name: '红谷滩429赣江中大道与会展路交界西北角B',
          position: [115.86310588375738, 28.684968100888618]
        },
        {
          code: '36015602001320001811',
          name: '红谷滩1085(全局)赣江中大道与会展路交界东侧01(枪)',
          position: [115.8579145481348, 28.685070439527017]
        }
      ]
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.getSnap()
      }
    }
  },
  methods: {
    mapInit (map) {
      this.map = map

      const videoMarkerList = []
      this.videoList1.forEach(item => {
        videoMarkerList.push(
          this._createMarker(
            require('@/assets/image/gridView/icon-law.png'),
            item.position,
            item
          )
        )
      })
      this.map.add(videoMarkerList)

      this.map.setCenter([115.859492, 28.684543])
      this.map.setZoom(16)
    },
    bindBtnClose () {
      this.$emit('update:visible', false)
    },
    getSnap () {
      searchSnap({
        eventId: this.info.id,
        similarity: 70
      }).then(res => {})
    },
    // 创建地图标记点
    _createMarker (icon, pos, item) {
      const marker = new window.AMap.Marker({
        icon: new window.AMap.Icon({
          image: icon,
          size: new window.AMap.Size(49, 60), // 图标所处区域大小
          imageSize: new window.AMap.Size(49, 60) // 图标大小
        }),
        zIndex: 999,
        position: pos,
        offset: new window.AMap.Pixel(-10, -10),
        extData: item,
        visible: true
      })
      // marker.setLabel({
      //   offset: new window.AMap.Pixel(10, -30), // 设置文本标注偏移量
      //   content: `<div style="background:#168eeb !important;
      //             border-radius: 6px !important;
      //             font-size: 16px !important;
      //             font-weight: 400 !important;
      //             color: #ffffff !important;
      //             padding: 5px !important;
      //             text-align: center !important;
      //             border: none;">
      //             ${item.name}</div>`, // 设置文本标注内容
      //   direction: 'right' // 设置文本标注方位
      // })
      return marker
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 100%;
  background: url("~@/assets/image/gridView/grid-modal.png") no-repeat;
  background-size: 100% 100%;
  z-index: 999;
  padding: 20px 30px;
  color: #fff;
  .btn-close {
    position: absolute;
    top: 23px;
    right: 27px;
    cursor: pointer;
    z-index: 999;
    &:hover {
      filter: brightness(1.2);
    }
  }

  display: flex;
  flex-wrap: wrap;

  .item-block {
    flex: 0 0 50%;
    height: 50%;
    align-content: flex-start;

    &:nth-of-type(1) {
      display: flex;
      flex-wrap: wrap;
      height: 55%;

      .video-box {
        flex: 0 0 24%;
        height: 120px;
        margin: 1px 3px;
      }
    }

    &:nth-of-type(2) {
      height: 54%;
    }

    &:nth-of-type(3) {
      position: relative;
      height: 45%;
      flex: 0 0 49.2%;
    }

    &:nth-of-type(4) {
      padding-left: 8px;
      .top-imgs,
      .bottom-imgs {
        display: flex;
        padding-left: 10px;
        margin-top: 10px;
        .img-item {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

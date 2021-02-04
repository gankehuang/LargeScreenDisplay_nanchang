<template>
  <div
    v-if="visible"
    class="social-government-left-popup fadeIn"
  >
    <div
      class="close"
      @click="close"
    />
    <MapModal
      :visible.sync="mapModalVisible"
      :type="mapMarkerType"
    />
    <VRModal
      :visible.sync="VRModalVisible"
      :url="VRUrl"
    />
    <NcMapModal
      :visible.sync="ncMapModalVisible"
      :type-nc.sync="typeNc"
    />
    <TimeLineModal
      :visible.sync="timeLineModalVisible"
      :value.sync="timeLineValue"
    />
    <STSign :visible.sync="stSignVisible" />
    <ZhzfSign :visible.sync="zhzfSignVisible" />
    <STSign
      :visible.sync="stSignVisible"
      :value.sync="stSignValue"
    />
    <PhotoPopUp :visible.sync="photoPopUpVisible" />
    <SocialPlatForm :visible.sync="socialPlatFormVisible" />
    <el-scrollbar class="scrollbar-container">
      <div
        v-for="(item, index) in item.list"
        :key="index"
        class="list-item"
        @click="tabMapMarkerType(item)"
      >
        <span>
          {{ item.name }}
        </span>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import MapModal from './MapModal'
import VRModal from './VRModal'
import NcMapModal from './NcMapModal'
import TimeLineModal from './TimeLineModal'
import STSign from './STSign'
import ZhzfSign from './ZhzfSign'
import PhotoPopUp from './PhotoPopUp'
import SocialPlatForm from './SocialPlatform'
export default {
  components: {
    MapModal,
    VRModal,
    NcMapModal,
    TimeLineModal,
    STSign,
    ZhzfSign,
    PhotoPopUp,
    SocialPlatForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    },
    rightClickItemIndex: {
      type: Number || undefined,
      default: undefined
    }
  },
  data () {
    return {
      mapModalVisible: false,
      mapMarkerType: 'redPost',
      VRModalVisible: false,
      ncMapModalVisible: false,
      typeNc: '',
      timeLineModalVisible: false,
      stSignVisible: false,
      VRUrl: '',
      NcMapModalVisible: false,
      timeLineValue: '',
      zhzfSignVisible: false,
      photoPopUpVisible: false,
      socialPlatFormVisible: false,
      stSignValue: ''
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.mapModalVisible = false
        this.ncMapModalVisible = false
        this.timeLineModalVisible = false
        this.stSignVisible = false
        this.VRModalVisible = false
        this.zhzfSignVisible = false
      }
    }
  },
  methods: {
    // mock 数据中  type 区分弹框
    tabMapMarkerType (item) {
      if (item.type === 'VR') {
        this.VRModalVisible = true
        this.VRUrl = item.url
      } else if (item.type.indexOf('NcMap') > -1) {
        this.ncMapModalVisible = true
        this.typeNc = item.type
      } else if (item.type === 'timeLine') {
        this.timeLineModalVisible = true
        this.timeLineValue = item.value
      } else if (item.type.indexOf('zhzfSign') > -1) {
        this.zhzfSignVisible = true
      } else if (item.type.indexOf('STSign') > -1) {
        this.stSignVisible = true
        this.stSignValue = item.type
      } else if (item.type === 'photoPopUp') {
        this.photoPopUpVisible = true
      } else if (item.type === 'socialPlatform') {
        this.socialPlatFormVisible = true
      } else {
        this.mapMarkerType = item.type
        this.mapModalVisible = true
      }
    },
    close () {
      this.$emit('update:visible', false)
      this.$emit('update:rightClickItemIndex', undefined)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-scrollbar__view {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.close {
  cursor: pointer;
  z-index: 10;
  position: absolute;
  top: 40px;
  right: 25px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}
.social-government-left-popup {
  position: absolute;
  z-index: 2010;
  top: 50%;
  left: 70px;
  width: 630px;
  height: 687px;
  margin-top: -343px;
  padding-top: 3%;
  background: url("~@/assets/image/socialGovernment/popup_bg.png") center center /
    100% 100% no-repeat;
}
.scrollbar-container {
  width: 100%;
  height: 95%;
}
.fadeIn {
  -webkit-animation: fadeInDown 0.3s;
  animation: fadeInDown 0.3s;
}
// .map {
//   position: initial;
//   width: 90%;
//   height: 75%;
// }
.list-item,
.list-item.active {
  cursor: pointer;
  white-space: pre-line;
  width: 219px;
  height: 87px;
  margin: 20px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    text-align: center;
    width: 70%;
    font-size: 20px;
  }
}
.list-item {
  background: url("~@/assets/image/socialGovernment/popup_list_item.png") center
    center / 100% 100% no-repeat;
  color: #a9daff;
}
.list-item:hover {
  background: url("~@/assets/image/socialGovernment/popup_list_item_active.png")
    center center / 100% 100% no-repeat;
  color: #fff;
}
.list-item.active {
  background: url("~@/assets/image/socialGovernment/popup_list_item_active.png")
    center center / 100% 100% no-repeat;
  color: #fff;
}
@keyframes fadeInDown {
  0% {
    -webkit-transform: translate3d(0, -20%, 0);
    -webkit-transform: translate3d(0, -20%, 0);
    transform: translate3d(0, -20%, 0);
    transform: translate3d(0, -20%, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
    transform: none;
    opacity: 1;
  }
}

@keyframes fadeInDown {
  0% {
    -webkit-transform: translate3d(0, -20%, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
    opacity: 1;
  }
}
</style>

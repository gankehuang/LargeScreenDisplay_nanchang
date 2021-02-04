<template>
  <div class="video-box">
    <div class="video-title">
      实时视频监控
    </div>
    <div
      v-if="cameraIndexCodeList.length"
      class="video-list"
    >
      <div
        v-for="(item, index) in cameraIndexCodeList"
        :key="index"
        class="video-item"
        @dblclick.stop="onModalPlayVideo(item)"
        @mouseenter.stop="onMouseenterIframeVideo(index)"
      >
        <IframeVideoPlay
          :camera-index-code="item.cameraIndexCode"
          width="100%"
          height="165"
        />
        <div class="video-modal" />
      </div>
    </div>

    <CameraModal
      ref="cameraModal"
      :info="cameraModalInfo"
    />
  </div>
</template>

<script>
import CameraModal from './CameraModal'
export default {
  components: {
    CameraModal
  },
  props: {
    cameraIndexCodeList: {
      type: Array,
      default: () => []
    },
    curMarkerVideoInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      cameraModalInfo: null,
      curPlayIndex: -1, // 记录当前按照顺序播放的下标
      onMouseenterIndex: 0 // 鼠标滑过的下标（配合视频marker拖拽使用）
    }
  },
  watch: {
    // 点击地图上的视频图标，依次替换实时视频监听列表的视频
    curMarkerVideoInfo (newVal) {
      if (this.curPlayIndex === 6) {
        this.curPlayIndex = -1
      }
      ++this.curPlayIndex
      this.cameraIndexCodeList.splice(this.curPlayIndex, 1, newVal)
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('updateVideoMarkerDragend')
  },
  mounted () {
    // 将视频拖拽到页面左侧实时视频监控，进行替换
    this.$EventBus.$on('updateVideoMarkerDragend', res => {
      const code = res.gbIndexCode ? res.gbIndexCode : res.cameraIndexCode
      this.cameraIndexCodeList.splice(this.onMouseenterIndex, 1, {
        cameraIndexCode: code,
        positionName: res.positionName
      })
    })
  },
  methods: {
    // 双击视频在弹框上播放
    onModalPlayVideo (itemData) {
      this.$refs.cameraModal.open()
      this.cameraModalInfo = itemData
    },
    // 配合功能：将视频拖拽到页面左侧实时视频监控，进行替换
    onMouseenterIframeVideo (index) {
      this.onMouseenterIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.video-box {
  width: 100%;
  height: 500px;
  .video-title {
    width: 100%;
    height: 36px;
    font-size: 16px;
    color: #7dbcff;
    text-align: center;
    background-size: contain;
    background: url("~@/assets/image/command/block-title-bg.png") no-repeat center center;
  }

  .video-list {
    padding-top: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .video-item {
      position: relative;
      flex: 0 0 49%;
      margin-bottom: 10px;
      .video-modal {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 165px;
        cursor: pointer;
      }
    }
  }
}
</style>

<template>
  <div class="block-box">
    <div class="box-title">活动信息</div>
    <div class="activityInfo" v-if="activeMes">
      <div class="info-one">
        <svg-icon icon-class="com-name" class="icon" />
        <p>
          活动名称<span>{{ toActiveMes.name || activeInfo.name }}</span>
        </p>
      </div>
      <div class="info-one">
        <svg-icon icon-class="com-location" class="icon" />
        <p :title="toActiveMes.address">
          活动地点<span>{{ toActiveMes.address || activeInfo.address }}</span>
          <!--          活动地点<span>省行政中心，南昌“城市大脑”，南昌市综治中心，青山湖区南钢街道综治中心，青山湖区人民法院，南昌县综治中心</span>-->
        </p>
      </div>
      <div class="info-one">
        <svg-icon icon-class="com-time" class="icon" />
        <p>
          活动时间<span>{{
            toActiveMes.activityStartTime || activeInfo.startTime
          }}</span>
        </p>
      </div>
      <div class="info-one">
        <svg-icon icon-class="com-active" class="icon" />
        <p>
          活动状态<span class="info-type">{{
            toActiveMes.statusText || activeInfo.status
          }}</span>
        </p>
      </div>
    </div>

    <div class="video-box">
      <div class="video-title">实时视频监控</div>
      <div class="video-list" v-if="cameraIndexCodeList.length">
        <div
          class="video-item"
          style="width:100%;"
          v-for="(item, index) in cameraIndexCodeList"
          :key="index"
          @dblclick.stop="openOneIframeVideoModal(item)"
          @mouseenter.stop="onMouseenterIframeVideo(index)"
        >
          <IframeVideoPlay
            :camera-index-code="item.cameraIndexCode"
            width="100%"
            height="165"
          />
          <div class="video-modal"></div>
        </div>
      </div>
    </div>

    <!--视频预览-->
    <CameraModal
      :visible.sync="videoPlaybackModal.visible"
      :info="videoPlaybackModal.info"
    />
  </div>
</template>

<script>
import CameraModal from '../CameraModal'
export default {
  props: {
    activeMes: {
      type: Object
    },
    cameraIndexCodeList: {
      type: Array
    },
    curMarkerVideoInfo: {
      type: Object
    }
  },
  components: {
    CameraModal
  },
  data() {
    return {
      activeInfo: {
        name: '全省推进市域社会治理现代化试点工作现场会',
        address: '市综治中心,南昌县综治中心,青山湖南钢街道办,青山湖区法院...',
        allAddress:
          '市综治中心,南昌县综治中心,青山湖南钢街道办,青山湖区法院,红谷滩凤凰家园,市公安局,前湖迎宾馆',
        startTime: '2020-11-20',
        endTime: '2020-12-03',
        status: '未开始'
      },
      videoPlaybackModal: {
        visible: false,
        info: null
      },
      curPlayIndex: -1, // 记录当前按照顺序播放的下标
      onMouseenterIndex: 0 // 鼠标滑过的下标（配合视频marker拖拽使用）
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('updateVideoMarkerDragend')
  },
  mounted() {
    // 配合视频marker拖拽使用
    this.$EventBus.$on('updateVideoMarkerDragend', res => {
      const code = res.gbIndexCode ? res.gbIndexCode : res.cameraIndexCode
      this.cameraIndexCodeList.splice(this.onMouseenterIndex, 1, {
        cameraIndexCode: code,
        positionName: res.positionName
      })
    })
  },
  watch: {
    curMarkerVideoInfo(newVal) {
      if (this.curPlayIndex === 6) {
        this.curPlayIndex = -1
      }
      ++this.curPlayIndex
      this.cameraIndexCodeList.splice(this.curPlayIndex, 1, newVal)
    }
  },
  computed: {
    toActiveMes() {
      const activeMes = { ...this.activeMes }
      activeMes.address = ''
      activeMes.activityAddresses.forEach(item => {
        activeMes.address += item.address + ','
      })

      return activeMes
    }
  },
  methods: {
    openOneIframeVideoModal(itemData) {
      this.videoPlaybackModal.visible = true
      this.videoPlaybackModal.info = itemData
    },
    // 配合视频marker拖拽使用
    onMouseenterIframeVideo(index) {
      this.onMouseenterIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.block-box {
  position: relative;
  width: 420px;
  height: 100%;
  background: url("~@/assets/image/command/block-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 50px 10px 10px 10px;
  .box-title {
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 16px;
    color: #7dbcff;
    font-weight: 600;
  }
  .activityInfo {
    padding: 10px 0 0 10px;
    width: 395px;
    height: 240px;
    .info-one {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      .icon {
        font-size: 16px;
      }
      p {
        position: relative;
        margin-left: 6px;
        font-size: 16px;
        font-weight: bold;
        color: #3b9afe;
        line-height: 20px;
        span {
          margin-left: 10px;
          display: inline-block;
          font-size: 16px;
          font-weight: 400;
          color: #a9daff;
          line-height: 22px;
          width: 260px;
          position: absolute;
          top: -2px;
          left: 70px;
          overflow: hidden;
          // white-space: nowrap;
          text-overflow: ellipsis;
          // line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .info-type {
          color: #f2bd1b !important;
        }
      }
    }
  }
  .video-box {
    width: 100%;
    height: 500px;
    .video-title {
      width: 100%;
      height: 36px;
      font-size: 16px;
      color: #7dbcff;
      text-align: center;
      background: url("~@/assets/image/command/block-title-bg.png") no-repeat;
      background-size: contain;
      background-position: center center;
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
          top: 0%;
          z-index: 999;
          width: 100%;
          height: 165px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

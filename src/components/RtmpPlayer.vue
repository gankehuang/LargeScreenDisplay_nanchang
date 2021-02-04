<template>
  <div class="rtmpPlayer-container">
    <video-player
      ref="videoPlayer"
      class="video-player-box"
      :class="loading && 'vjs-waiting'"
      :options="playerOption"
      @waiting="onPlayerWaiting($event)"
      @loadeddata="onPlayerLoadeddata($event)"
    />
    <div
      v-if="isNeedMask"
      class="mask"
      @click="handlerCilck"
      @dblclick="displayFullScreen"
    />
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import { hasUsableFlash } from '@/utils/check.js'
import 'videojs-flash'
export default {
  components: {
    videoPlayer
  },
  props: {
    src: String,
    mute: Boolean,
    videoType: {
      type: String,
      default: 'rtmp/flv'
    },
    isNeedMask: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      player: null,
      playerOption: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        loop: false, // 导致视频一结束就重新开始。
        autoplay: true, // 如果true,浏览器准备好时开始回放
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器
        techOrder: ['flash'],
        notSupportedMessage: '请选择播放端口',
        controls: true, // 控制条
        language: 'zh-CN',
        muted: this.mute || false, // 默认情况下将会消除任何音频
        sources: [
          {
            type: this.videoType,
            src: this.src
          }
        ]
      }
    }
  },
  watch: {
    mute () {
      this.player.muted(this.mute)
    }
  },
  mounted () {
    this.player = this.$refs.videoPlayer.player
    if (!hasUsableFlash()) {
      this.$message.error('请启用 flash 插件')
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    handlerCilck () {
      this.$emit('handlerCilck')
    },
    onPlayerWaiting () {
      // this.loading = true
    },
    onPlayerLoadeddata () {
      // this.loading = false
    },
    displayFullScreen () {
      this.player.requestFullscreen()
    }
  }
}
</script>

<style lang="scss" scoped>
.rtmpPlayer-container {
  background: #000;
  position: relative;
  border: 1px solid #000;
  .active {
    border: 1px solid #c5db61;
  }
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  opacity: 0.1;
}

.video-player {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

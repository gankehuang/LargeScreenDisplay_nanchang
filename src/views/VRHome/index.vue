<template>
  <div class="VRHome">
    <div class="video-box">
      <video-player
        class="vjs-custom-skin"
        :options="playerOptions"
      />
    </div>
    <iframe
      v-show="ifShow"
      style="position: absolute; left: 0; top: 0;z-index: 2;"
      src="https://38cwdtlfc.wasee.com/c/38cwdtlfc?def_sid=771111"
      width="100%"
      height="100%"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
    />
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        controls: false, // 控制条
        preload: 'auto', // 视频预加载
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            src: require('@/assets/videos/江西地图.mp4') // 你所放置的视频的地址，最好是放在服务器上
          }
        ],
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      ifShow: false
    }
  },
  mounted () {
    const timer = setInterval(() => {
      this.ifShow = true
      // 某些定时器操作
    }, 4100)
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  }
}
</script>

<style lang="scss" scoped>
.VRHome {
  width: 100%;
  height: 100%;
  position: relative;
}
.video-box {
  width: 100%;
  height: 100%;
}
</style>

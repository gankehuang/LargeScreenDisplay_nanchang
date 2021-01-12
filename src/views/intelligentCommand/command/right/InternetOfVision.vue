<template>
  <div class="vision-box">
    <div class="vision-title">视联网</div>
<!--    <img-->
<!--      class="close-btn"-->
<!--      v-if="isShowVideo"-->
<!--      src="@/assets/image/common/close-btn.png"-->
<!--      @click="stopVisonVideo"-->
<!--    />-->

<!--    <div-->
<!--      class="vision-content"-->
<!--      v-if="!isShowVideo"-->
<!--      @click="startFlvVideo"-->
<!--    ></div>-->

    <RtmpPlayer src="rtmp://172.11.16.245/live/0" :mute="false" />
<!--    <FlvPlayer-->
<!--      v-else-->
<!--      :id="visionVideo.videoId"-->
<!--      :src="visionVideo.playSrc"-->
<!--      class="flvPlayer"-->
<!--    />-->
  </div>
</template>

<script>
// import FlvPlayer from '@/components/FlvPlayer'
import RtmpPlayer from '@/components/RtmpPlayer'
// import { startVideo as startFlvVideo } from '@/api/smartData/gridView'
export default {
  components: {
    // FlvPlayer,
    RtmpPlayer
  },
  data() {
    return {
      isShowVideo: false,
      visionVideo: {
        playSrc: '',
        videoId: ''
      }
    }
  },
  methods: {
    // 开启视联网视频
    async startFlvVideo() {
      this.isShowVideo = true
      // const { status, data, message } = await startFlvVideo(20000)
      // if (status === 200) {
      //   this.visionVideo.playSrc = data.url
      //   this.visionVideo.videoId = data.id
      // } else {
      //   this.$message.error(message[0].message)
      // }
    },
    // 关闭视联网视频
    stopVisonVideo() {
      this.isShowVideo = false
      // this.visionVideo.playSrc = ''
      // this.visionVideo.videoId = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.vision-box {
  margin: 15px 0;
  position: relative;
  .close-btn {
    position: absolute;
    right: 38px;
    top: 45px;
    z-index: 9999;
    cursor: pointer;
  }
  .vision-title {
    width: 100%;
    height: 36px;
    font-size: 16px;
    color: #7dbcff;
    text-align: center;
    background: url("~@/assets/image/command/block-title-bg.png") no-repeat;
    background-size: contain;
    background-position: center center;
  }

  .vision-content {
    width: 100%;
    height: 200px;
    background: url("~@/assets/image/command/vision-bg.jpg") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>

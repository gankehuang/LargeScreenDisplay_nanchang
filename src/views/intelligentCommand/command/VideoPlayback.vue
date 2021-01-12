<template>
  <div class="mask-container" v-if="visible">
<!--    <div class="mask" />-->
    <div class="videoPlayback-modal">
      <img
        class="btn-close"
        src="@/assets/image/common/close-btn.png"
        @click="bindBtnClose"
      />
      <div class="video-name">{{ info.positionName }}</div>
      <IframeVideoPlay
        v-if="info"
        :camera-index-code="
          info.gbIndexCode ? info.gbIndexCode : info.cameraIndexCode
        "
        width="100%"
        height="95%"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: Object,
    visible: Boolean
  },
  mounted() {},
  data() {
    return {}
  },
  watch: {},
  methods: {
    bindBtnClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
}
.videoPlayback-modal {
  position: absolute;
  background: url("~@/assets/image/command/video-modal-bg.png") no-repeat;
  background-size: contain;
  width: 612px; /*播放容器的宽和高设定*/
  height: 369px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 30px;
  .video-name {
    color: #3b9afe;
    margin-bottom: 10px;
  }
  .btn-close {
    position: absolute;
    top: 12px;
    right: 27px;
    cursor: pointer;
    z-index: 999;

    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>

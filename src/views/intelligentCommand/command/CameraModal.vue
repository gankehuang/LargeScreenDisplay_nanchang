<template>
  <div class="modal" v-if="visible">
    <img
      class="btn-close"
      src="@/assets/image/common/close-btn.png"
      @click="bindBtnClose"
    />
    <div class="title">
      视频预览
    </div>
    <div class="body">
      <div class="video-name">{{ info.positionName }}</div>
      <IframeVideoPlay
        v-if="info"
        :camera-index-code="
          info.gbIndexCode ? info.gbIndexCode : info.cameraIndexCode
        "
        class="video-item"
        width="100%"
        height="85%"
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
  data() {
    return {}
  },
  methods: {
    bindBtnClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  background: url("~@/assets/image/common/modal-bg.png") no-repeat;
  background-size: 100% 100%;
  width: 600px;
  height: 500px;
  top: 80px;
  left: 430px;
  z-index: 999;
  padding: 12px 7px 6px 6px;

  .btn-close {
    position: absolute;
    top: 12px;
    right: 27px;
    cursor: pointer;
    z-index: 9;

    &:hover {
      filter: brightness(1.2);
    }
  }

  .title {
    height: 36px;
    line-height: 22px;
    text-align: center;
    font-size: 14px;
    color: #00ffff;
    font-weight: bold;
  }

  .body {
    width: 100%;
    height: 100%;
    .video-name {
      color: #3b9afe;
      margin-bottom: 10px;
    }
  }
}
</style>

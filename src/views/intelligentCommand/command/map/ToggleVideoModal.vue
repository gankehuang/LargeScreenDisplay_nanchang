<template>
  <div class="toggleVideoPlay-modal">
    <img
      class="btn-close"
      src="@/assets/image/common/close-btn.png"
      @click="$emit('update:visible', false)"
    >
    <div
      class="point-item"
      @click="switchVideoPlay('previewToList')"
    >
      <svg-icon icon-class="preview" />
      <div class="item-name">
        列表预览
      </div>
    </div>

    <div
      class="point-item"
      @click="switchVideoPlay('previewToVideo')"
    >
      <svg-icon icon-class="realTimePreviewFill" />
      <div class="item-name">
        视频预览
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {}
  },
  methods: {
    switchVideoPlay (playType) {
      this.$emit('switchVideoPlay', playType)
    }
  }
}
</script>

<style lang="scss" scoped>
// 切换视频播放
.toggleVideoPlay-modal {
  width: 228px;
  height: 80px;
  background: url("~@/assets/image/command/point-modal-bg.png") no-repeat 100%
    100%;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  .point-item {
    cursor: pointer;
    flex: 0 0 50%;
    text-align: center;
    color: #aadaff;
    .item-name {
      padding-top: 5px;
    }
  }

  .btn-close {
    position: absolute;
    top: 12px;
    right: 10px;
    cursor: pointer;

    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>

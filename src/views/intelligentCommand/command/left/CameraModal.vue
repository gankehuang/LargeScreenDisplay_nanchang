<template>
  <Dialog
    v-if="info"
    width="40%"
    top="15vh"
    :is-need-head="false"
    :visible.sync="dialogVisible"
    append-to-body
    :modal="false"
  >
    <div class="video-name">
      {{ info.positionName }}
    </div>
    <IframeVideoPlay
      v-if="info"
      :camera-index-code="
        info.gbIndexCode ? info.gbIndexCode : info.cameraIndexCode
      "
      class="video-item"
      width="100%"
      height="500px"
    />
  </Dialog>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.video-name {
  color: #3b9afe;
  margin-bottom: 10px;
}
</style>

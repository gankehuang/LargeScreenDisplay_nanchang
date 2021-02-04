<template>
  <Dialog
    v-if="info"
    width="40%"
    top="15vh"
    title="视频预览"
    :visible.sync="dialogVisible"
    append-to-body
  >
    <IframeVideoPlay
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

</style>

<template>
  <Dialog
    v-if="info"
    width="40%"
    top="15vh"
    title="视频点"
    :visible.sync="dialogVisible"
    :append-to-body="true"
  >
    <IframeVideoPlay
      v-if="info.gbIndexCode || info.cameraIndexCode"
      :camera-index-code="
        info.gbIndexCode ? info.gbIndexCode : info.cameraIndexCode
      "
      width="100%"
      height="408"
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
    closeModal () {
      this.dialogVisible = false
    },
    openModal () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

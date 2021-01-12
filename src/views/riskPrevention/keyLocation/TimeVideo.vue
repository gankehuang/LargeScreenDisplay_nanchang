<template>
  <div class="left-one">
    <div class="title">实时视频</div>
    <div class="video-play">
      <IframeVideoPlay
        v-for="(item, index) in videoList"
        :key="index"
        :camera-index-code="item"
        class="video-item"
        width="100%"
        height="165"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    videoList: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.left-one {
  position: relative;
  width: 420px;
  height: 580px;
  background: url("~@/assets/image/KeyThrong/earlyWarning-bg.png") center center /
    100% 100% no-repeat;
  margin-bottom: 10px;
  padding-top: 40px;
  .title {
    position: absolute;
    top: 10px;
    left: 40px;
    z-index: 99;
    color: #7dbcff;
    font-weight: bold;
    font-size: 16px;
  }
}
.video-play {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .video-item {
    flex: 0 0 49%;
    margin-bottom: 5px;
  }
}
</style>

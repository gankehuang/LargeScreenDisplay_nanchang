<template>
  <div class="left-one">
    <div class="title">
      实时视频
    </div>
    <div class="video-play">
      <IframeVideoPlay
        v-for="(item, index) in cameraIndexCode"
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
  props: ['isType'],
  data () {
    return {
      codeList: [
        {
          label: '全部',
          code: [
            '36015607001320000479',
            '36015607001320000084',
            '36015607001320000544',
            '36015602001310027549'
          ]
        },
        {
          label: '省行政中心',
          code: [
            '36015607001320000323',
            '36015603001320000762',
            '36015607001320000502',
            '36015603001320000831',
            '36015607001320000220',
            '36015607001320000084'
          ]
        },
        {
          label: '市行政中心',
          code: [
            '36015602001320000178',
            '36015602001320000120',
            '36015602001320001345',
            '36015602001320000345',
            '36015602001320001087',
            '36015602001320000971'
          ]
        },
        {
          label: '八一广场',
          code: [
            '36010203001320000531',
            '36010203001320000520',
            '36010203001320000422',
            '36010203001320000516',
            '36010203001320000470',
            '36010203001310507522'
          ]
        },
        {
          label: '秋水广场',
          code: [
            '36015602001320001410',
            '36015602001320001413',
            '36015602001320001453',
            '36015602001310258100',
            '36015602001320001257',
            '36015602001320001454'
          ]
        }
      ],
      cameraIndexCode: ''
    }
  },
  watch: {
    isType: {
      immediate: true,
      handler () {
        this.updataVideo()
      }
    }
  },
  methods: {
    updataVideo () {
      for (let i = 0; i < this.codeList.length; i++) {
        if (this.codeList[i].label === this.isType) {
          this.cameraIndexCode = this.codeList[i].code
        }
      }
    }
  }
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

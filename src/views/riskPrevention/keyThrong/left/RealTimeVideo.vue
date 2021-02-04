<template>
  <InfoBlock
    title="实时视频"
    height="580px"
  >
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
  </InfoBlock>
</template>
<script>
export default {
  data () {
    return {
      codeList: [
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
      cameraIndexCode: [
        '36015607001320000479',
        '36015607001320000084',
        '36015607001320000544',
        '36015602001310027549'
      ]
    }
  },

  methods: {
    updataVideo (curItem) {
      this.codeList.forEach(item => {
        if (item.label === curItem.name) {
          this.cameraIndexCode = item.code
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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

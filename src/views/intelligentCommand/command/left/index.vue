<template>
  <InfoBlock
    title="活动信息"
    height="100%"
    :bg-url="require('@/assets/image/common/info-block-big-bg.png')"
    :content-style-obj="{paddingTop: '15px'}"
  >
    <TopInfo :active-mes="activeMes" />
    <BottomVideo
      :camera-index-code-list="cameraIndexCodeList"
      :cur-marker-video-info="curMarkerVideoInfo"
    />
  </InfoBlock>
</template>

<script>
import TopInfo from './TopInfo'
import BottomVideo from './BottomVideo'
export default {
  components: {
    TopInfo,
    BottomVideo
  },
  props: {
    activeMes: {
      type: Object,
      default: () => {}
    },
    cameraIndexCodeList: {
      type: Array,
      default: () => []
    },
    curMarkerVideoInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>

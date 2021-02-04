<template>
  <!-- <div class="tab-container">
    <div
      class="icon"
      @click="toNewPage"
    />
    <div class="page-container data-cockpit">
      <Tabs
        :tab-list="tabList"
        width="300px"
        :cur-index="8"
      />
      <Top />
      <Left />
      <Right />
      <ImgMap />
      <Bottom />
    </div>
  </div> -->
  <Container
    :is-need-page-center="true"
    :container-style-obj="{background: `url(${url})`}"
  >
    <Tabs
      :tab-list="tabList"
      width="300px"
      :cur-index="8"
    />
    <template v-slot:pageLeft>
      <Left />
    </template>
    <template v-slot:pageCenter>
      <Top />
      <ImgMap />
      <Bottom />
    </template>
    <template v-slot:pageRight>
      <Right />
    </template>
  </Container>
</template>

<script>
import commonMixin from '../commonMixin'
import Left from './Left/index'
import Right from './Right/index'
import Top from './Center/Top'
import ImgMap from './Center/ImgMap'
import Bottom from './Center/Bottom'
export default {
  components: {
    ImgMap,
    Left,
    Right,
    Top,
    Bottom
  },
  mixins: [commonMixin],
  data () {
    return {
      iframeVisible: false,
      url: require('@/assets/image/dataCockpit/container-bg.png')
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:iframeVisible')
  },
  mounted () {
    this.$EventBus.$on('update:iframeVisible', res => {
      this.iframeVisible = res
    })
  },
  methods: {
    handleClickPage () {
      this.columnsAnimationModal.visible = true
    },
    toNewPage () {
      const url =
        'http://172.10.16.244/static/weber/designer.html?pageId=603955a9ef53b45db0c3e5309f17d02f&accessToken=a2816f8ca41e4b4fb55c11896d2b6a66'
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/dataCockpit/container-bg.png");
  background-size: 100% 100%;
}
.data-cockpit {
  background: url("~@/assets/image/dataCockpit/container-bg.png");
  background-size: 100% 100%;
}
// /deep/.page-right {
//   justify-content: space-between;
// }
// /deep/.page-left {
//   justify-content: space-between;
// }
/deep/.tabs {
  top: 60px;
  height: 45px;
}
/deep/.tab {
  line-height: 54px;
}
.icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 90px;
  right: 460px;
  z-index: 1000;
  background: url("~@/assets/image/dataCockpit/setting-icon.png") center center /
    100% 100% no-repeat;
}
</style>

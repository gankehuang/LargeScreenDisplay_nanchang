<!-- 智慧服务 页面组件 -->
<template>
  <div class="socialGovernance">
    <Tabs
      :tab-list="tabList"
      width="500px"
      :cur-index="0"
    />
    <div
      v-if="curPageType === 'home'"
      class="con-top"
    >
      <ConTop />
    </div>
    <div
      v-if="curPageType === 'home'"
      class="con-bottom"
    >
      <ConBottom />
    </div>

    <EventListTable
      v-if="curPageType === 'EventListTable'"
      :page-name="curPageName"
    />
  </div>
</template>

<script>
import ConTop from './conTop'
import ConBottom from './conBottom'
import commonMixin from '../commonMixin'
import EventListTable from './eventListTable/index'
export default {
  components: {
    ConTop,
    ConBottom,
    EventListTable
  },
  mixins: [commonMixin],
  data () {
    return {
      curPageType: 'home',
      curPageName: ''
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('backPage')
  },
  mounted () {
    this.$EventBus.$on('backPage', res => {
      this.curPageType = res.pageType
      this.curPageName = res.pageName
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.socialGovernance {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 140px 15px 5px 15px;
  background-color: #1d293b;
  background: url("~@/assets/image/intelligentService/page-bgm.png") no-repeat;
  background-size: 100% 100%;
}
.con-top {
  width: 100%;
  height: 325px;
  background: rgba(8, 28, 63, 0.47);
  border: 1px solid #0f4f8f;
  margin-bottom: 15px;
}
.con-bottom {
  width: 100%;
  height: calc(100% - 346px);
  display: flex;
  background: rgba(8, 28, 63, 0.47);
  border: 1px solid #0f4f8f;
  margin-bottom: 15px;
}
</style>

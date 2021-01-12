<template>
  <div class="socialGovernance">
    <Tabs :tab-list="tabList" width="500px" :cur-index="0" />
    <div class="con-top" v-if="curPageType === 'home'">
      <conTop />
    </div>
    <div class="con-bottom" v-if="curPageType === 'home'">
      <conBottom />
    </div>

    <EventListTable
      v-if="curPageType === 'EventListTable'"
      :pageName="curPageName"
    />
  </div>
</template>

<script>
import conTop from './conTop'
import conBottom from './conBottom'
import commonMixin from '../commonMixin'
import EventListTable from './EventListTable'
export default {
  components: {
    conTop,
    conBottom,
    EventListTable
  },
  mixins: [commonMixin],
  data() {
    return {
      curPageType: 'home',
      curPageName: ''
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('backPage')
  },
  mounted() {
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

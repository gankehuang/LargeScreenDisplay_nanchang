<template>
  <Container>
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="3"
    />
    <Map
      ref="map"
      @detailsEvent="detailsEvent"
    />
    <throngType @switchRegion="switchRegion" />
    <RingBtn
      ref="ringBtn"
      @ringBtnSelect="ringBtnSelect"
    />
    <template v-slot:pageLeft>
      <AddressInfo ref="addressInfo" />
      <RealTimeVideo ref="realTimeVideo" />
    </template>
    <template v-slot:pageCenter />
    <template v-slot:pageRight>
      <WarningTrend ref="warningTrend" />
      <WarningAnalysis ref="warningAnalysis" />
      <EventInfo @detailsEvent="detailsEvent" />
    </template>
    <!--事件详情弹框-->
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="modal = ''"
    />

    <!--事件指派或上报弹框-->
    <EventCirculationModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      :grid-code="gridCode"
      @onDealModal="onDealModal"
      @bindBtnClose="modal = 'event'"
    />

    <!--事件处置弹框-->
    <EventHandleModal
      v-if="modal === 'deal'"
      :event-id="needEventId"
      @onShowToast="onShowToast"
      @closeModal="modal = 'event'"
    />

    <!--事件具体详情弹框-->
    <EventDetailModal
      :visible.sync="eventDetailModal.visible"
      :info="eventDetailModal.info"
      @update:visible="modal = 'event'"
    />
  </Container>
</template>

<script>
import commonMixin from '../commonMixin'
import eventByLocationMixin from './evenModule/eventByLocationMixin'

import Map from './Map'
import RingBtn from './RingBtn'
import throngType from './throngType'

import AddressInfo from './left/AddressInfo'
import RealTimeVideo from './left/RealTimeVideo'

import WarningTrend from './right/WarningTrend'
import WarningAnalysis from './right/WarningAnalysis'
import EventInfo from './right/EventInfo'
export default {
  components: {
    throngType,
    Map,
    RingBtn,
    AddressInfo,
    RealTimeVideo,
    WarningTrend,
    WarningAnalysis,
    EventInfo
  },
  mixins: [commonMixin, eventByLocationMixin],
  methods: {
    // 切换区域
    switchRegion (curItem) {
      // 刷新地图
      this.$refs.map.refreshMap(curItem)
      // 刷新圈层选项按钮
      this.$refs.ringBtn.refreshBtns()
      // 刷新左侧第一个组件
      this.$refs.addressInfo.refreshInfo(curItem)
      // 刷新左侧第二个组件
      this.$refs.realTimeVideo.updataVideo(curItem)
      // 刷新右侧第一个组件
      this.$refs.warningTrend.updataTrend(curItem)
      // 刷新右侧第二个组件
      this.$refs.warningAnalysis.updataAnalysis(curItem)
    },
    ringBtnSelect (arr) {
      this.$refs.map.refreshRing(arr)
    }
  }
}
</script>

<style>

</style>

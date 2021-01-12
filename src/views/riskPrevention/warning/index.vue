<template>
  <div class="page-container">
    <Tabs :tab-list="tabList" width="600px" :cur-index="7" />
    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-if="eventInfo"
        :vid="eventInfo.id"
        :position="[eventInfo.longitude, eventInfo.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div
          v-if="eventInfo.typeText === '政治安全'"
          class="zz-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="zz-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '社会治安'"
          class="sh-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="sh-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '矛盾纠纷'"
          class="md-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="md-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '公共安全'"
          class="gg-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="gg-twinkle"></div>
        </div>

        <div
          v-if="eventInfo.typeText === '网络安全'"
          class="wl-text-twinkle"
          @click="showEventDetail(eventInfo)"
        >
          <p>{{ eventTypeText }}</p>
          <div class="wl-twinkle"></div>
        </div>
      </el-amap-marker>

      <el-amap-marker
        v-for="item in zzaqList"
        :key="item.id + 's'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div class="zz-text-twinkle" @click="showEventDetail(item)">
          <p>政治安全</p>
          <div class="zz-twinkle"></div>
        </div>
      </el-amap-marker>

      <el-amap-marker
        v-for="item in shzaList"
        :key="item.id + 'z'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div class="sh-text-twinkle" @click="showEventDetail(item)">
          <p>社会治安</p>
          <div class="sh-twinkle"></div>
        </div>
      </el-amap-marker>

      <el-amap-marker
        v-for="item in mdjfList"
        :key="item.id + 'q'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div class="md-text-twinkle" @click="showEventDetail(item)">
          <p>矛盾纠纷</p>
          <div class="md-twinkle"></div>
        </div>
      </el-amap-marker>

      <el-amap-marker
        v-for="item in ggaqList"
        :key="item.id + 'd'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div class="gg-text-twinkle" @click="showEventDetail(item)">
          <p>公共安全</p>
          <div class="gg-twinkle"></div>
        </div>
      </el-amap-marker>

      <el-amap-marker
        v-for="item in wlyqList"
        :key="item.id + 'd'"
        :vid="item.id"
        :position="[item.longitude, item.latitude]"
        :offset="[-27, -40]"
        :topWhenClick="true"
      >
        <div class="wl-text-twinkle" @click="showEventDetail(item)">
          <p>网络安全</p>
          <div class="wl-twinkle"></div>
        </div>
      </el-amap-marker>
    </SimpleMap>

    <transition name="ani-left" mode="out-in" appear>
      <div class="page-left">
        <EventType></EventType>
        <TrendAnalysis></TrendAnalysis>
      </div>
    </transition>

    <transition name="ani-right" mode="out-in" appear>
      <div class="page-right">
        <watchInfo></watchInfo>
        <EventInfo @focusEvent="focusEvent" @todetails="todetails"/>
      </div>
    </transition>

    <!--事件信息弹框-->
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="
        modal = '';
        eventInfo = null;
      "
    />

    <!--事件指派或上报弹框-->
    <EventCirculationModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      :grid-code="gridCode"
      :people-label="peopleLabel"
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
  </div>
</template>

<script>
import SimpleMap from '@/components/SimpleMap'
import EventInfo from './EventInfo'
import EventType from './EventType'
import TrendAnalysis from './TrendAnalysis'
import WatchInfo from './WatchInfo'
import eventMixin from './evenModule/eventMixin'
import commonMixin from '../../riskPrevention/commonMixin'
import { queryGridThreeLine } from '@/api/smartData/gridView'
export default {
  components: {
    SimpleMap,
    EventInfo,
    EventType,
    WatchInfo,
    TrendAnalysis
  },
  mixins: [commonMixin, eventMixin],
  data() {
    return {
      map: null
    }
  },
  methods: {
    // 随机颜色
    randomColor() {
      const colorArr = ['#3B9AFE', '#00FFFF', '#246BBB', '#0055FF', '#A9DAFF']
      return colorArr[Math.floor(Math.random() * colorArr.length)]
    },
    // 初始化图层
    async renderGrid() {
      let gridArr = []
      const polygons = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
      }

      gridArr.forEach((item, index) => {
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.3,
          fillColor: this.randomColor(),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName
          }
        })

        polygons.push(ploygon)
      })

      this.map.add(polygons)
      // this.map.setFitView(polygons)
    }
  }
}
</script>
<style lang="scss" scoped></style>

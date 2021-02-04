<template>
  <div
    v-if="activeMes"
    class="activityInfo"
  >
    <div class="info-one">
      <svg-icon
        icon-class="com-name"
        class="icon"
      />
      <p>
        活动名称<span>{{ toActiveMes.name || activeInfo.name }}</span>
      </p>
    </div>
    <div class="info-one">
      <svg-icon
        icon-class="com-location"
        class="icon"
      />
      <p :title="toActiveMes.address">
        活动地点<span>{{ toActiveMes.address || activeInfo.address }}</span>
      <!--活动地点<span>省行政中心，南昌“城市大脑”，南昌市综治中心，青山湖区南钢街道综治中心，青山湖区人民法院，南昌县综治中心</span>-->
      </p>
    </div>
    <div class="info-one">
      <svg-icon
        icon-class="com-time"
        class="icon"
      />
      <p>
        活动时间<span>{{
          toActiveMes.activityStartTime || activeInfo.startTime
        }}</span>
      </p>
    </div>
    <div class="info-one">
      <svg-icon
        icon-class="com-active"
        class="icon"
      />
      <p>
        活动状态<span class="info-type">{{
          toActiveMes.statusText || activeInfo.status
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeMes: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      activeInfo: {
        name: '全省推进市域社会治理现代化试点工作现场会',
        address: '市综治中心,南昌县综治中心,青山湖南钢街道办,青山湖区法院...',
        allAddress:
          '市综治中心,南昌县综治中心,青山湖南钢街道办,青山湖区法院,红谷滩凤凰家园,市公安局,前湖迎宾馆',
        startTime: '2020-11-20',
        endTime: '2020-12-03',
        status: '未开始'
      }
    }
  },
  computed: {
    toActiveMes () {
      const activeMes = { ...this.activeMes }
      activeMes.address = ''
      activeMes.activityAddresses.forEach(item => {
        activeMes.address += item.address + ','
      })

      return activeMes
    }
  }
}
</script>

<style lang="scss" scoped>
.activityInfo {
  .info-one {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    .icon {
      font-size: 16px;
    }
    p {
      position: relative;
      margin-left: 6px;
      font-size: 16px;
      font-weight: bold;
      color: #3b9afe;
      line-height: 20px;
      span {
        margin-left: 10px;
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        color: #a9daff;
        line-height: 22px;
        width: 260px;
        position: absolute;
        top: -2px;
        left: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .info-type {
        color: #f2bd1b !important;
      }
    }
  }
}
</style>

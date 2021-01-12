<template>
  <div class="page-right">
    <ActiveInfo></ActiveInfo>
    <VisitsEvent />
    <AlarmInfo></AlarmInfo>
  </div>
</template>

<script>
import ActiveInfo from './activeInfo'
import VisitsEvent from './VisitsEvent'
import AlarmInfo from './alarmInfo'
export default {
  components: {
    ActiveInfo,
    AlarmInfo,
    VisitsEvent
  }
}
</script>

<style lang="scss" scoped>
.top,
.bottom {
  width: 420px;
  height: 420px;
  background: url("~@/assets/image/keyWaters/left-top.png") center center / 100%
    100% no-repeat;
  .title {
    margin: 10px 0 20px 10px;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
  }
}
.bottom {
  position: relative;
  .pieces {
    position: absolute;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    top: 30px;
    right: 30px;
  }
}
</style>

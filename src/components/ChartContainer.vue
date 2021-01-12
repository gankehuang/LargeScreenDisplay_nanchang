<template>
  <div class="chart-container" :style="chartStyle">
    <div class="title">{{ title }}</div>
    <div class="btn-slot">
      <slot name="btn" />
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'height'],
  data() {
    return {}
  },
  computed: {
    chartStyle() {
      return {
        height: `${this.height / 8.7}%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 329px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: url("~@/assets/image/chart/chart-bg_top.png"),
    url("~@/assets/image/chart/chart-bg_center.png"),
    url("~@/assets/image/chart/chart-bg_bottom.png");
  background-repeat: no-repeat;
  background-position-y: 0px, 34px, bottom;
  background-size: auto, 327px calc(100% - 49px), auto;
  background-position-x: 0px, 1px, 0px;
  .title {
    padding-left: 15px;
    line-height: 33px;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
  }
  .body {
    height: calc(100% - 34px);
  }
  .btn-slot {
    position: absolute;
    top: 5px;
    right: 10px;
  }
}
</style>

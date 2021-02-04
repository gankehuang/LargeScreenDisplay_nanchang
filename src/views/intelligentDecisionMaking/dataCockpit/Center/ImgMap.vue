<template>
  <div class="img-map-container">
    <div
      v-for="(item, index) in buttonList"
      :key="index"
      :class="[
        'data-view-map-button',
        { selected: selectedItem.name === item.name }
      ]"
      :style="item.style"
      @click="changeData(item)"
    >
      {{ item.name }}
    </div>
    <img :src="bg">
  </div>
</template>

<script>
import { buttonList, initTotalData } from '../mock'
const initBg = require('@/assets/image/dataView/map.png')
const initMapBg = require('@/assets/image/comprehensive/map-bg.png')
export default {
  data () {
    return {
      bg: initBg,
      mapBg: initMapBg,
      selectedItem: initTotalData,
      buttonList: buttonList
    }
  },
  methods: {
    changeData (item) {
      if (item.name === this.selectedItem.name) {
        this.selectedItem = initTotalData
        this.bg = initBg
      } else {
        this.selectedItem = item
        this.bg = item.imgUrl
      }
      this.$EventBus.$emit('update:datCocMapItem', this.selectedItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-map-container {
  position: fixed;
  top: 300px;
  right: 200px;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 970px;
  height: 832px;
  // background: url('~@/assets/image/dataView/map-container-bg.png') center center /
  //   100% 100% no-repeat;
}
.data-view-map-button {
  position: absolute;
  z-index: 10;
  width: 120px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #fff;
  padding-left: 20px;
  cursor: pointer;
  background: url("~@/assets/image/dataView/map-button.png") center center /
    100% 100% no-repeat;
}
.data-view-map-button.selected {
  background: url("~@/assets/image/dataView/map-button-selected.png") center
    center / 100% 100% no-repeat;
  color: #00ffff;
}
</style>

<template>
  <div class="position-bg">
    <div class="dd">
      定位地点
    </div>
    <el-amap-search-box
      class="search-box"
      placeholder="请输入定位地点"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchOption: {
        city: '南昌',
        citylimit: true
      }
    }
  },
  methods: {
    // 地图查询
    onSearchResult (pois) {
      this.$emit('updateSearchResult', [pois[0].lng, pois[0].lat])
    }
  }
}
</script>

<style lang="scss" scoped>
// 搜索
.position-bg {
  display: flex;
  width: 387px;
  height: 43px;
  background: url("~@/assets/image/gridView/location-pos.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 20px;
  z-index: 100;
  top: 222px;
  .dd {
    line-height: 43px;
    font-size: 16px;
    padding: 0 20px;
    color: #82c2ff;
  }
  ::v-deep .search-box {
    width: 252px;
    height: 36px;
    top: 3px;
    background-color: transparent;
    background-size: 100% 100%;
    z-index: 200 !important;
    border: 0;
    outline: 0;
    box-shadow: none;
    input {
      width: 100%;
      height: 100%;
      background-color: transparent !important;
      border: none;
      color: #a9daff;
    }
    .search-btn {
      display: none !important;
    }
    .search-tips {
      background: transparent;
      border: none;
      color: #b2d9fb;
    }
    .autocomplete-selected {
      background: #3b9afe !important;
    }
  }
}
</style>

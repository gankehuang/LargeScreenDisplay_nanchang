<template>
  <div class="locationType">
    <div class="box">
      <div
        class="list"
        v-for="(item, index) in leftTopList"
        :key="index"
        @click="tab(item)"
        :class="selectedItem === item.name ? 'item-selected' : ''"
      >
        <p class="type-title">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedItem: '省行政中心',
      leftTopList: [
        {
          isActive: false,
          title: '省行政中心',
          name: '省行政中心',
          lat: '28.640193',
          lon: '115.816114',
          img: require('@/assets/image/keyLocation/school.png'),
          onImg: require('@/assets/image/keyLocation/on-school.png')
        },
        {
          isActive: false,
          title: '市行政中心',
          name: '市行政中心',
          lat: '28.684541',
          lon: '115.859085',
          img: require('@/assets/image/keyLocation/hospital.png'),
          onImg: require('@/assets/image/keyLocation/on-hospital.png')
        },
        {
          isActive: false,
          title: '八一广场',
          name: '八一广场',
          lat: '28.67401',
          lon: '115.904464',
          img: require('@/assets/image/keyLocation/gasStation.png'),
          onImg: require('@/assets/image/keyLocation/on-gasStation.png')
        },
        {
          isActive: false,
          title: '秋水广场',
          name: '秋水广场',
          lat: '28.682829',
          lon: '115.862542',
          img: require('@/assets/image/keyLocation/constructionSite.png'),
          onImg: require('@/assets/image/keyLocation/on-constructionSite.png')
        }
      ]
    }
  },
  methods: {
    tab(item) {
      this.selectedItem = item.name
      this.$emit('focusKeyAreas', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.locationType {
  width: 100%;
  height: 95px;
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: center; /* 水平居中 */
  .box {
    width: 455px;
    padding: 0 30px;
    height: 95px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list {
      cursor: pointer;
      width: 87px;
      height: 36px;
      background: url("~@/assets/image/command/map-select-item.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      font-weight: 300;
      color: #ffffff;
    }
    .item-selected {
      background: url("~@/assets/image/KeyThrong/active0n.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>

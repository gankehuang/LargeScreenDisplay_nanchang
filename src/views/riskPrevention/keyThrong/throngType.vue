<template>
  <div class="location-list">
    <div
      v-for="(item, index) in pageBottomTab"
      :key="index"
      class="item"
      :class="selectedItem === item.name ? 'item-selected' : ''"
      @click="tab(item)"
    >
      <p class="type-title">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedItem: '省行政中心',
      pageBottomTab: [
        {
          isActive: false,
          title: 'province',
          name: '省行政中心',
          lat: '28.640193',
          lon: '115.816114',
          img: require('@/assets/image/keyLocation/school.png'),
          onImg: require('@/assets/image/keyLocation/on-school.png')
        },
        {
          isActive: false,
          title: 'administration',
          name: '市行政中心',
          lat: '28.684541',
          lon: '115.859085',
          img: require('@/assets/image/keyLocation/hospital.png'),
          onImg: require('@/assets/image/keyLocation/on-hospital.png')
        },
        {
          isActive: false,
          title: 'square',
          name: '八一广场',
          lat: '28.67401',
          lon: '115.904464',
          img: require('@/assets/image/keyLocation/gasStation.png'),
          onImg: require('@/assets/image/keyLocation/on-gasStation.png')
        },
        {
          isActive: false,
          title: 'qiushui',
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
    tab (item) {
      this.selectedItem = item.name
      this.$emit('switchRegion', item)
    }
  }
}
</script>
<style lang="scss" scoped>
  .location-list {
    padding: 0 30px;
    height: 95px;
    position: absolute;
    left: 50%;
    z-index: 99;
    bottom: 30px;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      width: 87px;
      height: 36px;
      background: url("~@/assets/image/command/map-select-item.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      font-weight: 300;
      color: #ffffff;
      margin-left: 15px;
      cursor: pointer;
      &:first-child {
      margin-left: 0;
      }
    }
    .item-selected {
      background: url("~@/assets/image/KeyThrong/active0n.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>

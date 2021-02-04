<template>
  <div class="locationType">
    <div class="box">
      <div
        v-for="(item, index) in leftTopList"
        :key="index"
        class="list"
        :class="selectedItem === item.icon ? 'item-selected' : ''"
        @click="tab(item)"
      >
        <img
          v-if="item.icon === selectedItem"
          :src="item.onImg"
          alt=""
        >
        <img
          v-else
          :src="item.img"
          alt=""
        >
        <p class="type-title">
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedItem: 'school',
      leftTopList: [
        {
          isActive: false,
          icon: 'school',
          title: '学校',
          name: '学校',
          img: require('@/assets/image/keyLocation/组 86 拷贝(1).png'),
          onImg: require('@/assets/image/keyLocation/组 86(1).png')
        },
        {
          isActive: false,
          icon: 'hospital',
          title: '医院',
          name: '医院',
          img: require('@/assets/image/keyLocation/组 86 拷贝(3).png'),
          onImg: require('@/assets/image/keyLocation/组 86(3).png')
        },
        {
          isActive: false,
          icon: 'gasStation',
          title: '加油站',
          name: '加油站',
          img: require('@/assets/image/keyLocation/组 86 拷贝(2).png'),
          onImg: require('@/assets/image/keyLocation/组 86(2).png')
        },
        {
          isActive: false,
          icon: 'constructionSite',
          title: '建筑工地',
          name: '建筑工地',
          img: require('@/assets/image/keyLocation/组 86 拷贝.png'),
          onImg: require('@/assets/image/keyLocation/组 86.png')
        },
        {
          isActive: false,
          icon: 'riverCrossingBridge',
          title: '过江大桥',
          name: '过江大桥',
          img: require('@/assets/image/keyLocation/组 86 拷贝(4).png'),
          onImg: require('@/assets/image/keyLocation/组 86(4).png')
        }
      ]
    }
  },
  methods: {
    tab (item) {
      this.selectedItem = item.icon
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
    width: 655px;
    padding: 0 75px;
    height: 95px;
    background: url("~@/assets/image/keyLocation/type-box.png") no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list {
      cursor: pointer;
      width: 60px;
      height: 60px;
      text-align: center;
      font-weight: 300;
      color: #ffffff;
    }
    .item-selected {
      color: #a9daff;
    }
  }
}
</style>

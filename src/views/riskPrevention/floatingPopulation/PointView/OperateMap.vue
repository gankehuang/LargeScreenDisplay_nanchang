<template>
  <div class="dots">
    <div
      v-for="(item1, index1) in dotList"
      :key="index1"
      :class="['dot', { active: item1.visible }]"
      @click="changeDot(item1, index1)"
    >
      <img :src="item1.visible ? item1.url : item1.url1">
      {{ item1.name }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dotList: [
        {
          name: '机场',
          url: require('@/assets/image/floatingPopulation/已点击飞机.png'),
          url1: require('@/assets/image/floatingPopulation/未点击飞机.png'),
          title: 'jc',
          visible: false
        },
        {
          name: '火车站',
          url: require('@/assets/image/floatingPopulation/已点击火车.png'),
          url1: require('@/assets/image/floatingPopulation/未点击火车.png'),
          title: 'hcz',
          visible: false
        },
        {
          name: '汽车站',
          url: require('@/assets/image/floatingPopulation/已点击汽车.png'),
          url1: require('@/assets/image/floatingPopulation/未点击汽车.png'),
          title: 'qcz',
          visible: false
        },
        {
          name: '高速公路',
          url: require('@/assets/image/floatingPopulation/已点击高速公路.png'),
          url1: require('@/assets/image/floatingPopulation/未点击高速公路.png'),
          title: 'gsgl',
          visible: false
        },
        {
          name: '道路卡口',
          url: require('@/assets/image/floatingPopulation/已点击卡口.png'),
          url1: require('@/assets/image/floatingPopulation/未点击卡口.png'),
          title: 'dlkk',
          visible: false
        }
      ]
    }
  },
  methods: {
    changeDot (item, index) {
      if (item.visible) {
        this.dotList.splice(index, 1, { ...item, visible: false })
        this.$emit('updateMapMarker', {
          // visible: item.visible,
          title: ''
        })
      } else {
        this.dotList.forEach((item, index) => {
          this.dotList[index].visible = false
        })
        this.dotList[index].visible = true
        this.$emit('updateMapMarker', {
          // visible: item.visible,
          title: item.title
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dots {
  width: 552px;
  height: 95px;
  background: url("~@/assets/image/floatingPopulation/line-bg.png") no-repeat
    center;
  background-size: 100% 100%;
  padding: 0 25px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -276px;
  display: flex;
  .dot {
    font-size: 14px;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    flex: 1;
    margin: 0 auto;
    cursor: pointer;
    img {
      display: block;
      width: 30px;
      height: 30px;
      margin: 20px auto 11px;
    }
  }
  .active {
    color: #3a9efe;
  }
}
</style>

<template>
  <div class="select-list">
    <div
      class="select-item"
      v-for="(item, index) in menuList"
      :key="index"
      :class="{ active: curIndex === index }"
      @click="handleMap(item, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curIndex: -1,
      menuList: [
        {
          active: false,
          name: '雪亮工程'
        },
        {
          active: false,
          name: '无人机'
        },
        {
          active: false,
          name: '指挥车'
        },
        {
          active: false,
          name: '单兵'
        },
        {
          active: false,
          name: '视联网'
        }
      ],
      handleMap(item, index) {
        this.curIndex = index
        this.menuList.forEach((item, index) => {
          if (this.curIndex !== index) {
            item.active = false
          }
        })
        this.menuList[index].active = !this.menuList[index].active
        !this.menuList[index].active ? (this.curIndex = -1) : null
        this.$emit('updateMapMarker', item)
        if (item.name === '可视化调度') {
          window.open(
            'https://120.76.189.28:18281/possecu_cs/97db7/login.htm',
            '_blank',
            'noopener=yes,noreferrer=yes'
          )
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select-list {
  position: absolute;
  z-index: 99;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  display: flex;
  background: url("~@/assets/image/command/map-operate-bg.png") no-repeat;
  background-position: bottom;
  padding: 20px 45px;
}
.select-item {
  margin-left: 15px;
  padding: 0 20px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: url("~@/assets/image/command/map-select-item.png") no-repeat;
  background-size: 100% 100%;
  color: #3292f4;
  cursor: pointer;
  &.active {
    background: url("~@/assets/image/command/map-select-active-item.png")
      no-repeat;
    background-size: 100% 100%;
  }
}
</style>

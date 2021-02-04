<template>
  <div class="select-list">
    <div
      v-for="(item, index) in menuList"
      :key="index"
      class="select-item"
      :class="{ active: curIndex === index }"
      @click="handleMap(item, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
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
      handleMap (item, index) {
        this.curIndex = index
        // 重置所有菜单，除当前点击项
        this.menuList.forEach((item, index) => {
          if (this.curIndex !== index) {
            item.active = false
          }
        })

        // 当前点击项切换状态
        this.menuList[index].active = !this.menuList[index].active

        // 如果当前点击项没有选中，则将 curIndex 重置
        if (!this.menuList[index].active) {
          (this.curIndex = -1)
        }

        this.$emit('menuUpdate', item)
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
  background: url("~@/assets/image/command/map-operate-bg.png") no-repeat bottom;
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

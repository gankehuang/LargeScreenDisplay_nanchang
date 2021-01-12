<template>
  <div class="device-contaier" slot="tool">
    <div class="device-selector" @click="switchMenu">
      <span class="title">工具</span>
      <img
        class="arrow"
        :class="menuActive && 'active'"
        src="@/assets/image/common/select-arrow.png"
      />
    </div>
    <transition name="menu">
      <div class="menu" v-if="menuActive">
        <div
          class="item"
          v-for="menu in menuList"
          :key="menu.name"
          :class="menu.active && 'active'"
          @click="bindToolBtn(menu.type)"
        >
          <img :src="menu.src" />
          <div>{{ menu.name }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['selected'],
  data() {
    return {
      menuActive: false,
      menuList: [
        {
          name: '矩形框选',
          src: require('@/assets/image/command/tool-rect.png'),
          type: 'rectangle'
        },
        {
          name: '圆形框选',
          src: require('@/assets/image/command/tool-round.png'),
          type: 'circle'
        },
        {
          name: '多边形框选',
          src: require('@/assets/image/command/tool-polygon.png'),
          type: 'polygon'
        },
        {
          name: '测距',
          src: require('@/assets/image/command/tool-distance.png'),
          type: 'distance'
        }
      ]
    }
  },
  watch: {
    selected() {
      this.menuList.forEach(menu => {
        if (this.selected.includes(menu.name)) {
          menu.active = true
        } else {
          menu.active = false
        }
      })
    }
  },
  methods: {
    bindToolBtn(type) {
      this.$emit('bindToolBtn', type)
      this.menuActive = false
    },
    switchMenu() {
      this.menuActive = !this.menuActive
    }
  }
}
</script>

<style lang="scss" scoped>
.device-contaier {
  position: absolute;
  top: 95px;
  left: 25%;
  z-index: 4;
  user-select: none;
}

.device-selector {
  width: 128px;
  height: 43px;
  background: url("~@/assets/image/command/tool-select-item.png");
  background-size: 100% 100%;
  cursor: pointer;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    line-height: 43px;
    padding-left: 24px;
  }
  .arrow {
    display: inline-block;
    margin-left: 40px;
    &.active {
      transform: rotate(180deg);
    }
  }
}

.menu {
  position: absolute;
  background: rgba(1, 35, 80, 0.74);
  border: 1px solid rgba(11, 97, 160, 1);
  padding: 10px 6px 5px 6px;
  top: 55px;
  left: 10px;
  border-radius: 5px;
  z-index: -1;
  .item {
    width: 68px;
    height: 48px;
    font-size: 12px;
    color: #b2e3fc;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.5s;
}

.menu-enter,
.menu-leave-to {
  opacity: 0;
}
</style>

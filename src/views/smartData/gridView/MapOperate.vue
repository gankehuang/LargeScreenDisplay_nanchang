<template>
  <div class="select-list">
    <div
      class="select-item"
      v-for="(item, index) in menuList"
      :key="index"
      :class="{ active: item.active }"
      @click.stop="handleMap(item, index)"
    >
      <svg-icon :icon-class="item.iconSrc" class="icon"></svg-icon>
      <span>{{ item.name }}</span>

      <div class="pullup-menu" v-if="item.active" v-clickoutside="handleClose">
        <div
          class="menu-item"
          v-for="(item1, index1) in item.children"
          :key="index1"
          :class="{ active: item1.active }"
          @click.stop="handleChild(index, index1)"
        >
          {{ item1.menuName }}
        </div>
      </div>
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
          name: '雪亮工程',
          iconSrc: 'camera',
          children: [
            {
              menuName: '天网',
              active: false
            },
            {
              menuName: '地网',
              active: false
            },
            {
              menuName: '社会资源',
              active: false
            },
            {
              menuName: '智慧云眼',
              active: false
            }
          ]
        },
        {
          active: false,
          name: '基层党组织',
          iconSrc: 'party',
          children: [
            {
              menuName: '红色网格',
              active: false
            },
            {
              menuName: '红色物业',
              active: false
            },
            {
              menuName: '红色驿站',
              active: false
            }
          ]
        },
        {
          active: false,
          name: '社会组织',
          iconSrc: 'sociology',
          children: [
            {
              menuName: '心防组织',
              active: false
            },
            {
              menuName: '法律援助组织',
              active: false
            },
            {
              menuName: '人民调解组织',
              active: false
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleMap(item, index) {
      this.menuList.forEach(item => (item.active = false))
      this.menuList[index].active = true
    },
    handleChild(index, index1) {
      const isSelect = this.menuList[index].children[index1].active

      this.menuList.forEach(item => {
        if (item.children.length) {
          item.children.forEach(item1 => {
            item1.active = false
          })
        }
      })

      this.menuList[index].children[index1].active = isSelect

      this.menuList[index].children[index1].active = !this.menuList[index]
        .children[index1].active

      this.$emit('updateMapMarker', {
        name: this.menuList[index].children[index1].menuName,
        active: this.menuList[index].children[index1].active
      })

      this.menuList.forEach(item => {
        item.active = false
      })
    },
    // 点击空白处下拉框关闭
    handleClose(e) {
      this.menuList.forEach(item => {
        item.active = false
      })
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: url("~@/assets/image/command/map-select-item.png") no-repeat;
  background-size: 100% 100%;
  color: #3292f4;
  cursor: pointer;

  .icon {
    font-size: 20px;
    padding-right: 5px;
  }

  & > img {
    margin-right: 6px;
  }

  &.active {
    background: url("~@/assets/image/command/map-select-active-item.png")
      no-repeat;
    background-size: 100% 100%;
  }

  .pullup-menu {
    user-select: none;
    padding-bottom: 10px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 122px;
    background: url("~@/assets/image/gridView/pullMenu-bg.png") no-repeat;
    background-size: 100% 100%;
    .menu-item {
      height: 40px;
      text-align: center;

      &.active {
        color: #a9daff;
        background: #173992;
      }
    }
  }

  &:nth-child(1) {
    .pullup-menu {
      top: -170px;
    }
  }

  &:nth-child(2) {
    .pullup-menu {
      top: -134px;
    }
  }

  &:nth-child(3) {
    .pullup-menu {
      top: -134px;
    }
  }
}
</style>

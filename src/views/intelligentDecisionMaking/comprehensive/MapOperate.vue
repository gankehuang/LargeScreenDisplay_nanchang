<template>
  <div class="select-list">
    <div
      v-for="(item, index) in menuList"
      :key="index"
      class="select-item"
      :class="{ active: item.active }"
      @click.stop="handleMap(item, index)"
    >
      <span>{{ item.name }}</span>

      <div
        v-if="item.active && item.children.length > 0"
        v-clickoutside="handleClose"
        class="pullup-menu"
      >
        <div
          v-for="(item1, index1) in item.children"
          :key="index1"
          class="menu-item"
          :class="{ active: item1.active }"
          @click.stop="handleChild(index, item1, index1)"
        >
          {{ item1.menuName }}
        </div>
      </div>
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
          name: '警情态势',
          children: []
        },
        {
          active: false,
          name: '访情态势',
          children: []
        }
      ]
    }
  },
  methods: {
    handleMap (item, index) {
      this.menuList[index].children.forEach(item => (item.active = false))
      this.menuList.forEach(item => (item.active = false))
      this.menuList[index].active = true
      if (item.name === '警情态势') {
        this.$router.push('/intelligentDecisionMaking/special/policeSituation')
      } else if (item.name === '访情态势') {
        this.$router.push(
          '/intelligentDecisionMaking/special/InterviewSituation'
        )
      }
    },
    handleChild (index, item1, index1) {
      this.menuList[index].children.forEach(item => (item.active = false))
      this.menuList[index].children[index1].active = true
      if (item1.menuName === '警情态势') {
        this.$router.push('/intelligentDecisionMaking/special/policeSituation')
      } else if (item1.menuName === '访情态势') {
        this.$router.push(
          '/intelligentDecisionMaking/special/InterviewSituation'
        )
      } else {
        window.open('http://nczfw.geostaryuqing.com:8080/login', '_blank')
      }
    },
    // 点击空白处下拉框关闭
    handleClose (e) {
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
  z-index: 4;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%) scale(1.2, 1.2);
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
  padding: 0 10px;
  height: 36px;
  margin-right: 15px;
  line-height: 36px;
  text-align: center;
  background: url("~@/assets/image/comprehensive/btn-off.png") no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  cursor: pointer;

  .icon {
    font-size: 20px;
    padding-right: 5px;
  }

  & > img {
    margin-right: 6px;
  }

  &.active {
    background: url("~@/assets/image/comprehensive/btn-on.png") no-repeat;
    background-size: 100% 100%;
    transform: scale(1.5);
  }

  .pullup-menu {
    padding-bottom: 10px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 122px;
    background: url("~@/assets/image/gridView/pullMenu-bg.png") no-repeat;
    background-size: 100% 100%;
    transform: scale(1.5);
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

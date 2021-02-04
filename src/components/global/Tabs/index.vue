<template>
  <div
    class="tabs"
    :style="{ width: width }"
  >
    <div
      v-for="(item, index) in tabList"
      :key="index"
      :class="['tab', { active: index === tab }]"
      @click="switchItem(index, item.url)"
    >
      {{ item.name }}
      <div
        v-if="isOpen && item.children && item.children.length > 0"
        class="subMenu"
      >
        <div
          v-for="(item2, index2) in item.children"
          :key="index2"
          class="subMenu-item"
          :class="{ active: item2.name === curChildName }"
          @click="switchItemChild(index2, item2)"
        >
          {{ item2.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { autoLogin } from '@/api/riskPrevention/law'
export default {
  props: {
    width: {
      type: String,
      default: '700px'
    },
    curIndex: {
      type: Number,
      default: 0
    },
    tabList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tab: 0,
      isOpen: false,
      curChildName: '',
      curRoutePath: ''
    }
  },
  mounted () {
    this.tab = this.curIndex
    this.curChildName = sessionStorage.getItem('tabsName')
  },
  methods: {
    switchItemChild (index, item) {
      if (item.url.indexOf('http') === -1) {
        this.$router.push(item.url)
      } else {
        if (item.url.indexOf('http://nczfw.geostaryuqing.com:8080/auth') > -1) {
          autoLogin().then(res => {
            const { status, data } = res
            if (status === 200) {
              window.open(
                `http://nczfw.geostaryuqing.com:8080/auth?token=${data.token}`,
                '_blank'
              )
            }
          })
        } else {
          window.open(item.url, '_blank')
        }
      }
      sessionStorage.setItem('tabsName', item.name)
      this.curChildName = item.name
    },
    switchItem (index, url) {
      if (this.tab !== index) {
        sessionStorage.setItem('tabsName', '')
        this.isOpen = false
      }
      this.isOpen = !this.isOpen
      this.tab = index
      if (url) {
        if (url.indexOf('http') === -1) {
          this.$router.push(url)
        } else {
          window.open(url, '_blank')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 700px;
  height: 50px;
  position: fixed;
  z-index: 998;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  background: url("~@/assets/image/common/tab-bg.png") no-repeat center;
  background-size: 100% 100%;
  display: flex;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  .tab {
    flex: 1;
    text-align: center;
    cursor: pointer;
    font-size: 18px;
  }
  .active {
    position: relative;
    color: #7ff2f4;
  }
  .active:after {
    content: "";
    position: absolute;
    left: 50%;
    margin-left: -2px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #7ff2f4;
  }
  .active .subMenu {
    display: block;
    .subMenu-item:hover {
      background: rgba(2, 30, 67, 0.9);
      color: #80f2f4;
    }
  }
  .subMenu {
    padding: 3px 0px;
    margin-top: 5px;
    line-height: 40px;
    display: none;
    background: rgba(0, 34, 92, 0.8);
    border: 1px solid rgba(59, 154, 254, 0.5);
    border-radius: 4px;
    font-size: 18px;
    color: #a9daff;
  }
}
</style>

<template>
  <div class="data-view-style">
    <socialGovernment
      v-if="socialGovernmentVisible"
      style="z-index:2001"
    />
    <Tabs
      :tab-list="tabList"
      width="260px"
      :cur-index="0"
    />
    <div class="data-view-map">
      <div
        v-for="(item, index) in buttonList"
        :key="index"
        :class="[
          'data-view-map-button',
          { selected: selectedItem.name === item.name }
        ]"
        :style="item.style"
        @click="changeData(item)"
      >
        {{ item.name }}
      </div>
      <img :src="bg">
    </div>
    <div class="data-view-left">
      <ul>
        <li
          :class="active == 2 ? 'hover' : ''"
          @click="handleTab(2)"
        >
          <div>
            <img
              src="@/assets/image/dataView/summary-left-icon1.png"
              alt=""
            >
          </div>
          <div>人</div>
        </li>
        <li
          :class="active == 3 ? 'hover' : ''"
          @click="handleTab(3)"
        >
          <div>
            <img
              src="@/assets/image/dataView/summary-left-icon2.png"
              alt=""
            >
          </div>
          <div>地</div>
        </li>
        <li
          :class="active == 4 ? 'hover' : ''"
          @click="handleTab(4)"
        >
          <div>
            <img
              src="@/assets/image/dataView/summary-left-icon3.png"
              alt=""
            >
          </div>
          <div>事</div>
        </li>
        <li
          :class="active == 5 ? 'hover' : ''"
          @click="handleTab(5)"
        >
          <div>
            <img
              src="@/assets/image/dataView/summary-left-icon4.png"
              alt=""
            >
          </div>
          <div>物</div>
        </li>
        <li
          :class="active == 6 ? 'hover' : ''"
          @click="handleTab(6)"
        >
          <div>
            <img
              src="@/assets/image/dataView/summary-left-icon5.png"
              alt=""
            >
          </div>
          <div>网</div>
        </li>
        <li
          :class="active == 7 ? 'hover' : ''"
          @click="handleTab(7)"
        >
          <div>
            <img
              src="@/assets/image/dataView/summary-left-icon6.png"
              alt=""
            >
          </div>
          <div>组织</div>
        </li>
      </ul>
    </div>
    <div class="data-view-right">
      <div class="data-view-right">
        <div
          v-if="active == 2"
          class="pandect"
        >
          <Poplation />
          <!-- <img src="@/assets/image/dataView/ren.png"> -->
        </div>
        <div
          v-if="active == 3"
          class="pandect"
        >
          <Ground />
          <!-- <img src="@/assets/image/dataView/di.png"> -->
        </div>
        <div
          v-if="active == 4"
          class="pandect"
        >
          <Things />
          <!-- <img src="@/assets/image/dataView/shi.png"> -->
        </div>
        <div
          v-if="active == 5"
          class="pandect"
        >
          <Matter />
          <!-- <img src="@/assets/image/dataView/wu.png"> -->
        </div>
        <div
          v-if="active == 6"
          class="pandect"
        >
          <NetWork />
          <!-- <img src="@/assets/image/dataView/wang.png"> -->
        </div>
        <div
          v-if="active == 7"
          class="organization"
        >
          <!-- <img src="@/assets/image/dataView/zuzhi1.png"> -->
          <Organization />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import pandect from './module/pandect'
import commonMixin from '../commonMixin'
import Ground from './module/Ground'
import Poplation from './module/Population'
import Things from './module/Things'
import Matter from './module/Matter'
import NetWork from './module/Network'
import Organization from './module/Organization/index'
import socialGovernment from '@/views/socialGovernment/index'
const initBg = require('@/assets/image/dataView/map.png')
const initTotalData = {
  name: '南昌市',
  code: '3601',
  area: '7402km²',
  produce: '5596.18亿元',
  totalThing: 560,
  endThing: 500
}
export default {
  components: {
    // pandect,
    Ground,
    Poplation,
    Things,
    Matter,
    NetWork,
    Organization,
    socialGovernment
  },
  mixins: [commonMixin],
  data () {
    return {
      bg: initBg,
      active: this.$route.query.active,
      selectedItem: initTotalData,
      tabName: '',
      socialGovernmentVisible: false,
      mesList: [],
      personNum: 0,
      placeNum: 0,
      eventNum: 0,
      goodsNum: 0,
      organNum: 0,
      mediaNum: 0,
      buttonList: [
        {
          name: '安义县',
          code: '360123',
          area: '665.49 km²',
          produce: '120.19亿元',
          totalThing: 60,
          endThing: 50,
          style: 'top: 165px;left:205px',
          imgUrl: require('@/assets/image/dataView/anyi-map.png')
        },
        {
          name: '南昌县',
          code: '360121',
          area: '1810.7 km²',
          produce: '1027.8亿元',
          totalThing: 48,
          endThing: 30,
          style: 'top:280px;left:580px',
          imgUrl: require('@/assets/image/dataView/nanchang-map.png')
        },
        {
          name: '新建区',
          code: '360122',
          area: '2121.1 km²',
          produce: '375.14亿元',
          style: 'top:100px;left:525px',
          totalThing: 52,
          endThing: 38,
          imgUrl: require('@/assets/image/dataView/xinjian-map.png')
        },
        {
          name: '新建区',
          code: '360122',
          area: '2121.1 km²',
          produce: '375.14亿元',
          totalThing: 56,
          endThing: 39,
          style: 'top:325px;left:285px',
          imgUrl: require('@/assets/image/dataView/xinjian-map.png')
        },
        {
          name: '进贤县',
          code: '360124',
          area: '1952 km²',
          produce: '362.68亿元',
          totalThing: 62,
          endThing: 39,
          style: 'top:320px;left:780px',
          imgUrl: require('@/assets/image/dataView/jinxian-map.png')
        },
        {
          name: '西湖区',
          code: '360103',
          area: '34.8 km²',
          produce: '527.7亿元',
          totalThing: 60,
          endThing: 45,
          style: 'top:235px;left:395px',
          imgUrl: require('@/assets/image/dataView/xihu-map.png')
        },
        {
          name: '东湖区',
          code: '360102',
          area: '56.95 km²',
          produce: '513.05亿',
          totalThing: 52,
          endThing: 38,
          style: 'top:200px;left:405px',
          imgUrl: require('@/assets/image/dataView/donghu-map.png')
        },
        {
          name: '红谷滩区',
          code: '360106',
          area: '175 km²',
          produce: '927.05亿',
          totalThing: 58,
          endThing: 48,
          style: 'top:285px;left:325px',
          imgUrl: require('@/assets/image/dataView/honggutan-map.png')
        },
        {
          name: '湾里管理局',
          code: '360105',
          area: '251 km²',
          produce: '64.2509亿元',
          totalThing: 68,
          endThing: 57,
          style: 'top: 205px;left:275px',
          imgUrl: require('@/assets/image/dataView/wanli-map.png')
        },
        {
          name: '青山湖区',
          code: '360111',
          area: '251 km²',
          produce: '127.6亿元',
          totalThing: 48,
          endThing: 34,
          style: 'top:230px;left:520px',
          imgUrl: require('@/assets/image/dataView/qingshanhu-map.png')
        },
        {
          name: '高新区',
          code: '360107',
          area: '286 km²',
          produce: '827.6亿元',
          totalThing: 78,
          endThing: 64,
          style: 'top:190px;left:530px',
          imgUrl: require('@/assets/image/dataView/gaoxin-map.png')
        },
        {
          name: '经开区',
          code: '360125',
          area: '158 km²',
          produce: '527.6亿元',
          totalThing: 58,
          endThing: 44,
          style: 'top: 155px;left:405px',
          imgUrl: require('@/assets/image/dataView/jingkai-map.png')
        },
        {
          name: '青云谱区',
          code: '360104',
          area: '43.2 km²',
          produce: '332.67 亿元',
          totalThing: 56,
          endThing: 49,
          style: 'top:270px;left:440px',
          imgUrl: require('@/assets/image/dataView/qingyunpu-map.png')
        }
      ]
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:socialGovernmentVisible')
  },
  mounted () {
    this.$EventBus.$on(
      'update:socialGovernmentVisible',
      res => (this.socialGovernmentVisible = res)
    )
    this.socialGovernmentVisible = this.$route.query.socialGovernment
  },
  methods: {
    changeData (item) {
      if (item.name === '进贤县' && this.tabName !== '进贤县') {
        this.tabName = item.name
      } else {
        this.tabName = ''
      }

      if (item.name === this.selectedItem.name) {
        this.selectedItem = initTotalData
        this.bg = initBg
      } else {
        this.selectedItem = item
        this.bg = item.imgUrl
      }

      this.$EventBus.$emit('update:dataViewSeleItem', this.selectedItem)
    },
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    handleTab (activeIndex) {
      this.active = activeIndex
      this.changeData(this.selectedItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.data-view-style {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/dataView/page-bg.png") no-repeat center
    center;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .data-view-map {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 1279px;
    height: 720px;
    background: url("~@/assets/image/dataView/map-container-bg.png") center
      center / 100% 100% no-repeat;
  }
  .data-view-map1 {
    position: absolute;
    left: 9%;
    bottom: 12%;
    .first-img {
      width: 100%;
      height: 100%;
      position: relative;
      top: 97px;
      left: -124px;
    }
  }
  .data-view-left {
    position: absolute;
    left: 1%;
    top: 12%;
    width: 110px;
    // height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ul {
      padding: 0px;
      margin: 0px;
      color: #fff;
      list-style: none;
      li {
        cursor: pointer;
        width: 110px;
        height: 118px;
        background: url("~@/assets/image/dataView/li-bg.png") no-repeat center
          center;
        padding: 12px;
        margin-bottom: 10px;
        color: #7ebdff;
        div {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
        }
        img {
          display: block;
          margin: 6px auto;
          width: 66px;
          height: 50px;
        }
      }
      li:hover,
      li.hover {
        background: url("~@/assets/image/dataView/li-hover-bg.png") no-repeat
          center center;
      }
    }
  }
  .data-view-right {
    position: absolute;
    top: 61px;
    right: 15px;
    width: 855px;
    height: calc(100% - 61px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .pandect {
      width: 870px;
      height: 574px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .pandect-frist {
      width: 920px;
      height: 780px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .organization {
      width: 855px;
      height: 572px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }

  .data-view-map-button {
    position: absolute;
    z-index: 999;
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    padding-left: 20px;
    cursor: pointer;
    background: url("~@/assets/image/dataView/map-button.png") center center /
      100% 100% no-repeat;
  }
  .data-view-map-button.selected {
    background: url("~@/assets/image/dataView/map-button-selected.png") center
      center / 100% 100% no-repeat;
    color: #00ffff;
  }
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
</style>

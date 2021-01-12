<template>
  <div :class="['data-view-style', { 'summary-bg': active === 1 }]">
    <socialGovernment
      style="z-index:10000"
      v-if="socialGovernmentVisible"
    />
    <Tabs
      :tab-list="tabList"
      width="260px"
      :cur-index="0"
    />
    <div class="summary-left">
      <div
        class="tab-item"
        @click="active = 2"
      >
        <div class="item-left">
          <img
            src="@/assets/image/dataView/summary-left-icon1.png"
            alt=""
          />
          人
        </div>
        <div class="item-right">
          <div class="name">
            人-主题库
          </div>
          {{ personNum }} <span>条</span>
        </div>
      </div>
      <div
        class="tab-item"
        @click="active = 3"
      >
        <div class="item-left">
          <img
            src="@/assets/image/dataView/summary-left-icon2.png"
            alt=""
          />
          地
        </div>
        <div class="item-right">
          <div class="name">
            地-主题库
          </div>
          {{ placeNum }} <span>条</span>
        </div>
      </div>
      <div
        class="tab-item"
        @click="active = 4"
      >
        <div class="item-left">
          <img
            src="@/assets/image/dataView/summary-left-icon3.png"
            alt=""
          />
          事
        </div>
        <div class="item-right">
          <div class="name">
            事-主题库
          </div>
          {{ eventNum }} <span>条</span>
        </div>
      </div>
      <div
        class="tab-item"
        @click="active = 5"
      >
        <div class="item-left">
          <img
            src="@/assets/image/dataView/summary-left-icon4.png"
            alt=""
          />
          物
        </div>
        <div class="item-right">
          <div class="name">
            物-主题库
          </div>
          {{ goodsNum }}<span>条</span>
        </div>
      </div>
      <div
        class="tab-item"
        @click="active = 6"
      >
        <div class="item-left">
          <img
            src="@/assets/image/dataView/summary-left-icon5.png"
            alt=""
          />
          网
        </div>
        <div class="item-right">
          <div class="name">
            网-主题库
          </div>
          {{ mediaNum }}<span>条</span>
        </div>
      </div>
      <div
        class="tab-item"
        @click="active = 7"
      >
        <div class="item-left">
          <img
            src="@/assets/image/dataView/summary-left-icon6.png"
            alt=""
          />
          组织
        </div>
        <div class="item-right">
          <div class="name">
            组织-主题库
          </div>
          {{ organNum }}<span>条</span>
        </div>
      </div>
    </div>
    <div class="summary">
      <div class="sum">
        <div>
          数据总量
        </div>
        <span>
          <CountTop :total="Number(totalNum.total)" />
        </span>条
      </div>
      <div class="sum">
        <div>
          今日新增
        </div>
        <span>
          <CountTop :total="Number(totalNum.addedToday)" />
        </span>条
      </div>
    </div>
    <div class="summary-center">
      <img
        src="@/assets/image/dataView/summary-center2.gif"
        v-if="isStartGif"
      />
    </div>
    <div
      class="summary-right"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba( 0, 0, 0, 0.3)"
    >
      <el-scrollbar style="height: 100%;">
        <div
          class="summary-line"
          v-for="(item, index) in mesList"
          :key="index"
        >
          <svg-icon
            :icon-class="item.icon"
            class="icon"
          />
          {{ item.name }}
          <div class="count">
            <span>{{ item.sum }}</span>
            条
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {
  getDeptData,
  getThemeLibrary,
  queryDataGeneral,
  faceSnapCount
} from '@/api/smartData/dataView'
import CountTop from '@/components/CountTop'
const initBg = require('@/assets/image/dataView/map.png')
const initTotalData = {
  name: '南昌市',
  code: '3601',
  area: '7402km²',
  produce: '5596.18亿元',
  totalThing: 560,
  endThing: 500
}
// import pandect from './module/pandect'
import commonMixin from '../commonMixin'
import socialGovernment from '@/views/socialGovernment/index'
export default {
  components: {
    // pandect,
    socialGovernment,
    CountTop
  },
  beforeDestroy() {
    this.$EventBus.$off('update:socialGovernmentVisible')
    this.$EventBus.$off('update:showGif')
    clearTimeout(this.setTimeOutId)
  },
  mounted() {
    if (this.$route.query.socialGovernment) {
      this.$EventBus.$on('update:showGif', (res) => {
        this.isStartGif = true
      })
    } else {
      this.isStartGif = true
    }

    this.$EventBus.$on('update:socialGovernmentVisible', (res) => {
      this.socialGovernmentVisible = res
    })
    this.socialGovernmentVisible = this.$route.query.socialGovernment
    this.getDeptData()
    this.getQueryDataGeneral()
    this.getFaceSnapCount()
    this.getNewCount()
    this.$nextTick(() => {
      this.getThemeLibrary()
    })
  },
  mixins: [commonMixin],
  data() {
    return {
      isStartGif: false,
      setTimeOutId: null,
      bg: initBg,
      active: 1,
      selectedItem: initTotalData,
      tabName: '',
      socialGovernmentVisible: false,
      mesList: [
        {
          icon: 'PublicSecurity (2)',
          name: '公安',
          sum: 0
        },
        {
          icon: 'Administration',
          name: '市政',
          sum: 0
        },
        {
          icon: 'naturalresources',
          name: '自然资源',
          sum: 0
        },
        {
          icon: 'court',
          name: '法院',
          sum: 0
        },
        {
          icon: 'supervise',
          name: '市监',
          sum: 0
        },
        {
          icon: 'Letters-and-visits',
          name: '信访',
          sum: 0
        },
        {
          icon: 'countryside',
          name: '农业农村',
          sum: 0
        },
        {
          icon: 'judicial',
          name: '司法',
          sum: 0
        },
        {
          icon: 'firecontrol',
          name: '消防',
          sum: 0
        },
        {
          icon: 'meet-an-emergency',
          name: '应急',
          sum: 0
        },
        {
          icon: 'civil-administration',
          name: '民政',
          sum: 0
        },
        {
          icon: 'Traffic-control',
          name: '交管',
          sum: 0
        },
        {
          icon: 'housing-management',
          name: '房管',
          sum: 0
        },
        {
          icon: 'Health',
          name: '卫健',
          sum: 0
        },
        {
          icon: 'education',
          name: '教育',
          sum: 0
        }
      ],
      totalNum: {
        total: null,
        addedToday: null
      },
      personNum: 0,
      placeNum: 0,
      eventNum: 0,
      goodsNum: 0,
      organNum: 0,
      mediaNum: 0,
      loading: false,
      showPart: false,
      lastAppend: 0,
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
  watch: {
    active() {
      if (this.active !== 1) {
        this.$router.push(`/smartData/dataView/part?active=${this.active}`)
      }
    }
  },
  methods: {
    getQueryDataGeneral() {
      queryDataGeneral().then((res) => {
        if (res.status === 200) {
          this.totalNum.total = res.data.total
          // this.totalNum.addedToday = res.data.today
        }
      })
    },
    getFaceSnapCount() {
      const day = new Date().toLocaleDateString().split('/').join('-')
      faceSnapCount({
        beginTime: day + ' 00:00:00',
        endTime: day + ' 23:59:59'
      }).then((res) => {
        if (res.status === 200) {
          this.totalNum.addedToday = parseInt(res.data / 10)
          this.totalNum.total += this.totalNum.addedToday - this.lastAppend
          this.lastAppend = this.totalNum.addedToday
        }
      })
    },
    getNewCount() {
      this.setTimeOutId = setInterval(() => {
        this.getFaceSnapCount()
      }, 5000)
    },
    getDeptData() {
      this.loading = true
      getDeptData().then((res) => {
        if (res.status === 200) {
          this.loading = false
          this.mesList[0].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('公安') !== -1)[0].sum
          )
          this.mesList[1].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('燃气') !== -1)[0].sum
          )
          // this.mesList[1].sum =+ res.data.filter(item=>item.name.indexOf('水') !== -1)[0].sum
          this.mesList[2].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('自然资源') !== -1)[0]
              .sum
          )
          this.mesList[3].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('法院') !== -1)[0].sum
          )
          this.mesList[4].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('市') !== -1)[0].sum
          )
          this.mesList[5].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('信访') !== -1)[0].sum
          )
          this.mesList[6].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('农业农村') !== -1)[0]
              .sum
          )
          this.mesList[7].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('司法') !== -1)[0].sum
          )
          this.mesList[8].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('消防') !== -1)[0].sum
          )
          this.mesList[9].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('应急') !== -1)[0].sum
          )
          this.mesList[10].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('民政') !== -1)[0].sum
          )
          this.mesList[11].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('交管') !== -1)[0].sum
          )
          this.mesList[12].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('房管') !== -1)[0].sum
          )
          this.mesList[13].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('卫') !== -1)[0].sum
          )
          this.mesList[14].sum = this.toThousands(
            res.data.filter((item) => item.name.indexOf('教育') !== -1)[0].sum
          )
        }
      })
    },
    getThemeLibrary() {
      getThemeLibrary().then((res) => {
        if (res.status === 200) {
          if (!this.totalNum.total) {
            res.data.map(item => (this.totalNum.total += item.sum))
          }
          this.personNum = this.toThousands(
            res.data.filter(
              (item, index) => item.lib_NAME.indexOf('人') !== -1
            )[0].sum
          )
          this.placeNum = this.toThousands(
            res.data.filter(
              (item, index) => item.lib_NAME.indexOf('地') !== -1
            )[0].sum
          )
          this.eventNum = this.toThousands(
            res.data.filter(
              (item, index) => item.lib_NAME.indexOf('事') !== -1
            )[0].sum
          )
          this.goodsNum = this.toThousands(
            res.data.filter(
              (item, index) => item.lib_NAME.indexOf('物') !== -1
            )[0].sum
          )
          this.organNum = this.toThousands(
            res.data.filter(
              (item, index) => item.lib_NAME.indexOf('组织') !== -1
            )[0].sum
          )
          this.mediaNum = this.toThousands(
            res.data.filter(
              (item, index) => item.lib_NAME.indexOf('网') !== -1
            )[0].sum
          )
          // res.data.forEach(item => {
          //   this.total += item.sum
          // })
        }
      })
    },
    changeData(item) {
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
    compare(property) {
      return function(a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    toThousands(num) {
      const result = []
      var counter = 0
      num = (num || 0).toString().split('')
      for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result.unshift(num[i])
        if (!(counter % 3) && i !== 0) {
          result.unshift(',')
        }
      }
      return result.join('')
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
  background: url('~@/assets/image/dataView/page-bg.png') no-repeat center
    center;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .data-view-map {
    position: absolute;
    left: 0px;
    bottom: 0px;
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
  .button {
    position: absolute;
    z-index: 999;
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    padding-left: 20px;
    cursor: pointer;
    background: url('~@/assets/image/dataView/map-button.png') center center /
      100% 100% no-repeat;
  }
  .button.selected {
    background: url('~@/assets/image/dataView/map-button-selected.png') center
      center / 100% 100% no-repeat;
    color: #00ffff;
  }
  .summary-left {
    position: absolute;
    left: 1%;
    top: 12%;
    z-index: 10;
    .tab-item {
      width: 290px;
      height: 118px;
      margin-bottom: 10px;
      background: url('~@/assets/image/dataView/summary-left-item-bg-active.png')
        no-repeat center;
      background-size: 100% 100%;
      padding: 19px 0 0 24px;
      display: flex;
      color: #7dbcff;
      font-weight: bold;
      cursor: pointer;
      .item-left {
        line-height: 32px;
        font-size: 24px;
        text-align: center;
        img {
          display: block;
          margin: 0 auto;
          width: 60px;
          height: 50px;
        }
      }
      .item-right {
        padding: 7px 0 0 34px;
        line-height: 32px;
        letter-spacing: 2px;
        font-size: 22px;
        .name {
          color: #a9daff;
          letter-spacing: 1px;
          font-size: 18px;
        }
        span {
          font-size: 18px;
          font-weight: normal;
        }
      }
    }
    .tab-item:hover {
      background: url('~@/assets/image/dataView/summary-left-item-bg.png')
        no-repeat center;
      background-size: 100% 100%;
    }
  }
  .summary-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1200px;
    height: 800px;
    margin: -326px 0 0 -598px;
    z-index: 1;
  }
  .summary {
    position: absolute;
    top: 13%;
    left: 20%;
    width: 205px;
    height: 250px;
    background: url('~@/assets/image/dataView/summary-total-bg.png') no-repeat
      center;
    background-size: 100% 100%;
    text-align: center;
    z-index: 10;
    .sum {
      padding: 20px 0;
      line-height: 36px;
      font-size: 12px;
      color: #a9daff;
      span {
        position: relative;
        top: -7px;
        font-size: 28px;
        font-weight: bold;
        color: #e6b00e;
      }
      div {
        font-size: 16px;
        margin-top: -3px;
      }
    }
  }
  .summary-right {
    position: absolute;
    right: 1%;
    top: 12%;
    width: 320px;
    height: 760px;
    padding: 23px 17px;
    background: url('~@/assets/image/dataView/summary-right-bg.png') no-repeat
      center;
    background-size: 100% 100%;
    z-index: 10;
    .summary-line {
      background: url('~@/assets/image/dataView/summary-right-item-bg.png')
        no-repeat center;
      background-size: 100% 100%;
      display: flex;
      padding: 20px 12px;
      margin-bottom: 4px;
      font-size: 18px;
      color: #a9daff;
      font-weight: bold;
      .icon {
        width: 21px;
        height: 21px;
        margin-right: 10px;
        color: #6fbcff;
      }
      .count {
        flex: 1;
        font-size: 14px;
        text-align: right;
        font-weight: normal;
        letter-spacing: 1px;
        span {
          font-size: 20px;
          color: #64b8ff;
          margin-right: 5px;
          font-weight: bold;
        }
      }
    }
  }
}
.summary-bg {
  background: url('~@/assets/image/dataView/summary-bg.png') no-repeat center
    center;
  background-size: 100% 100%;
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
</style>

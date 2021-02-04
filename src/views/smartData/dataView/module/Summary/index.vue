<template>
  <div class="summary-container">
    <div class="left">
      <div class="left-top">
        <div class="top-line">
          <div class="top-flex">
            <div class="count">
              25,104,746
              <span>条</span>
            </div>
            <div class="top-title">
              汇聚数量总量
            </div>
          </div>
          <div class="top-flex">
            <div class="count">
              6128
              <span>条</span>
            </div>
            <div class="top-title">
              今日新增数据
            </div>
          </div>
        </div>
        <div class="top-line">
          <div class="top-flex">
            <div class="count">
              5596.18
              <span>亿元</span>
            </div>
            <div class="top-title">
              经济生产总值(GDP)
            </div>
          </div>
          <div class="top-flex">
            <div class="count">
              7402
              <span> km²</span>
            </div>
            <div class="top-title">
              南昌市(县区)区域面积
            </div>
          </div>
        </div>
      </div>
      <div class="left-bottom">
        <div class="title">
          主题库数据
        </div>
        <div class="bottom-center">
          <div class="item">
            <svg-icon
              icon-class="summary-icon1"
              class="svg-icon"
            />
            人口库
            <div class="count">
              {{ personNum }} <span>条</span>
            </div>
          </div>
          <div class="item">
            <svg-icon
              icon-class="summary-icon2"
              class="svg-icon"
            />
            地址库
            <div class="count">
              {{ placeNum }}<span>条</span>
            </div>
          </div>
          <div class="item">
            <svg-icon
              icon-class="summary-icon3"
              class="svg-icon"
            />
            事件库
            <div class="count">
              {{ eventNum }}<span>条</span>
            </div>
          </div>
          <div class="item">
            <svg-icon
              icon-class="summary-icon4"
              class="svg-icon"
            />
            物品库
            <div class="count">
              {{ goodsNum }}<span>条</span>
            </div>
          </div>
          <div class="item">
            <svg-icon
              icon-class="summary-icon5"
              class="svg-icon"
            />
            组织库
            <div class="count">
              {{ organNum }}<span>条</span>
            </div>
          </div>
          <div class="item">
            <svg-icon
              icon-class="summary-icon6"
              class="svg-icon"
            />
            舆情库
            <div class="count">
              {{ mediaNum }}<span>条</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">
        部门数据
      </div>
      <div class="right-title">
        大数据中心
      </div>
      <div class="right-center">
        <div class="flex-left">
          <div
            v-for="(item, index) in leftList"
            :key="index"
            class="item"
          >
            <div class="count">
              {{ item.sum }} <span>条</span>
            </div>
            {{ item.name }}
          </div>
        </div>
        <img
          class="tree"
          src="@/assets/image/dataView/summary-right-tree.png"
          alt=""
        >
        <div class="flex-right">
          <div
            v-for="(item, index) in rightList"
            :key="index"
            class="item"
          >
            {{ item.name }}
            <div class="count">
              {{ item.sum }} <span>条</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDeptData, getThemeLibrary } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      leftList: [
        {
          name: '公安',
          count: 735074
        },
        {
          name: '农业农村',
          count: 32469
        },
        {
          name: '司法',
          count: 30960
        },
        {
          name: '法院',
          count: 84178
        },
        {
          name: '消防',
          count: 9521
        },
        {
          name: '教育',
          count: 3
        },
        {
          name: '自然资源',
          count: 430364
        },
        {
          name: '燃气',
          count: 1971649
        }
      ],
      rightList: [
        {
          name: '市监',
          count: 71780
        },
        {
          name: '民政',
          count: 917
        },
        {
          name: '城管',
          count: 4462514
        },
        {
          name: '卫健',
          count: 25
        },
        {
          name: '交管',
          count: 312
        },
        {
          name: '信访',
          count: 47047
        },
        {
          name: '应急管理',
          count: 3480
        },
        {
          name: '物业',
          count: 304
        }
      ],
      personNum: 0,
      placeNum: 0,
      eventNum: 0,
      goodsNum: 0,
      organNum: 0,
      mediaNum: 0
    }
  },
  mounted () {
    this.getDeptData()
  },
  methods: {
    getDeptData () {
      getDeptData().then(res => {
        if (res.status === 200) {
          this.leftList = res.data.filter((item, index) => index % 2 === 0)
          this.rightList = res.data.filter((item, index) => index % 2 !== 0)
        }
      })
      getThemeLibrary().then(res => {
        if (res.status === 200) {
          this.personNum = res.data.filter(
            (item, index) => item.name.indexOf('人口') !== -1
          )[0].sum
          this.personNum = this.toThousands(this.personNum)
        }
      })
    },
    toThousands (num) {
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
.summary-container {
  width: 100%;
  height: 100%;
  padding-top: 108px;
  color: #ffff;
  display: flex;
  justify-content: space-between;
  .title {
    padding-left: 20px;
    line-height: 40px;
    font-size: 16px;
    color: #7dbcff;
    font-weight: bold;
  }
  .left {
    width: 421px;
    .left-top {
      .top-line {
        display: flex;
        .top-flex {
          width: 205px;
          height: 89px;
          margin-bottom: 10px;
          background: url("~@/assets/image/dataView/summary-left-bg1.png")
            no-repeat center;
          background-size: 100% 100%;
          padding-top: 16px;
          .top-title {
            line-height: 24px;
            font-size: 16px;
            color: #a9daff;
            text-align: center;
          }
          .count {
            line-height: 36px;
            font-size: 28px;
            color: #e6b00e;
            font-weight: bold;
            text-align: center;
            span {
              font-size: 12px;
              color: #a9daff;
              margin-left: 3px;
            }
          }
          &:last-child {
            margin-left: 5px;
            width: 211px;
            background: url("~@/assets/image/dataView/summary-left-bg2.png")
              no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
    }
    .left-bottom {
      height: 360px;
      background: url("~@/assets/image/dataView/summary-left-bg3.png") no-repeat
        center;
      background-size: 100% 100%;
      .bottom-center {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 24px 24px 0;
        .item {
          width: 180px;
          height: 77px;
          background: url("~@/assets/image/dataView/summary-left-item.png")
            no-repeat center;
          background-size: 100% 100%;
          margin-bottom: 13px;
          padding: 13px 0 0 0;
          line-height: 20px;
          font-size: 16px;
          color: #fff;
          font-weight: bold;
          // text-align: center;
          overflow: hidden;
          .svg-icon {
            font-size: 20px;
            color: #80f4e7;
            margin-left: 27px;
          }
          .count {
            line-height: 36px;
            font-size: 28px;
            font-weight: bold;
            color: #a9daff;
            text-align: center;
            span {
              font-size: 12px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .right {
    width: 500px;
    height: 558px;
    // padding-left: 10px;
    background: url("~@/assets/image/dataView/summary-right-bg1.png") no-repeat
      center;
    background-size: 100% 100%;
    position: relative;
    // overflow: hidden;
    .right-title {
      line-height: 20px;
      font-size: 16px;
      color: #d1fff9;
      font-weight: bold;
      position: absolute;
      top: 36px;
      left: 190px;
    }
    .right-center {
      position: relative;
      overflow: hidden;
      .tree {
        display: block;
        margin: 0 90px 0 150px;
        width: 220px;
        height: 558px;
        position: relative;
        top: -40px;
      }
      .flex-left {
        position: absolute;
        width: 210px;
        left: 0px;
        top: 58px;
        .item {
          text-align: right;
        }
      }
      .flex-right {
        width: 220px;
        position: absolute;
        right: -30px;
        top: 38px;
      }
      .item {
        margin-bottom: 14px;
        line-height: 32px;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        .count {
          display: inline-block;
          font-size: 24px;
          color: #a9daff;
          font-weight: bold;
          span {
            // margin: 0 6px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>

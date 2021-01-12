<template>
  <div class="net-mix-contianer">
    <div class="title">全网融通</div>
    <div class="total">
      <span class="label">网汇数据总数</span>
      <span class="data">3213万</span>
    </div>
    <div class="sub-title">网汇数据</div>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">
        <RingPerChart
          :number="item.number"
          :total="item.total"
          :color="item.color"
          :styleObj="item.styleObj"
        >
          <div class="data">
            <div>{{ item.label }}</div>
            <div>{{ item.number + "万" }}</div>
          </div>
        </RingPerChart>
      </li>
    </ul>
    <div class="sub-title">网格管理</div>
    <div class="grid-management">
      <div class="grid-item" v-for="(item, index) in gridData" :key="index">
        <div class="label-container">
          <svg-icon :icon-class="item.icon" class="icon" />
          <span class="label">{{ item.label }}</span>
        </div>
        <div class="data">
          <span>{{ item.number }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>
    <div class="sub-title">网络连通</div>
    <div class="net-work-list">
      <div class="item" v-for="(item, index) in netWorkList" :key="index">
        <svg-icon :icon-class="item.icon" class="icon" />
        <span class="label">{{ item.label }}</span>
        <div class="data">
          <span class="number">{{ item.number }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RingPerChart from '@/components/RingPerChart'
export default {
  components: {
    RingPerChart
  },
  data() {
    return {
      dataList: [
        {
          label: '公安局',
          number: 1023,
          total: 3213,
          color: '#3497fb',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-one.png')})`
          }
        },
        {
          label: '民证局',
          number: 501,
          total: 3213,
          color: '#80f4e7',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-two.png')}`
          }
        },
        {
          label: '人社局',
          number: 456,
          total: 3213,
          color: '#aadaff',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-three.png')}`
          }
        },
        {
          label: '城管局',
          number: 43,
          total: 3213,
          color: '#e6b00e',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-four.png')}`
          }
        },
        {
          label: '司法局',
          number: 23,
          total: 3213,
          color: '#9A2BF9',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/summary-five.png')}`
          }
        },
        {
          label: '卫健局',
          number: 237,
          total: 3213,
          color: '#FD9C25',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/summary-six.png')}`
          }
        }
      ],
      gridData: [
        { icon: 'sunmmary-grid', label: '网格总数', number: 10962, unit: '个' },
        {
          icon: 'summary-member',
          label: '网格员数',
          number: 10119,
          unit: '个'
        },
        { icon: 'summary-mix', label: '网格融合', number: 51920, unit: '个' }
      ],
      netWorkList: [
        {
          icon: 'key-place-gas-station',
          label: '综治网连通单位数',
          number: 65,
          unit: '个'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.net-mix-contianer {
  width: 430px;
  height: 559px;
  margin-top: 10px;
  background: url("~@/assets/image/dataView/gov-organization-bg.png") center
    center / 100% 100% no-repeat;
  overflow: hidden;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7ebcff;
    line-height: 28px;
    margin: 15px 0 0 25px;
  }
  .total {
    margin-left: 185px;
    font-size: 16px;
    color: #fff;
  }
  .data {
    font-size: 28px;
    color: #a9daff;
    display: inline-block;
    margin-left: 15px;
  }
  .sub-title {
    font-size: 16px;
    color: #7dbcff;
    margin-left: 15px;
  }
  ul {
    padding: 0 20px;
    margin-top: 10px;
    width: 100%;
  }
  li {
    width: 50%;
    height: 75px;
    margin: 10px 0;
    display: inline-flex;
    align-items: center;
    .data {
      position: absolute;
      top: 5px;
      right: 30px;
      text-align: center;
    }
    &:nth-of-type(1) {
      .data {
        div:nth-of-type(2) {
          color: #3497fb;
        }
      }
    }
    &:nth-of-type(2) {
      .icon {
        background: url("~@/assets/image/dataView/population-two.png") center
          center / 100% 100% no-repeat;
      }
      .data {
        div:nth-of-type(2) {
          color: #80f4e7;
        }
      }
    }
    &:nth-of-type(3) {
      .icon {
        background: url("~@/assets/image/dataView/population-three.png") center
          center / 100% 100% no-repeat;
      }
      .data {
        div:nth-of-type(2) {
          color: #a9daff;
        }
      }
    }
    &:nth-of-type(4) {
      .icon {
        background: url("~@/assets/image/dataView/population-four.png") center
          center / 100% 100% no-repeat;
      }
      .data {
        div:nth-of-type(2) {
          color: #e6b00e;
        }
      }
    }
    &:nth-of-type(5) {
      .icon {
        background: url("~@/assets/image/dataView/summary-five.png") center
          center / 100% 100% no-repeat;
      }
      .data {
        div:nth-of-type(2) {
          color: #9a2bf9;
        }
      }
    }
    &:nth-of-type(6) {
      .icon {
        background: url("~@/assets/image/dataView/summary-six.png") center
          center / 100% 100% no-repeat;
      }
      .data {
        div:nth-of-type(2) {
          color: #e6b00e;
        }
      }
    }
    .icon {
      width: 75px;
      height: 75px;
      margin-right: 10px;
    }
    .data {
      margin-left: 0;
      div:nth-of-type(1) {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        line-height: 36px;
      }
      div:nth-of-type(2) {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
  .grid-management {
    padding: 0;
    width: 100%;
  }
  .grid-item {
    width: 33%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 18px;
      color: #a9daff;
      display: inline-block;
      vertical-align: bottom;
    }
    .label-container {
      // align-items: flex-start;
      justify-content: flex-start;
    }
    .label {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      display: inline-block;
      margin: 0 20px 0 10px;
      line-height: 24px;
    }
    .data {
      color: #a9daff;
      span:nth-of-type(1) {
        font-size: 26px;
        font-size: bold;
        display: inline-block;
        margin: 10px 5px 0 0;
        line-height: 24px;
      }
      span:nth-of-type(2) {
        font-size: 12px;
      }
    }
  }
  .net-work-list {
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;
    padding: 0 36px 0 24px;
    .item {
      width: 100%;
      color: #80f4e7;
      margin: 22px 0;
      &:nth-of-type(1) {
        .label {
          &::after {
            // #0E3A65
            content: "··························";
          }
        }
      }
      .icon {
        color: #80f4e7;
        font-size: 18px;
      }
      .data {
        float: right;
        position: relative;
        z-index: 2;
      }
      .label {
        font-size: 16px;
        color: #ffffff;
        display: inline-block;
        font-size: 18px;
        margin-left: 5px;
        line-height: 18px;
        &::after {
          // #0E3A65
          content: "·······························";
          color: #4a9daa;
          margin: 0 5px 0 10px;
        }
      }
      .number {
        display: inline-block;
        vertical-align: top;
        margin-right: 5px;
        // line-height: 24px;
        font-size: 20px;
        color: #a9daff;
      }
      .unit {
        font-size: 12px;
        color: #a9daff;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>

<template>
  <div class="passenger-taffic-container">
    <div class="title">公共交通</div>
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
            <div>{{ item.number }}</div>
          </div>
        </RingPerChart>
      </li>
    </ul>
  </div>
</template>

<script>
import { queryCommonCarNum } from '@/api/smartData/dataView'
import RingPerChart from '@/components/RingPerChart'
export default {
  components: {
    RingPerChart
  },
  beforeDestroy() {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  async mounted() {
    await this.handleQueryCommonCarNum()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryCommonCarNum()
    })
  },
  data() {
    return {
      code: '3601',
      dataList: [
        {
          label: '客运车',
          number: 0,
          total: 0,
          color: '#3497fb',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-one.png')})`
          }
        },
        {
          label: '危化品车',
          number: 0,
          total: 0,
          color: '#aadaff',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-two.png')})`
          }
        },
        {
          label: '中型货车',
          number: 0,
          total: 0,
          color: '#a9daff',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-three.png')})`
          }
        },
        {
          label: '小型货车',
          number: 0,
          total: 0,
          color: '#4b89ff',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/xxkc.png')})`
          }
        }
      ]
    }
  },
  methods: {
    async handleQueryCommonCarNum() {
      try {
        const { status, data } = await queryCommonCarNum({
          gridCode: this.code
        })
        if (status === 200) {
          this.videoResourceTotal = Object.values(data).reduce(
            (total, cur) => total + cur,
            0
          )
          this.dataList[0].number = data['kyc']
          this.dataList[1].number = data['whpc']
          this.dataList[2].number = data['zxhc']
          this.dataList[3].number = data['xxhc']
          this.dataList = this.dataList.map(item => {
            return {
              ...item,
              total: this.videoResourceTotal
            }
          })
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.passenger-taffic-container {
  width: 425px;
  height: 280px;
  // margin: 5px;
  background: url("~@/assets/image/dataView/data-view-ground-modal.png") center
    center / 100% 100% no-repeat;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7ebcff;
    line-height: 28px;
    margin: 5px 0 0 25px;
  }
  ul {
    padding: 0 10px;
    margin-top: 10px;
    width: 100%;
  }
  li {
    width: 48%;
    margin: 20px 0;
    display: inline-block;
    .data {
      position: absolute;
      top: 5px;
      right: 25px;
      text-align: center;
    }
    &:nth-of-type(1) {
      .data {
        right: 35px;
        div:nth-of-type(2) {
          color: #3497fb;
        }
      }
    }
    &:nth-of-type(2) {
      .data {
        right: 25px;
        div:nth-of-type(2) {
          color: #80f4e7;
        }
      }
    }
    &:nth-of-type(3) {
      .data {
        div:nth-of-type(2) {
          color: #a9daff;
        }
      }
    }
    &:nth-of-type(4) {
      .data {
        div:nth-of-type(2) {
          color: #4b89ff;
        }
      }
    }
    .icon {
      width: 75px;
      height: 75px;
      margin-right: 10px;
    }
    .data {
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
}
</style>

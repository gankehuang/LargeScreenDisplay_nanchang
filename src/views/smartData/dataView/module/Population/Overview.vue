<template>
  <div class="overview-container">
    <div class="title">人口概况</div>
    <div class="total" @click="handleOpenPopModal">
      <svg-icon icon-class="population-people" class="icon" />
      <span>实有人口：</span>
      <CountTo :startVal="0" :endVal="populationTotal" :duration="300" />
      <span>人</span>
    </div>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">
        <RingPerChart
          :number="item.number"
          :total="populationTotal"
          :color="item.color"
          :styleObj="item.styleObj"
        >
          <div class="data">
            <div>{{ item.label }}</div>
            <CountTo :startVal="0" :endVal="item.number" :duration="300" />
          </div>
        </RingPerChart>
      </li>
    </ul>
  </div>
</template>

<script>
import RingPerChart from '@/components/RingPerChart'
import { queryOverview } from '@/api/smartData/dataView'
export default {
  components: {
    RingPerChart
  },
  data() {
    return {
      populationTotal: 0,
      code: '3601',
      dataList: [
        {
          label: '户籍人口',
          number: 0,
          color: '#3497fb',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-one.png')})`
          }
        },
        {
          label: '流动人口',
          number: 0,
          color: '#aadaff',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-two.png')})`
          }
        },
        {
          label: '重点人员',
          number: 0,
          color: '#A9DAFF',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-three.png')})`
          }
        },
        {
          label: '关爱人员',
          number: 0,
          color: '#E6B00E',
          styleObj: {
            width: '78px',
            height: '78px',
            'background-image': `url(${require('@/assets/image/dataView/population-four.png')})`
          }
        }
      ]
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted() {
    this.handleQueryOverview()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleQueryOverview()
    })
  },
  methods: {
    async handleQueryOverview() {
      try {
        const { status, data } = await queryOverview({ code: this.code })
        if (status === 200) {
          // this.populationTotal = Number(data.countPerson)
          this.groupData(data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 分类对接数据
    groupData(data) {
      // console.log(data)
      // this.populationTotal = 6800124
      this.populationTotal = 0
      // let impPeoTotal = 0
      data.forEach(item => {
        switch (item.gc_TYPE) {
          case '户籍人口数':
            // 5365838
            this.populationTotal += item.sum
            this.handleDataToOptions(item.sum, this.dataList[0], 0)
            break
          case '流动人口':
            // 755114
            this.populationTotal += item.sum
            this.handleDataToOptions(item.sum, this.dataList[1], 1)
            break
          // case '严重精神障碍患者':
          // case '重点青少年':
          // case '社区矫正人员数量':
          // case '吸毒人员':
          // case '重点走访人员':
          // case '邪教人员数':
          // case '刑释解教人员':
          case '重点人员':
            // console.log(item)
            this.handleDataToOptions(item.sum, this.dataList[2], 2)
            // impPeoTotal += item.sum
            // console.log(impPeoTotal)
            break
          case '关爱人员':
            // console.log(this.populationTotal)
            this.handleDataToOptions(item.sum, this.dataList[3], 3)
            break
          default:
            break
        }
      })
      // console.log(impPeoTotal)
      // this.handleDataToOptions(impPeoTotal, this.dataList[2], 2)
    },
    handleDataToOptions(param, obj, index) {
      obj.number = Number(param)
      console.log(obj)
      this.dataList.splice(index, 1, obj)
    },
    // 打开人口弹窗
    handleOpenPopModal() {
      this.$EventBus.$emit('update:popModalVisible', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-container {
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
  .total {
    cursor: pointer;
    margin: 0 0 0 150px;

    .icon {
      font-size: 16px;
      color: #3497fb;
    }
    span:nth-of-type(1) {
      color: #3497fb;
      line-height: 24px;
      margin-left: 5px;
    }
    span:nth-of-type(2) {
      display: inline-block;
      line-height: 24px;
      font-weight: bold;
      font-size: 28px;
      margin: 0 5px 0 0;
      color: #aadaff;
    }
    span:nth-of-type(3) {
      color: #aadaff;
    }
  }
  ul {
    padding: 0 20px;
    margin-top: 5px;
    width: 100%;
  }
  li {
    width: 50%;
    margin: 10px 0;
    display: inline-flex;
    align-items: center;
    .data {
      position: absolute;
      top: 5px;
      right: 0;
      text-align: center;
    }
    &:nth-of-type(1) {
      .data {
        span {
          color: #3497fb;
        }
      }
    }
    &:nth-of-type(2) {
      .data {
        right: 20px;
        span {
          color: #80f4e7;
        }
      }
    }
    &:nth-of-type(3) {
      .data {
        right: 20px;
        span {
          color: #a9daff;
        }
      }
    }
    &:nth-of-type(4) {
      .data {
        right: 20px;
        span {
          color: #e6b00e;
        }
      }
    }
    .data {
      margin-left: 10px;
      div:nth-of-type(1) {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        line-height: 36px;
      }
      span {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
}
</style>

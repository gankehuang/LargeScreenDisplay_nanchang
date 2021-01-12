<template>
  <div class="win-info">
    <div class="title">重点信访人员</div>
    <div class="list">
      <div class="list-item">
        <div class="flex-item1">
          <img
            style="width: 98px;height: 69px;"
            src="@/assets/image/importPeople/xfry-2.png"
            alt=""
          />
        </div>
        <div class="flex-item2">
          <span>人员总数</span>
          233
          <span>人</span>
        </div>
      </div>
      <div class="list-1">
        <div class="list-1-1">
          信访场所分析
        </div>
        <v-chart :options="distributeOptions" class="echart" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryPetitionPurpose,
  queryPetitionCount
} from '@/api/riskPrevention/importPeople'
export default {
  data() {
    return {
      data: [],
      count1: 16,
      loading: false
    }
  },
  mounted() {
    this.getList()
    this.getLists()
  },
  methods: {
    getLists() {
      queryPetitionCount().then(res => {
        if (res.status === 200) {
          this.count = res.data.total
          this.count1 = res.data.keyPetition
          this.count2 = res.data.petition
        }
      })
    },
    getList() {
      queryPetitionPurpose({ gridCode: 3601 }).then(res => {
        if (res.status === 200) {
          this.data = [res.data.fjCount, res.data.fsCount, res.data.fcCount]
        }
      })
    }
  },
  computed: {
    distributeOptions() {
      return {
        color: ['#00FFFF', '#0055FF', '#e6b00e'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}'
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          top: -20,
          right: '2%',
          height: '70%',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 30,
          padding: 40,
          show: true,
          data: ['赴京', '赴省', '其它'],
          textStyle: {
            color: '#A9DAFF'
          }
        },
        series: [
          {
            name: '信访数量',
            type: 'pie',
            center: ['35%', '30%'],
            radius: ['25%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: '{c}(次)',
              textStyle: {
                color: '#7EBDFF'
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
              length: 1
            },
            data: [
              { value: 387, name: '赴京' },
              { value: 708, name: '赴省' },
              { value: 1006, name: '其它' }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  color: #7dbcff;
  line-height: 18px;
  position: absolute;
  top: 15px;
  left: 40px;
}
.win-info {
  position: relative;
  width: 420px;
  height: 385px;
  background: url("~@/assets/image/importPeople/xf-right-bg2.png") no-repeat;
  background-size: 100% 100%;
  .list {
    margin: 50px 0;
    z-index: 9;
    .list-item {
      height: 50px;
      margin-bottom: 20px;
      display: flex;
      .flex-item1 {
        margin-left: 41px;
      }
      .flex-item2 {
        padding-top: 18px;
        font-size: 30px;
        font-weight: bold;
        color: #17fbff;
        text-align: center;
        padding-left: 12px;
        span {
          padding-right: 28px;
          padding-left: 6px;
          font-size: 16px;
          font-weight: bold;
          color: #a9daff;
          line-height: 18px;
        }
      }
    }
    .list-1 {
      width: 375px;
      height: 237px;
      margin-left: 20px;
      margin-bottom: 8px;
      background: url("~@/assets/image/importPeople/xfry.png") no-repeat;
      .list-1-1 {
        margin-left: 89px;
        padding-top: 11px;
        text-align: center;
        width: 200px;
        height: 38px;
        font-size: 16px;
        font-weight: 400;
        color: #a9daff;
        background: url("~@/assets/image/importPeople/xfry-1.png") no-repeat;
      }
    }
  }
  .echart {
    margin-top: 20px;
    width: 100%;
    height: 100%;
  }
}
</style>

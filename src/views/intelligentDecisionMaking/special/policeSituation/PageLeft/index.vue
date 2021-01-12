<template>
  <div class="page-left jingqing">
    <div class="top">
      <div class="title">警情数量</div>
      <div class="total">
        <span class="label">警情总数</span>
        <VerticalNumTo :total="total" :bits="9" />
      </div>
      <div class="row">
        <div class="col" :key="index" v-for="(item, index) in rows">
          <div class="number">{{ item.number }}</div>
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">警情县区分布</div>
      <div class="legand">
        <div class="item">
          <span></span>
          已处理
        </div>
        <div class="item">
          <span></span>
          总数
        </div>
      </div>
      <div class="processlist">
        <div
          class="list-item"
          v-for="(item, index) in this.datalist"
          :key="index"
        >
          <span class="item-name">{{ item.name }}</span>
          <div style="flex: 0 0 calc(100% - 70px);display:flex;">
            <el-progress
              :style="{ width: widthList(item) + 'px' }"
              :text-inside="true"
              :stroke-width="15"
              :title="percentageList(item) + '%'"
              :percentage="percentageList(item)"
              color="#3B9AFE"
            ></el-progress>
            <span class="item-total">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- <el-form
        style="margin: 35px 25px 0 25px;"
        label-width="90px"
      >
        <el-form-item
          v-for="(item, index) in datalist"
          :key="index"
          :label="item.name"
        >
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="setNumber(item.count, item.value)"
            :color="
              index == 0
                ? '#66E7FF'
                : index == 1
                ? '#2AD7F7'
                : index == 2
                ? '#07B7D7'
                : '#3B9AFE'
            "
          ></el-progress>
        </el-form-item>
      </el-form> -->
    </div>
  </div>
</template>

<script>
import {
  alertNumber,
  alertDistribution
} from '@/api/intelligentDecisionMaking/special'
import VerticalNumTo from '@/components/VerticalNumTo'
export default {
  components: {
    VerticalNumTo
  },
  data() {
    return {
      total: 0,
      rows: [
        {
          number: '-',
          label: '治安'
        },
        {
          number: '-',
          label: '黄赌毒'
        },
        {
          number: '-',
          label: '交通事故'
        }
      ],
      datalist: [],
      processedList: [
        20706,
        38644,
        70868,
        96236,
        105999,
        119072,
        135555,
        152163,
        207726,
        192485,
        273321,
        342334
      ]
    }
  },

  created() {
    this.alertNumber()
    this.alertDistribution()
  },
  methods: {
    setNumber(total, value) {
      const percentages = (Number(value) / Number(total)) * 100
      return parseFloat(percentages.toFixed(2))
    },
    alertNumber() {
      alertNumber().then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          this.rows[0].number = res.data.securityCount
          this.rows[1].number = res.data.yellowGamblerCount
          this.rows[2].number = res.data.trafficCount
        }
      })
    },
    alertDistribution() {
      alertDistribution().then(res => {
        this.datalist = []
        if (res.status === 200) {
          const newArr = res.data.sort(this._compare('value'))
          newArr.forEach((item, index) => {
            const one = {}
            one.name = item.name
            one.value = item.value
            one.processed = this.processedList[index]
            this.datalist.unshift(one)
          })
        }
      })
    },
    percentageList(item) {
      return Number(((item.processed / item.value) * 100).toFixed(2))
    },
    widthList(item) {
      return Number(parseInt((item.value / this.datalist[0].value) * 250))
    },

    _compare(property) {
      return function(a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.jingqing {
  /deep/.el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
  /deep/ .el-progress-bar__innerText {
    color: #fff;
  }
  .processlist {
    margin-top: 60px;
  }
  .list-item {
    margin: 25px 0 0 15px;
    display: flex;
    .item-name {
      color: #fff;
      flex: 0 0 70px;
    }

    .item-total {
      color: #fff;
      margin-left: 10px;
      text-align: right;
    }
  }
}

.page-left {
  height: 100%;
  z-index: 9;
}
.top,
.bottom {
  position: relative;
  .title {
    margin: 10px 0 20px 30px;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
  }
  .legand {
    position: absolute;
    top: 50px;
    right: 10px;
    display: flex;
    .item {
      font-size: 14px;
      color: #fff;
      display: flex;
      margin-right: 10px;
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 3px;
        position: relative;
        top: 3px;
      }
    }
    .item:nth-child(1) {
      span {
        background: #3b9afe;
      }
    }
    .item:nth-child(2) {
      span {
        background: #fff;
      }
    }
  }
}

.top {
  width: 420px;
  height: 235px;
  background: url("~@/assets/image/policeSituation/left-top.png") center center /
    100% 100% no-repeat;
  .total {
    margin: 20px 0 0 30px;
    // line-height: 36px;
    .label {
      display: inline-block;
      height: 40px;
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #b2d9fb;
    }
  }
  .row {
    width: 375px;
    height: 95px;
    margin: 0 auto;
    background: url("~@/assets/image/policeSituation/left-top-row.png") center
      center / 100% 100% no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .col {
    flex: 1;
    text-align: center;
    padding-bottom: 30px;
    background: url("~@/assets/image/policeSituation/left-row-col.png") center
      center / 100% 100% no-repeat;
    padding-top: 20px;
    .number {
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #e6b00e;
      line-height: 24px;
    }
    .label {
      font-weight: bold;
      color: #a9daff;
      line-height: 24px;
    }
  }
}

.bottom {
  width: 420px;
  height: 580px;
  background: url("~@/assets/image/policeSituation/left-bottom.png") center
    center / 100% 100% no-repeat;
}
.el-progress {
  width: 100%;
  // height: 20px;
  display: inline-block;
}
</style>

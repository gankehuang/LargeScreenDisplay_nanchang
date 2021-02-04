<template>
  <InfoBlock
    title="警情县区分布"
    height="67%"
  >
    <div class="legand">
      <div class="item">
        <span />
        已处理
      </div>
      <div class="item">
        <span />
        总数
      </div>
    </div>
    <div class="processlist">
      <div
        v-for="(item, index) in datalist"
        :key="index"
        class="list-item"
      >
        <span class="item-name">{{ item.name }}</span>
        <div style="flex: 0 0 calc(100% - 70px); display:flex;">
          <el-progress
            :style="{ width: widthList(item) + 'px' }"
            :text-inside="true"
            :stroke-width="15"
            :title="percentageList(item) + '%'"
            :percentage="percentageList(item)"
            color="#3B9AFE"
          />
          <span class="item-total">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import {
  alertDistribution
} from '@/api/intelligentDecisionMaking/special'
export default {
  data () {
    return {
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
  created () {
    this.alertDistribution()
  },
  methods: {
    alertDistribution () {
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
    percentageList (item) {
      return Number(((item.processed / item.value) * 100).toFixed(2))
    },
    widthList (item) {
      return Number(parseInt((item.value / this.datalist[0].value) * 250))
    },
    _compare (property) {
      return function (a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    }
  }
}
</script>

<style lang="scss" scoped>

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
</style>

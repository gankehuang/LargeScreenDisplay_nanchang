<template>
  <InfoBlock
    height="83%"
    title="月度信访事件排行"
  >
    <div class="legand">
      <div class="item">
        <span />已办结
      </div>
      <div class="item">
        <span />信访数量
      </div>
    </div>
    <div class="processlist">
      <div
        v-for="(item, index) in datalist"
        :key="index"
        class="list-item"
      >
        <span class="item-name">{{ item.area }}</span>
        <div class="progress-box">
          <el-progress
            :style="{ width: widthList(item) + 'px' }"
            :text-inside="true"
            :stroke-width="15"
            :title="percentageList(item) + '%'"
            :percentage="percentageList(item)"
            color="#3B9AFE"
          />
          <span class="item-total">{{ item.num }}</span>
        </div>
      </div>
    </div>
  </InfoBlock>
</template>
<script>
import { monthlyVisits } from '@/api/intelligentDecisionMaking/mood'
export default {
  data () {
    return {
      tab: 0,
      datalist: [],
      processedList: [7, 6, 14, 13, 40, 39, 41, 38, 58, 63, 79, 126]
    }
  },
  created () {
    this.monthlyVisits()
  },
  methods: {
    monthlyVisits () {
      const objects = {
        date: '2020-10'
      }
      this.datalist = []
      monthlyVisits(objects).then(res => {
        if (res.status === 200) {
          const newArr = res.data.sort(this._compare('num'))
          newArr.forEach((item, index) => {
            const one = {}
            one.area = item.area
            one.num = item.num
            one.processed = this.processedList[index]
            this.datalist.unshift(one)
          })
        }
      })
    },
    percentageList (item) {
      return Number(((item.processed / item.num) * 100).toFixed(2))
    },
    widthList (item) {
      return Number(parseInt((item.num / this.datalist[0].num) * 280))
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
.title {
  line-height: 40px;
  font-size: 16px;
  color: #7dbcff;
  margin-left: 10px;
  font-weight: bold;
}
.numbers {
  width: 420px;
  height: 660px;
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
.processlist {
  margin-top: 50px;
}
.list-item {
  margin: 20px 0 35px 15px;
  display: flex;
  .item-name {
    color: #fff;
    flex: 0 0 70px;
  }
  .progress-box {
    flex: 0 0 calc(100% - 70px);
    display:flex;
  }

  .item-total {
    color: #fff;
    margin-left: 10px;
    text-align: right;
  }
}
.el-progress {
  width: 100%;
  // height: 20px;
  display: inline-block;
}
</style>

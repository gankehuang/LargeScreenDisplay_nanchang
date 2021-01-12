<template>
  <div class="win-info">
    <div class="title">事件分布</div>
    <div class="legand">
      <div class="item">
        <span></span>
        已处理
      </div>
      <div class="item">
        <span style=":#fff;"></span>
        总数
      </div>
    </div>

    <div class="list-item" v-for="(item, index) in this.nameList" :key="index">
      <span class="item-name">{{ item }}</span>
      <div style="flex: 0 0 calc(100% - 70px);display:flex;">
        <el-progress
          :style="{ width: widthList[index] }"
          :text-inside="true"
          :stroke-width="15"
          :title="percentageList[index] + '%'"
          :percentage="percentageList[index]"
          color="#3B9AFE"
        ></el-progress>
        <span class="item-total">{{ totalList[index] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { countEventByRegion } from '@/api/intelligentCommand/warning'
export default {
  data() {
    return {
      loading: false,
      dataList: [],
      nameList: [],
      risk: null,
      totalList: [],
      percentageList: [],
      widthList: []
    }
  },
  mounted() {
    this.countEventByRegion()
  },
  methods: {
    getPercentage(val) {
      return this.percentageList[val]
    },
    countEventByRegion() {
      countEventByRegion().then(res => {
        const { status, data } = res
        if (status === 200) {
          const arr = data.sort((a, b) => {
            return b.totalCount - a.totalCount
          })
          arr.forEach(item => {
            this.totalList.push(item.totalCount)
            this.nameList.push(item.regionCode)
            let count = 100
            let wid = 0
            if (item.unProcessedCount / item.totalCount) {
              count = parseInt((item.unProcessedCount / item.totalCount) * 100)
            }
            if (item.totalCount / arr[0].totalCount) {
              wid = parseInt((item.totalCount / arr[0].totalCount) * 100)
            }
            this.percentageList.push(count)
            this.widthList.push(wid + '%')
          })
        }
      })
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
.win-info {
  position: relative;
  width: 420px;
  height: 500px;
  background: url("~@/assets/image/warning/block-bg.png") no-repeat center
    center;
  background-size: 100% 100%;
  padding: 45px 30px 10px 20px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
}
/deep/.el-progress-bar__innerText {
  font-weight: bold;
}
.legand {
  position: absolute;
  top: 20px;
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
      background: #3b9afe;
      border-radius: 50%;
      margin-right: 3px;
      position: relative;
      top: 3px;
    }
  }
}

.list-item {
  display: flex;
  margin-bottom: 15px;
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
</style>

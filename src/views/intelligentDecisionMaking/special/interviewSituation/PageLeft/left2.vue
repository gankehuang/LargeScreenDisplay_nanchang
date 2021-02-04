<template>
  <div class="win-info">
    <div class="title">
      月度信访事件排行
    </div>
    <div class="legand">
      <div class="item">
        <span />
        已办结
      </div>
      <div class="item">
        <span />
        信访数量
      </div>
    </div>
    <div class="processlist">
      <div
        v-for="(item, index) in this.datalist"
        :key="index"
        class="list-item"
      >
        <span class="item-name">{{ item.area }}</span>
        <div style="flex: 0 0 calc(100% - 70px);display:flex;">
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
    <!-- <div :class="['tabs', { active: tab == 1 }]">
      <div class="tabItem" @click="tab = 0">
        信访数量
      </div>
      <div class="tabItem" @click="tab = 1">
        办结率
      </div>
    </div>
    <div v-if="tab == 0" class="numbers">
      <v-chart :options="amountOptions" />
    </div>
    <el-form v-else style="margin: 35px 27px 0 35px;" label-width="70px">
      <el-form-item label="东湖区">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="98.4"
          color="#66E7FF"
        ></el-progress>
      </el-form-item>
      <el-form-item label="青山湖区">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="97.8"
          color="#2AD7F7"
        ></el-progress>
      </el-form-item>
      <el-form-item label="高新区">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="95.6"
          color="#07B7D7"
        ></el-progress>
      </el-form-item>
      <el-form-item label="青云谱区">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="94.4"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
      <el-form-item label="南昌县">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="93.2"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
      <el-form-item label="进贤县">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="91.9"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
      <el-form-item label="安义县">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="90.6"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
      <el-form-item label="湾里局">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="88.5"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
      <el-form-item label="新建区">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="88.3"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
      <el-form-item label="经开区">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="87.7"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
      <el-form-item label="红谷滩区">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="87.3"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
      <el-form-item label="西湖区">
        <el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="86.5"
          color="#3B9AFE"
        ></el-progress>
      </el-form-item>
    </el-form> -->
  </div>
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
.win-info {
  position: relative;
  width: 420px;
  height: 718px;
  background: url("~@/assets/image/interviewSituation/left2-bg.png") no-repeat
    center;
  background-size: 100% 100%;
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
    margin-top: 60px;
  }
  .list-item {
    margin: 35px 0 0 15px;
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
.el-progress {
  width: 100%;
  // height: 20px;
  display: inline-block;
}
</style>

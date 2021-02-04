<template>
  <InfoBlock
    title="精神病患者"
  >
    <div class="mes">
      严重精神障碍患者总数
      <div class="count">
        {{ count }}
        <span>人</span>
      </div>
    </div>
    <div class="list">
      <div class="list-item">
        <div class="flex-item1">
          <span>5级</span>
        </div>
        <div class="flex-item2">
          {{ count1 }}
          <span>人</span>
        </div>
      </div>
      <div class="list-item">
        <div class="flex-item1 bg2">
          <span>4级</span>
        </div>
        <div
          class="flex-item2"
          style="color: #E6B00E;"
        >
          {{ count2 }}
          <span>人</span>
        </div>
      </div>
      <div class="list-item">
        <div class="flex-item1 bg3">
          <span>3级</span>
        </div>
        <div
          class="flex-item2"
          style="color: #3498FB;"
        >
          {{ count - count1 - count2 }}
          <span>人</span>
        </div>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import { countMentalPeopleByRiskDegree } from '@/api/riskPrevention/importPeople'
export default {
  data () {
    return {
      count: 1835,
      count1: 113,
      count2: 355,
      count3: 1401
    }
  },
  methods: {
    getList () {
      countMentalPeopleByRiskDegree().then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            if (item.name === 'total') {
              this.count = item.numVal
            } else if (item.name === '5级') {
              this.count1 = item.numVal
            } else if (item.name === '4级') {
              this.count2 = item.numVal
            } else if (item.name === '3级') {
              this.count3 = item.numVal
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mes {
  line-height: 44px;
  font-size: 18px;
  color: #aadaff;
  font-weight: bold;
  .count {
    display: inline-block;
    margin: 0 13px 0 20px;
    font-size: 30px;
    color: #17fcff;
    span {
      font-size: 16px;
      color: #aadaff;
    }
  }
}
.list {
  .list-item {
    display: flex;
    height: 50px;
    margin-bottom: 12px;
    background: url("~@/assets/image/importPeople/list-bg.png") no-repeat
    center;
    background-size: 100% 100%;
    font-size: 16px;
    .flex-item1 {
      padding-left: 27px;
      width: 95px;
      height: 35px;
      margin: 8px 0 0 19px;
      background: url("~@/assets/image/importPeople/count-bg1.png") no-repeat
      center;
      background-size: 100% 100%;
      span {
        display: block;
        line-height: 35px;
        color: #fff;
      }
    }
    .bg2 {
      background: url("~@/assets/image/importPeople/count-bg3.png") no-repeat
      center;
      background-size: 100% 100%;
    }
    .bg3 {
      background: url("~@/assets/image/importPeople/count-bg2.png") no-repeat
      center;
      background-size: 100% 100%;
    }
    .flex-item2 {
      margin-left: 47px;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
      color: #d02247;
      font-weight: bold;
      span {
        font-size: 12px;
        color: #aadaff;
      }
    }
  }
}
</style>

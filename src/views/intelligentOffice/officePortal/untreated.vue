<template>
  <div class="systemConstruction">
    <div class="title">
      未处理收文
      <span>
        所有收文
      </span>
      <span>
        所有发文
      </span>
    </div>
    <div class="shuaxins"></div>
    <div class="shuaxin">
      刷新
    </div>
    <div class="box">
      <el-scrollbar style="height:100%;width:100%;">
        <div class="box-list" v-for="(item, index) in list" :key="index">
          <p class="icon"></p>
          <p class="name">{{ item.title }}</p>
          <p class="time">{{ item.time }}</p>
        </div>
      </el-scrollbar>
    </div>
    <div class="echs">
      <v-chart :options="options" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: '综治中心实体化周报(第九周) … ',
          time: '2019-12-17'
        },
        {
          title: '综治中心实体化周报(第八周) … ',
          time: '2019-12-10'
        }
      ]
    }
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#00FFFF', '#0056FF'],
        legend: {
          data: ['收文', '发文'],
          top: '2%',
          right: '10%',
          textStyle: {
            color: '#AADAFF'
          }
        },
        grid: {
          width: '90%',
          height: '80%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#4E9CF4'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: []
            }
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#4E9CF4'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            length: 10
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(0,73,104,0.32)']
            }
          }
        },
        series: [
          {
            name: '收文',
            data: [
              { value: 33, name: '1' },
              { value: 31, name: '2' },
              { value: 23, name: '3' },
              { value: 13, name: '4' },
              { value: 54, name: '5' },
              { value: 23, name: '6' },
              { value: 13, name: '7' },
              { value: 54, name: '8' },
              { value: 54, name: '9' },
              { value: 23, name: '10' },
              { value: 13, name: '11' }
            ],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '发文',
            data: [
              { value: 33, name: '1' },
              { value: 31, name: '2' },
              { value: 23, name: '3' },
              { value: 13, name: '4' },
              { value: 54, name: '5' },
              { value: 31, name: '6' },
              { value: 54, name: '7' },
              { value: 68, name: '8' },
              { value: 34, name: '9' },
              { value: 12, name: '10' },
              { value: 13, name: '11' }
            ],
            type: 'line',
            symbol: 'none',
            smooth: true
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.systemConstruction {
  position: relative;
  width: 100%;
  height: 530px;
  margin-bottom: 15px;
  background: url("~@/assets/image/officePortal/middle-top.png") no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 46px;
    padding-left: 24px;
    span {
      font-size: 16px;
      color: #5a88ab;
      display: inline-block;
      margin-left: 50px;
      line-height: 46px;
    }
  }
  .shuaxins {
    width: 30px;
    height: 25px;
    background: url("~@/assets/image/officePortal/shuaxin.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 18px;
    right: 80px;
  }
  .shuaxin {
    width: 43px;
    height: 19px;
    background-color: #02bed1;
    color: #fff;
    text-align: center;
    border-radius: 19px;
    line-height: 19px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .box {
    margin-top: 20px;
    width: 100%;
    height: 160px;
    overflow: auto;
    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    .box-list {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 15px;
      position: relative;
      p {
        margin: 0;
        padding: 0;
        line-height: 40px;
      }
      .icon {
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background-color: #fff;
        margin-right: 25px;
      }
      .name {
        font-size: 18px;
        font-weight: 400;
        color: #8bbae0;
      }
      .time {
        font-size: 18px;
        font-weight: 400;
        color: #fff;
        position: absolute;
        right: 30px;
      }
    }
  }
  .echs {
    width: 100%;
    height: 292px;
  }
}
</style>

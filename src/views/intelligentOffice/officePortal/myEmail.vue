<template>
  <div class="systemConstruction">
    <div class="title">
      材料报送统计
    </div>
    <div class="shuaxins" />
    <div class="shuaxin">
      刷新
    </div>
    <div class="box">
      <v-chart :options="options" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    options () {
      return {
        color: ['#0054FF', '#02bed1'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: 230,
          bottom: 0,
          height: 30,
          itemWidth: 8,
          itemHeight: 20,
          itemGap: 15,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          data: ['已报送', '未报送']
        },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: '事件类型分析',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'right',
              formatter: '{d}%'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 33, name: '已报送' },
              { value: 31, name: '未报送' }
            ]
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
  height: 257px;
  background: url("~@/assets/image/officePortal/left-two.png") no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 46px;
    padding-left: 24px;
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
    width: 100%;
    height: 196px;
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
        line-height: 48px;
      }
      .icon {
        font-size: 18px;
        font-weight: 400;
        color: #78a2c7;
        margin-right: 15px;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 6px;
          margin-right: 10px;
          background-color: #fff;
        }
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
    .box-list:nth-child(1) .icon,
    .box-list:nth-child(2) .icon {
      color: #f7cd07;
    }
  }
}
</style>

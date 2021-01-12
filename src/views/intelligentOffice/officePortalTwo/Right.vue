<template>
  <div class="page-right">
    <!-- 文件归档 -->
    <div class="fwgd-container block-bg-container">
      <div class="title">文件归档</div>
      <svg-icon class="refresh-icon" icon-class="refresh" />
      <div class="content">
        <div class="info-list">
          <div
            class="info-item"
            v-for="(item, index) in tzggInfoList"
            :key="index"
          >
            <span>{{ item.label }}</span>
            <span>{{ item.number }}</span>
          </div>
        </div>
        <div class="pic"></div>
        <v-chart :options="tzggOption" class="chart" />
      </div>
    </div>
    <!-- 公文列表 -->
    <div class="gwlb-container block-bg-container">
      <div class="title">公文列表</div>
      <svg-icon class="refresh-icon" icon-class="refresh" />
      <el-scrollbar class="list">
        <div class="list-item" v-for="(item, index) in zdjsList" :key="index">
          <svg-icon class="list-icon" icon-class="list" />
          <div class="list-content text-overflow" :title="item.title">
            {{ item.title }}
          </div>
          <div class="list-time">{{ item.time }}</div>
        </div>
      </el-scrollbar>
    </div>
    <!-- 材料报送 -->
    <div class="clbs-container block-bg-container">
      <div class="title">材料报送</div>
      <svg-icon class="refresh-icon" icon-class="refresh" />
      <div class="content">
        <div class="content-left">
          <div class="info"></div>
          <v-chart :options="clbsLeftOption" class="chart" />
        </div>
        <div class="content-right">
          <div class="info"></div>
          <v-chart :options="clbsRightOption" class="chart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tzggInfoList: [
        { label: '普通', number: 75 },
        { label: '加急', number: 13 },
        { label: '特急', number: 1 }
      ],
      optionsData: [
        { name: '南昌市委平安办', value: 4 },
        { name: '南昌市综治中心', value: 56 },
        { name: '南昌市市域办', value: 6 },
        { name: '东湖区综治中心', value: 15 },
        { name: '青云谱区综治中心', value: 4 },
        { name: '高新区综治中心', value: 1 },
        { name: '青山湖区综治中心', value: 1 },
        { name: '西湖区综治中心', value: 2 }
      ],
      zdjsList: [
        {
          title:
            '关于印发《2020年度市综治责任单位平安建设（综治工作）考核评价内容》的通知',
          time: '2020-10-19'
        },
        {
          title:
            '关于印发《2020年度县区（开发区、管理局）平安建设（综治工作）考核评价内容》的通知',
          time: '2020-10-19'
        },
        {
          title: '关于进一步加强和改进全市严重精神障碍患者服务管理工作的通知',
          time: '2020-07-24'
        }
      ],
      clbsLeftOptionData: [
        { name: '未报送', value: 0 },
        { name: '已报送', value: 100 }
      ],
      clbsRightOptionData: [
        { name: '县区报送', value: 72.54 },
        { name: '部门报送', value: 27.46 }
      ]
    }
  },
  computed: {
    tzggOption() {
      return {
        color: ['#3B9AFE', '#E6B00E', '#A9DAFF', '#02C439', '#0055FF'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}%'
        },
        legend: {
          show: true,
          orient: 'vertical',
          formatter: name => {
            const value = this.optionsData.filter(item => {
              return item.name === name
            })
            return (
              name +
              '  ' +
              (Number((value[0].value / 100) * 100).toFixed(2) + '%')
            )
          },
          textStyle: {
            color: '#fff',
            // lineHeight: 24,
            fontSize: 14
          },
          itemHeight: 10,
          top: -5,
          right: 30,
          data: [
            '南昌市委平安办',
            '南昌市综治中心',
            '南昌市市域办',
            '东湖区综治中心',
            '青云谱区综治中心',
            '高新区综治中心',
            '青山湖区综治中心',
            '西湖区综治中心'
          ].map(item => {
            return {
              name: item,
              icon: 'circle'
            }
          })
        },
        series: [
          {
            name: '发文归档',
            type: 'pie',
            center: ['22%', '45%'],
            radius: ['45%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.optionsData
          }
        ]
      }
    },
    clbsLeftOption() {
      return {
        color: ['#3B9AFE', '#E6B00E'],
        title: {
          text: '报送状态',
          textAlign: 'center',
          textVerticalAlign: 'center',
          top: 85,
          left: 205,
          textStyle: {
            color: '#A9DAFF'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}%'
        },
        legend: {
          show: true,
          orient: 'vertical',
          formatter: name => {
            const value = this.clbsLeftOptionData.filter(item => {
              return item.name === name
            })
            return name + '  ' + (Number((value[0].value / 100) * 100) + '%')
          },
          textStyle: {
            color: '#fff',
            lineHeight: 24,
            fontSize: 14
          },
          top: 55,
          left: 0,
          data: ['未报送', '已报送'].map(item => {
            return {
              name: item,
              icon: 'circle'
            }
          })
        },
        series: [
          {
            name: '发文归档',
            type: 'pie',
            center: ['75%', '45%'],
            radius: ['45%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.clbsLeftOptionData
          }
        ]
      }
    },
    clbsRightOption() {
      return {
        color: ['#0055FF', '#00FFFF'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}%'
        },
        title: {
          text: '报送单位',
          textAlign: 'center',
          textVerticalAlign: 'center',
          top: 85,
          right: 145,
          textStyle: {
            color: '#A9DAFF'
          }
        },
        legend: {
          show: true,
          orient: 'vertical',
          formatter: name => {
            const value = this.clbsRightOptionData.filter(item => {
              return item.name === name
            })
            return name + '  ' + (Number((value[0].value / 100) * 100) + '%')
          },
          textStyle: {
            color: '#fff',
            lineHeight: 24,
            fontSize: 14
          },
          top: 55,
          right: 10,
          data: ['县区报送', '部门报送'].map(item => {
            return {
              name: item,
              icon: 'circle'
            }
          })
        },
        series: [
          {
            name: '发文归档',
            type: 'pie',
            center: ['20%', '45%'],
            radius: ['45%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.clbsRightOptionData
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.block-bg-container {
  width: 587px;
  height: 262px;
  background: url("~@/assets/image/intelligentOffice/板块1 拷贝 4.png") center
    center / 100% 100% no-repeat;
  padding: 15px 0 0 27px;
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #3b9afe;
    line-height: 18px;
  }
  .refresh-icon {
    position: absolute;
    top: 25px;
    right: 25px;
    font-size: 16px;
    color: #4fa2ff;
  }
}

.fwgd-container {
  .content {
    margin-top: 20px;
    position: relative;
    display: flex;
  }
  .info-list {
    flex: 0.2;
  }
  .info-item {
    width: 112px;
    height: 38px;
    background: url("~@/assets/image/intelligentOffice/圆角矩形 595.png") center
      center / 100% 100% no-repeat;
    display: flex;
    align-items: center;
    margin: 15px 0;
    justify-content: space-around;
    span:nth-of-type(1) {
      color: #a9daff;
    }
    span:nth-of-type(2) {
      color: #00ffff;
      font-weight: bold;
    }
  }
  .pic {
    position: absolute;
    top: 30px;
    left: 270px;
    z-index: 10;
    width: 51px;
    height: 116px;
    background: url("~@/assets/image/intelligentOffice/组 88 拷贝.png") center
      center / 100% 100% no-repeat;
    position: absolute;
  }
  .chart {
    width: 450px;
    height: 200px;
  }
}

.gwlb-container {
  .list {
    margin-top: 20px;
    height: 200px;
  }
  .list-item {
    width: 95%;
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 84, 192, 0.6);
    position: relative;
    .list-icon {
      color: #3497fb;
      font-size: 16px;
    }
    .list-content {
      width: 50%;
      color: #a9daff;
      padding-left: 10px;
    }
    .list-time {
      width: 45%;
      text-align: right;
      color: #3b9afe;
    }
  }
}

.clbs-container {
  .content {
    margin-top: 20px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content-right,
  .content-left {
    flex: 0.5;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .content-left {
    .info {
      position: absolute;
      z-index: 10;
      width: 151px;
      height: 81px;
      top: 45px;
      left: 0px;
      background: url("~@/assets/image/intelligentOffice/圆角矩形 701.png")
        center center / 100% 100% no-repeat;
    }
    .chart {
      width: 100%;
      height: 200px;
    }
  }
  .content-right {
    .info {
      position: absolute;
      z-index: 10;
      width: 151px;
      height: 81px;
      top: 45px;
      right: 20px;
      background: url("~@/assets/image/intelligentOffice/圆角矩形 701 拷贝.png")
        center center / 100% 100% no-repeat;
    }
    .chart {
      width: 100%;
      height: 200px;
    }
  }
}
</style>

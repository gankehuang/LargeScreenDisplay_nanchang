<template>
  <div class="page-right">
    <div class="top">
      <div class="title">警情分析报告</div>
      <div class="list">
        <el-scrollbar style="height:202px">
          <div
            class="item"
            v-for="(item, index) in rightTopList"
            :key="index"
            @click="watchPdf(item)"
          >
            <div class="label">{{ item.label }}</div>
            <div class="date">{{ item.date }}</div>
            <a
              target="_blank"
              :download="item.label"
              :href="item.url"
              v-if="item.url"
              @click.stop=""
            >
              <div class="download">
                <svg-icon icon-class="download" class="svg-icon" />
              </div>
            </a>
            <a @click.stop="downloadReport" v-else>
              <div class="download">
                <svg-icon icon-class="download" class="svg-icon" />
              </div>
            </a>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="top center">
      <div class="title">警情问题突出领域</div>
      <div class="list">
        <ul>
          <li v-for="(item, index) in top5" :key="index">
            <div class="icon">
              <svg-icon icon-class="ranking" class="svg-icon" />
              <div class="serial">{{ index + 1 }}</div>
            </div>
            <div class="names">{{ item.name }}</div>
            <div class="line"></div>
            <div class="num">{{ item.value }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="title">警情类型分布</div>
      <v-chart :options="rightBottomOptions" />
    </div>
    <PdfDialog :visible.sync="pdfModalVisible" :pdfFile="pdfFile" />
  </div>
</template>

<script>
import { alertTop5, alertNumber } from '@/api/intelligentDecisionMaking/special'
export default {
  data() {
    return {
      top5: [],
      pdfModalVisible: false,
      pdfFile: {},
      rightTopList: [
        {
          label: '2020年8月警情分析报告',
          date: '2020-09-08 17:19:08',
          url: require('@/assets/pdf/警情8月.pdf'),
          numPages: 2
        },
        {
          label: '2020年7月警情分析报告',
          date: '2020-08-11 11:56:05',
          url: '',
          numPages: null
        },
        {
          label: '2020年6月警情分析报告',
          date: '2020-07-03 08:46:22',
          url: '',
          numPages: null
        },
        {
          label: '2020年5月警情分析报告',
          date: '2020-06-05 14:43:18',
          url: '',
          numPages: null
        },
        {
          label: '2020年4月警情分析报告',
          date: '2020-05-07 10:19:04',
          url: '',
          numPages: null
        },
        {
          label: '2020年3月警情分析报告',
          date: '2020-04-06 10:33:01',
          url: '',
          numPages: null
        }
      ],
      rightBottomOptions: {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '5%',
          width: '90%',
          left: '5%',
          height: '70%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#A9DAFF',
            interval: 0
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          },
          data: ['行政（治安）', '黄赌毒', '交通事故', '刑事警情']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#A9DAFF'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '警情类型',
            type: 'bar',
            barWidth: '60%',
            data: [],
            label: {
              show: true,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3C9AFE'
                  },
                  {
                    offset: 1,
                    color: '#00FFFF'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    watchPdf(item) {
      if (item.url) {
        this.pdfModalVisible = true
        this.pdfFile.file = item.url
        this.pdfFile.numPages = item.numPages
      } else {
        this.downloadReport()
      }
    },
    downloadReport() {
      this.$message.warning('暂无报告')
    },
    getTop5() {
      alertTop5().then(res => {
        if (res.status === 200) {
          this.top5 = res.data
        }
      })
    },
    alertNumber() {
      alertNumber().then(res => {
        if (res.status === 200) {
          const dataList = []
          for (var key in res.data) {
            const one = {}
            switch (key) {
              case 'securityCount':
                one.name = '行政（治安）'
                one.value = res.data[key]
                dataList.push(one)
                break
              case 'yellowGamblerCount':
                one.name = '黄赌毒'
                one.value = res.data[key]
                dataList.push(one)
                break
              case 'trafficCount':
                one.name = '交通事故'
                one.value = res.data[key]
                dataList.push(one)
                break
              case 'criminalCount':
                one.name = '刑事警情'
                one.value = res.data[key]
                dataList.push(one)
                break
            }
          }
          this.sortList(dataList)
        }
      })
    },
    sortList(dataList) {
      this.rightBottomOptions.series[0].data = []
      this.rightBottomOptions.xAxis.data = []
      const newArr = dataList.sort(this._compare('value'))
      newArr.forEach((item, index) => {
        this.rightBottomOptions.series[0].data.unshift(item.value)
        this.rightBottomOptions.xAxis.data.unshift(item.name)
      })
    },
    _compare(property) {
      return function(a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    }
  },
  mounted() {
    this.getTop5()
    this.alertNumber()
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

.page-right {
  height: 100%;
}
.top,
.bottom {
  .title {
    margin: 10px 0 20px 30px;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
  }
}
.top {
  width: 420px;
  height: 275px;
  background: url('~@/assets/image/policeSituation/left-top.png') center center /
    100% 100% no-repeat;
  .list {
    margin: 35px 0 0 18px;
    .item {
      width: 375px;
      height: 80px;
      cursor: pointer;
      padding: 15px 0 0 70px;
      margin-bottom: 25px;
      position: relative;
      background: url('~@/assets/image/policeSituation/right-top-item.png')
        center center / 100% 100% no-repeat;
      .label {
        color: #e0f1ff;
        line-height: 18px;
      }
      .date {
        color: #569af6;
        line-height: 48px;
      }
    }
    .download {
      position: absolute;
      width: 50px;
      height: 80px;
      top: 0px;
      right: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      .svg-icon {
        color: #a9daff;
        font-size: 30px;
      }
    }
  }
  .top5 {
    width: 100%;
    height: 202px;
    ul {
      width: 100%;
      height: auto;
      padding: 0px;
      margin: 0px;
      margin-top: 25px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      li {
        width: 96px;
        height: 96px;
        margin: 0px 12px;
        background: url('~@/assets/image/policeSituation/li-bg.png') center
          center / 100% 100% no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h1,
        h2 {
          margin: 0px;
          padding: 0px;
          line-height: 25px;
        }
        h1 {
          font-size: 14px;
          color: #a9daff;
        }
        h2 {
          font-size: 18px;
          color: #a9daff;
        }
      }
    }
  }
}
.center {
  background: url('~@/assets/image/policeSituation/right-center.png') center
    center / 100% 100% no-repeat;
  .list {
    height: 212px;
    margin: 35px 0 0 0px;
    ul {
      margin: 0px 30px;
      padding: 0px;
      li {
        display: flex;
        flex-direction: row;
        margin: 20px 0px;
        .icon {
          width: 19px;
          height: 19px;
          margin-right: 10px;
          position: relative;
          .svg-icon {
            font-size: 19px;
            color: #3b9afe;
          }
          .serial {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 19px;
            height: 19px;
            line-height: 19px;
            text-align: center;
            color: #00225c;
          }
        }
        .names {
          color: #a9daff;
          font-size: 16px;
        }
        .line {
          flex: 1;
          height: 17px;
          border-bottom: 1px dashed #1e539a;
          margin: 0px 13px 0px 2px;
        }
        .num {
          color: #a9daff;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
}
.bottom {
  width: 420px;
  height: 275px;
  background: url('~@/assets/image/policeSituation/left-top.png') center center /
    100% 100% no-repeat;
}
</style>

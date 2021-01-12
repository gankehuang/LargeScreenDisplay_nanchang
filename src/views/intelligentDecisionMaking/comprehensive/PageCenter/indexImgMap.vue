<template>
  <div class="index-img-map-container">
    <div class="total-score">
      {{ selectedItem.name }}总分：<span>{{ selectedItem.total }}</span>
      <!-- <div class="select-box">
        <el-select
          v-model="yearValue"
          placeholder="请选择"
          class="yearSelect"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in yearOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="monthValue"
          placeholder="请选择"
          class="monthSelect"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in monthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
    </div>
    <div
      :class="[
        'data-view-map-button',
        handleColorByScore(item),
        { selected: selectedItem.name === item.name }
      ]"
      v-for="(item, index) in buttonList"
      :key="index"
      :style="item.style"
      @click="changeData(item)"
    >
      {{ item.name }}
    </div>
    <img :src="bg" />
    <img :src="mapBg" class="map-bg" />
    <div class="index-img-map-legend">
      <div class="item" v-for="(item, index) in colorLegend" :key="index">
        <span class="color" :style="{ background: item.color }"></span>
        <span class="data">{{ item.score }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { buttonList, initTotalData } from '../mock'
import {
  querySecurityAssessList,
  querySecurityAssessInfo,
  monthDataList
} from '@/api/intelligentDecisionMaking/comprehensive'
const initBg = require('@/assets/image/dataView/map.png')
const initMapBg = require('@/assets/image/comprehensive/map-bg.png')
export default {
  data() {
    return {
      buttonList: buttonList,
      bg: initBg,
      mapBg: initMapBg,
      selectedItem: initTotalData,
      yearOptions: [
        {
          value: '2020',
          label: '2020'
        }
      ],
      monthOptions: [
        {
          value: '1',
          label: '1月'
        },
        {
          value: '2',
          label: '2月'
        },
        {
          value: '3',
          label: '3月'
        },
        {
          value: '4',
          label: '4月'
        },
        {
          value: '5',
          label: '5月'
        },
        {
          value: '6',
          label: '6月'
        },
        {
          value: '7',
          label: '7月'
        },
        {
          value: '8',
          label: '8月'
        },
        {
          value: '9',
          label: '9月'
        },
        {
          value: '10',
          label: '10月'
        },
        {
          value: '11',
          label: '11月'
        },
        {
          value: '12',
          label: '12月'
        }
      ],
      colorLegend: [
        { score: '95 ~ 100', color: '#0D2861' },
        { score: '90 ~ 95', color: '#C9A73A' },
        { score: '85 ~ 90', color: '#F16C00' },
        { score: '80 ~ 85', color: '#F82A36' }
      ],
      monthValue: '1',
      yearValue: '2020'
    }
  },
  watch: {
    selectedItem(item) {
      this.handleMonthDataList()
    },
    buttonList(list) {
      console.log(list)
      this.buttonList = list
    }
  },
  async mounted() {
    await this.handleQuerySecurityAssessList()
    await this.handleQuerySecurityAssessInfo()
    await this.handleMonthDataList()
    await this.changeData(this.selectedItem)
  },
  methods: {
    // 区分颜色
    handleColorByScore(item) {
      // console.log(score)
      if (item.total >= 95) {
        return 'style-100'
      } else if (item.total < 95 && item.total >= 90) {
        return 'style-97'
      } else if (item.total < 90 && item.total >= 85) {
        return 'style-95'
      } else if (item.total < 85 && item.total >= 80) {
        return 'style-92'
      }
    },
    // 整合地图分数后端联调数据
    handleBackenddata(data, buttonList) {
      this.buttonList = data.map(item => {
        for (let index = 0; index < buttonList.length; index++) {
          const element = buttonList[index]
          if (item.gridCode === element.code) {
            return {
              ...element,
              value: item.score,
              total: item.score
            }
          }
        }
      })
    },
    // 整合指数详情后端联调数据
    handleBackendAssessInfodata(data, buttonList) {
      const flagArr = [
        '政治安全',
        '治安安全',
        '经济犯罪',
        '公共安全',
        '矛盾纠纷',
        '公众安全感'
      ]
      if (this.selectedItem.code === '3601') {
        this.selectedItem.scoreList = this.selectedItem.scoreList.map(
          (item, index) => data.detail[flagArr[index]]
        )
        this.selectedItem.total = data.totalScore
      } else {
        const that = this
        this.selectedItem = that.buttonList.filter(
          button => button.code === that.selectedItem.code
        )[0]
        this.selectedItem.scoreList = this.selectedItem.scoreList.map(
          (item, index) => data.detail[flagArr[index]]
        )
        this.selectedItem.total = data.totalScore
      }
    },
    // 切换数据
    async changeData(item) {
      if (item.name === this.selectedItem.name) {
        this.selectedItem = initTotalData
        this.bg = initBg
      } else {
        this.selectedItem = item
        this.bg = item.imgUrl
      }
      await this.handleQuerySecurityAssessList()
      await this.handleQuerySecurityAssessInfo()
      this.$EventBus.$emit('selectedItemData', this.selectedItem)
      this.$EventBus.$emit('selectedItemCode', this.selectedItem.code)
    },
    // 获取各县区得分
    async handleQuerySecurityAssessList() {
      try {
        const { status, data } = await querySecurityAssessList({
          indicatorName: '综合',
          level: 0
        })
        if (status === 200) {
          this.$nextTick(() => {
            this.handleBackenddata(data, this.buttonList)
          })
        }
      } catch (error) {}
    },
    // 获取各县区安全指数统计详情
    async handleQuerySecurityAssessInfo() {
      try {
        const { status, data } = await querySecurityAssessInfo({
          code: this.selectedItem.code
        })
        if (status === 200) {
          this.handleBackendAssessInfodata(data, this.buttonList)
        }
      } catch (error) {}
    },
    // 安全评分按按月变化情况
    async handleMonthDataList() {
      try {
        const { status, data } = await monthDataList({
          code: this.selectedItem.code,
          dataCount: this.monthNumber
        })
        if (status === 200) {
          this.$EventBus.$emit('backendMonthDataData', data)
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.style-100 {
  background: url("~@/assets/image/comprehensive/score-100.png") center center /
    100% 100% no-repeat;
}
.style-97 {
  background: url("~@/assets/image/comprehensive/score-97.png") center center /
    100% 100% no-repeat;
}
.style-95 {
  background: url("~@/assets/image/comprehensive/score-95.png") center center /
    100% 100% no-repeat;
}
.style-92 {
  background: url("~@/assets/image/comprehensive/score-92.png") center center /
    100% 100% no-repeat;
}
.index-img-map-container {
  position: fixed;
  top: 300px;
  right: 200px;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 970px;
  height: 832px;
  // background: url('~@/assets/image/dataView/map-container-bg.png') center center /
  //   100% 100% no-repeat;
}
.data-view-map-button {
  position: absolute;
  z-index: 999;
  width: 120px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #fff;
  padding-left: 20px;
  cursor: pointer;
  // background: url('~@/assets/image/dataView/map-button.png') center center /
  //   100% 100% no-repeat;
}
.data-view-map-button.selected {
  background: url("~@/assets/image/dataView/map-button-selected.png") center
    center / 100% 100% no-repeat;
  color: #00ffff;
}
.total-score {
  position: absolute;
  top: -60px;
  left: 120px;
  color: #a9daff;
  font-size: 26px;
  font-weight: bold;
  z-index: 1000;
  span {
    color: #1bd7f9;
    font-size: 26px;
    font-weight: bold;
  }
}
.select-box {
  width: 171px;
  height: 48px;
  background: url("~@/assets/image/comprehensive/select-bgm.png") no-repeat;
  position: absolute;
  top: 40px;
  left: -10px;
  z-index: 2;
  .el-select {
    width: 85px;
    height: 48px;
  }
  .el-input--small .el-input__inner {
    width: 85px !important;
    height: 48px !important;
    border: none;
  }
}
.yearSelect {
  .el-select-dropdown {
    min-width: 170px !important;
    background-color: #00285b !important;
  }
  .popper__arrow {
    left: 77px !important;
  }
  .el-select-dropdown__item span {
    font-size: 14px !important;
    color: #fff;
    font-weight: normal !important;
  }
  .el-select-dropdown__item {
    text-align: center;
  }
}
.monthSelect {
  .el-select-dropdown {
    min-width: 170px !important;
    left: 486px !important;
    background-color: #00285b !important;
  }
  .popper__arrow {
    left: 77px !important;
  }
  .el-select-dropdown__item {
    text-align: center;
  }
  .el-select-dropdown__item span {
    font-size: 14px !important;
    color: #fff;
    font-weight: normal !important;
  }
}
.index-img-map-legend {
  position: absolute;
  top: -70px;
  right: -40px;
  color: #a9daff;
  font-size: 26px;
  font-weight: bold;
  z-index: 1000;
  .color {
    width: 26px;
    height: 13px;
    background: #0d2861;
    border-radius: 7px;
    display: inline-block;
    margin-right: 10px;
  }
  .data {
    color: #a9daff;
    font-size: 18px;
  }
}
.map-bg {
  position: absolute;
  top: -30px;
  left: -160px;
}
</style>

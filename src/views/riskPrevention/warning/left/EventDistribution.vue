<template>
  <InfoBlock
    title="事件分布"
    height="48%"
  >
    <template v-slot:topRight>
      <div class="legand-box">
        <div class="item-legand">
          <span class="item-dot" />
          <span>已处理</span>
        </div>
        <div class="item-legand">
          <span class="item-dot" />
          <span>总数</span>
        </div>
      </div>
    </template>
    <div class="list-container">
      <div
        v-for="(item, index) in objList"
        :key="index"
        class="list-item"
      >
        <span class="item-name">{{ item.regionCode }}</span>
        <div class="item-progress">
          <el-progress
            :style="{ width: getWidth(item.totalCount) + '%' }"
            :text-inside="true"
            :stroke-width="15"
            :percentage="getPercentage(item.unProcessedCount, item.totalCount)"
          />
          <span class="item-total">{{ item.totalCount }}</span>
        </div>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
import { countEventByRegion } from '@/api/intelligentCommand/warning'

export default {
  data () {
    return {
      objList: []
    }
  },
  created () {
    this.countEventByRegion()
  },
  methods: {
    getPercentage (unProcessedCount, totalCount) {
      return Number((unProcessedCount / totalCount * 100).toFixed(2))
    },
    countEventByRegion () {
      countEventByRegion().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.objList = data.sort((a, b) => {
            return b.totalCount - a.totalCount
          })
        }
      })
    },
    _compare (property) {
      return function (a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    },
    getWidth (totalCount) {
      const totalNum = this.objList.map(item => item.totalCount)
      const maxNum = Math.max.apply(null, totalNum)
      return Number((totalCount / maxNum * 100).toFixed(2))
    }
  }
}
</script>

<style lang="scss" scoped>
.legand-box {
  display: flex;
  .item-legand {
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    margin-right: 15px;
    .item-dot {
      margin-right: 8px;
      width: 8px;
      height: 8px;
      background: linear-gradient(90deg, #3B9AFE 0%, #00FFFF 100%);
    }

    &:last-child {
      .item-dot {
        background: #0075AB;
      }
    }
  }
}

::v-deep .el-progress-bar__inner {
  background: linear-gradient(90deg, #3B9AFE 0%, #00FFFF 100%);
  border-radius: 0;
}
::v-deep .el-progress-bar__outer {
  background-color: #0075AB;
  border-radius: 0;
}

.list-container {
  margin-top: 10px;
  .list-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .item-name {
      color: #A1D8FF;
      flex: 0 0 80px;
    }

    .item-progress {
      display: flex;
      flex: 0 0 calc(100% - 80px);
      ::v-deep .el-progress-bar__inner {
        background: linear-gradient(90deg, #3B9AFE 0%, #00FFFF 100%);
        border-radius: 0;
      }
      ::v-deep .el-progress-bar__outer {
        background-color: #0075AB;
        border-radius: 0;
      }
      ::v-deep .el-progress-bar__innerText {
        color: #031C3C;
      }
    }

    .item-total {
      margin-left: 13px;
      color: #FEFFFF;
      font-size: 16px;
      font-weight: 500;
      text-align: right;
    }
  }
}
</style>

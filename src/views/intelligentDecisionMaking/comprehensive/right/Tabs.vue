<template>
  <div class="tabs">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      class="tab"
      :class="selectedItem.index === index ? 'tab-selected' : ''"
      @click="handleTab({ index, ...item })"
    >
      <div
        class="label"
        :title="item.label"
        @click="index === 0 ? handleSelectedIndicator({
          label: '综合',
          indicatorName: '综合',
          level: 0
        }) : ''"
      >
        {{ item.label }}
      </div>
      <ul
        class="tab-ul"
        :style="index === 1 && selectedItem.index === index ? '' : 'display:none'"
      >
        <li
          v-for="(item_one, index_one) in oneLevel"
          :key="index_one"
          @click="handleOneLevel(item_one)"
        >
          <span @click="handleSelectedIndicator({ ...item_one, level: 1 })">
            {{ item_one.label }}
          </span>
        </li>
      </ul>
      <ul
        class="tab-ul"
        :style="index === 2 && selectedItem.index === index ? '' : 'display:none'"
      >
        <li
          v-for="(item_two, index_two) in twoLevel"
          :key="index_two"
          :title="item_two.label"
          @click="handleTwoLevel(item_two)"
        >
          <span @click="handleSelectedIndicator({ ...item_two, level: 2 })">
            {{ item_two.label }}
          </span>
        </li>
      </ul>
      <ul
        class="tab-ul"
        :style="index === 3 && selectedItem.index === index ? '' : 'display:none'"
      >
        <li
          v-for="(item_three, index_three) in threeLevel"
          :key="index_three"
          :title="item_three.label"
          @click="handleThreeLevel(item_three)"
        >
          <span @click="handleSelectedIndicator({ ...item_three, level: 3 })">
            {{ item_three.label }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { initTwoLevel, initThreeLevel } from '../mock'
export default {
  data () {
    return {
      selectedCounty: undefined,
      selectedItemCode: '',
      selectedItem: { index: undefined },
      oneLevelItem: { label: '政治安全' },
      twoLevelItem: { label: '政治安全防范' },
      tabs: [
        {
          label: '总分'
        },
        {
          label: '一级指标'
        },
        {
          label: '二级指标'
        },
        {
          label: '三级指标'
        }
      ],
      oneLevel: [
        {
          label: '政治安全'
        },
        {
          label: '治安安全'
        },
        {
          label: '经济安全'
        },
        {
          label: '公共安全'
        },
        {
          label: '矛盾纠纷'
        },
        {
          label: '公众安全感'
        }
      ],
      twoLevel: [],
      threeLevel: []
    }
  },
  watch: {
    oneLevelItem (oneLevelItem) {
      this.twoLevel = initTwoLevel
      this.twoLevel = this.twoLevel.filter(
        item => item.upLevelLabel === oneLevelItem.label
      )
    },
    twoLevelItem (twoLevelItem) {
      this.threeLevel = initThreeLevel
      this.threeLevel = this.threeLevel.filter(
        item => item.upLevelLabel === twoLevelItem.label
      )
    }
  },
  mounted () {},
  methods: {
    handleTab (item) {
      if (item.index === 0) {
        this.handleOneLevel({ label: '一级指标' })
        this.handleTwoLevel({ label: '二级指标' })
        this.handleThreeLevel({ label: '三级指标' })
      }
      if (this.selectedItem.index === item.index) {
        this.selectedItem = { index: undefined }
      } else {
        this.selectedItem = item
      }
    },
    handleOneLevel (item) {
      this.oneLevelItem = { label: item.label }
      this.tabs[1] = { label: item.label }
      this.handleTwoLevel({ label: '二级指标' })
      this.handleThreeLevel({ label: '三级指标' })
    },
    handleTwoLevel (item) {
      this.twoLevelItem = { label: item.label }
      this.tabs[2] = { label: item.label }
    },
    handleThreeLevel (item) {
      this.tabs[3] = { label: item.label }
    },
    // 整合各县区综合排名列表后端联调数据
    handleBackenddata (data, listData) {
      this.listData = data.map(item => {
        for (let index = 0; index < listData.length; index++) {
          const element = listData[index]
          if (item.gridCode === element.code) {
            return {
              ...element,
              indexName: item.indicatorName ? item.indicatorName : '总分',
              score: item.score,
              rank: item.rank,
              sortChange: item.rankChange
            }
          }
        }
      })
      this.$emit('selectedListData', this.listData)
    },
    // 获取当前选中指标
    handleSelectedIndicator (indicator) {
      this.$emit('handleSelectedIndicator', indicator)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  margin: 10px auto 7px;
  width: 95%;
  display: flex;
  .tab {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #7ebdff;
    background: url("~@/assets/image/comprehensive/right-box-tab-item.png")
      no-repeat center center;
    background-size: 100% 100%;
    cursor: pointer;
    .label {
      width: 100%;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tab-selected {
    background: url("~@/assets/image/comprehensive/right-box-tab-selected-item.png")
      no-repeat center center;
    background-size: 100% 100%;
  }
  .tab-ul {
    list-style-type: none;
    padding: 0;
    width: 95px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #0167d7;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
    position: relative;
    z-index: 10;
    li {
      display: block;
      font-size: 18px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background-color: #05193d;
      }
    }
  }
}
</style>

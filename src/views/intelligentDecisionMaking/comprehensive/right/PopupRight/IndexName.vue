<template>
  <div class="index-name-container">
    <div class="title" />
    <span
      v-for="(item, index) in indexNameList"
      :key="index"
      class="index-name-item"
    >
      <span class="text-overflows">{{ item.label }}</span>
      <font>{{ item.score }}项</font>
    </span>
  </div>
</template>

<script>
// import { modalMockData } from '../mock'
import { superviseStatisticByRegion } from '@/api/intelligentDecisionMaking/comprehensive'

export default {
  props: {
    code: {
      type: String,
      default: () => '3601'
    }
  },
  data () {
    return {
      indexNameList: [
        {
          label: '预警2级指标',
          score: 6
        },
        {
          label: '预警3级指标',
          score: 8
        },
        {
          label: '排名靠后3级指标',
          score: 5
        }
      ]
    }
  },
  computed: {},
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      const list = {
        code: this.code
      }
      superviseStatisticByRegion(list).then(res => {
        if (res.status === 200) {
          this.indexNameList[0].score = res.data.warn2Indicators.length
          this.indexNameList[1].score = res.data.warn3Indicators.length
          this.indexNameList[2].score = res.data.lowRank3Indicators.length
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.index-name-container {
  padding: 30px 0 0 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .index-name-item {
    margin-right: 30px;
    width: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      font-size: 16px;
      font-weight: bold;
      color: #a9daff;
      line-height: 38px;
      display: inline-block;
      margin-right: 10px;
    }
    font {
      font-size: 30px;
      font-weight: bold;
      color: #00ffff;
      line-height: 38px;
      cursor: pointer;
    }
  }
}
</style>

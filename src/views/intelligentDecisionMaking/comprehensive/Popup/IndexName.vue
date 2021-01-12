<template>
  <div class="index-name-container">
    <div class="title"></div>
    <span
      class="index-name-item"
      v-for="(item, index) in indexNameList"
      :key="index"
    >
      <span class="text-over">{{ item.indicatorName }}</span>
      <font>{{ item.score }}</font>
    </span>
  </div>
</template>

<script>
import { getSubLevelByRegion } from '@/api/intelligentDecisionMaking/comprehensive'
export default {
  watch: {
    // index: {
    //   immediate: true,
    //   handler() {
    //     this.getList()
    //   }
    // }
  },
  props: {
    index: {
      type: Number,
      default: () => 1
    },
    code: {
      type: String,
      default: () => '3601'
    }
  },
  data() {
    return {
      indexNameList: []
    }
  },
  mounted() {
    this.getList()
  },
  computed: {},
  methods: {
    getList() {
      const list = {
        code: this.code,
        firstIndicator: parseInt(this.index) + 1
      }
      getSubLevelByRegion(list).then(res => {
        if (res.status === 200) {
          console.log(res.data)
          this.indexNameList = res.data.secondIndicatorList
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.index-name-container {
  padding: 0 0 0 80px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  align-items: center;
  .index-name-item {
    flex: 0 0 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
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

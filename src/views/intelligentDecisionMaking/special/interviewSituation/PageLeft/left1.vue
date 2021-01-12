<template>
  <div class="win-info">
    <div class="tran">
      <div class="count">
        {{ count.releasePeopleCount }}
      </div>
      重点信访人员
    </div>
    <div class="tran">
      <div class="count">
        {{ count.postureNum }}
      </div>
      信访事件
    </div>
  </div>
</template>
<script>
import { queryPostureCount } from '@/api/intelligentDecisionMaking/mood'
export default {
  props: {
    countyList: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      count: {
        postureNum: '-',
        releasePeopleCount: '-'
      }
    }
  },
  created() {
    this.numberData()
  },
  methods: {
    numberData() {
      const objects = {
        gridCode: '3601'
      }
      queryPostureCount(objects).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.count = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.win-info {
  width: 420px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  .tran {
    width: 202px;
    background: url("~@/assets/image/interviewSituation/left1-bg.png") no-repeat
      center;
    background-size: 100% 100%;
    font-size: 18px;
    color: #7dbcff;
    font-weight: bold;
    text-align: center;
    .count {
      line-height: 44px;
      font-size: 24px;
      color: #f6eb33;
      margin-top: 22px;
    }
  }
}
</style>

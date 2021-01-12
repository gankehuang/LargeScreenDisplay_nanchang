<template>
  <div class="supervisoryOpinion">
    <div class="opinion-one">
      {{ lowRank2Indicators }}
    </div>
    <div class="opinion-one">
      {{ publicSecurity }}
    </div>
    <div class="opinion-one">
      {{ conflict }}
    </div>
    <div class="opinion-one">
      {{ publicSafety }}
    </div>
  </div>
</template>

<script>
import { superviseStatisticByRegion } from '@/api/intelligentDecisionMaking/comprehensive'
export default {
  props: {
    code: {
      type: String,
      default: () => '3601'
    }
  },
  data() {
    return {
      lowRank2Indicators: '', // 第一句话
      publicSecurity: '', // 治安安全
      conflict: '', // 矛盾纠纷
      publicSafety: '' // 公共安全
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取接口
    getList() {
      const list = {
        code: this.code
      }
      superviseStatisticByRegion(list).then(res => {
        if (res.status === 200) {
          this.processOne(res.data.lowRank2Indicators)
          this.processTwo(res.data.warn3Indicators)
        }
      })
    },
    // 拼第一句话
    processOne(data) {
      const arr = []
      if (data && data.length > 0) {
        const num = data.length
        data.forEach(item => {
          arr.push(item.indicatorName)
        })
        const list = arr.join('、')
        this.lowRank2Indicators =
          '排名靠后的二级指标有' + num + '项，包括' + list + '。'
      }
    },
    // 提取三种类型的分类数组
    processTwo(data) {
      const list = {
        redSec: [],
        orangeSec: [],
        redCon: [],
        orangeCon: [],
        redPub: [],
        orangePub: []
      }
      if (data && data.length > 0) {
        data.forEach(item => {
          if (item.firstIndicatorName === '治安安全' && item.score < 85) {
            list.redSec.push(item.indicatorName)
          }
          if (
            item.firstIndicatorName === '治安安全' &&
            item.score >= 85 &&
            item.score < 87.5
          ) {
            list.orangeSec.push(item.indicatorName)
          }
          if (item.firstIndicatorName === '矛盾纠纷' && item.score < 85) {
            list.redCon.push(item.indicatorName)
          }
          if (
            item.firstIndicatorName === '矛盾纠纷' &&
            item.score >= 85 &&
            item.score < 87.5
          ) {
            list.orangeCon.push(item.indicatorName)
          }
          if (item.firstIndicatorName === '公共安全' && item.score < 85) {
            list.redPub.push(item.indicatorName)
          }
          if (
            item.firstIndicatorName === '公共安全' &&
            item.score >= 85 &&
            item.score < 87.5
          ) {
            list.orangePub.push(item.indicatorName)
          }
        })
        this.publicSecurity = this.processThree(
          list['redSec'],
          list['orangeSec'],
          '治安安全'
        )
        this.conflict = this.processThree(
          list['redCon'],
          list['orangeCon'],
          '矛盾纠纷'
        )
        this.publicSafety = this.processThree(
          list['redPub'],
          list['orangePub'],
          '公共安全'
        )
      }
    },
    // 拼接三句话
    processThree(list1, list2, type) {
      let str = ''
      if (list1.length > 0 && list2.length > 0) {
        str =
          type +
          '项下的三级指标中，' +
          list1.join('、') +
          '为红色预警，' +
          list2.join('、') +
          '为橙色预警。'
      }
      if (list1.length > 0 && list2.length === 0) {
        str = type + '项下的三级指标中，' + list1.join('、') + '为红色预警。'
      }
      if (list1.length === 0 && list2.length > 0) {
        str = type + '项下的三级指标中，' + list2.join('、') + '为橙色预警。'
      }
      if (list1.length === 0 && list2.length === 0) {
        str = ''
      }
      this.$emit(
        'superviseInfo',
        this.lowRank2Indicators +
          this.publicSecurity +
          this.conflict +
          this.publicSafety
      )
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.supervisoryOpinion {
  padding: 0 90px;
  .opinion-one {
    font-size: 16px;
    font-weight: 400;
    color: #a9daff;
    line-height: 30px;
  }
}
</style>

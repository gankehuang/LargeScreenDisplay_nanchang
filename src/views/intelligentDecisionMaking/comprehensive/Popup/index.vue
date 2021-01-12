<template>
  <div class="mask-container" v-if="visible">
    <div class="mask"></div>
    <div class="comprehensive-popup-container">
      <div class="popup-close" @click="close"></div>
      <div class="analysis">
        <svg-icon icon-class="popup-tip" class="analysis-icon"></svg-icon>
        <span class="analysis-title">二级指标得分</span>
      </div>
      <IndexName :index="index" :code="code" />
      <!-- <RadarBlock />
      <BarBlock /> -->
      <div class="analysis">
        <svg-icon icon-class="popup-tip" class="analysis-icon"></svg-icon>
        <span class="analysis-title">三级指标得分</span>
      </div>
      <TableList :index="index" :code="code" />
    </div>
  </div>
</template>

<script>
import IndexName from './IndexName'
import TableList from './TableList'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    buttonVisible: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    }
  },
  components: {
    IndexName,
    TableList
  },
  watch: {
    visible(val) {}
  },
  data() {
    return {
      selectedCounty: undefined,
      selectedIndicator: { label: '总分' },
      IndexNameList: [],
      code: ''
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:selectedCounty')
    this.$EventBus.$off('update:selectedIndicator')
    this.$EventBus.$off('update:selectedItemCode')
  },
  mounted() {
    this.$EventBus.$on(
      'update:selectedCounty',
      county => (this.selectedCounty = county)
    )
    this.$EventBus.$on(
      'update:selectedIndicator',
      indicator => (this.selectedIndicator = indicator)
    )
    this.$EventBus.$on('selectedItemCode', code => {
      this.code = code
    })
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-container {
  position: absolute;
}
.comprehensive-popup-container {
  position: fixed;
  z-index: 1000;
  padding-top: 30px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 1350px;
  height: 830px;
  background: url("~@/assets/image/comprehensive/popup-container.png") center
    center / 100% 100% no-repeat;
}
.popup-close {
  position: absolute;
  top: 30px;
  right: 40px;
  width: 20px;
  height: 20px;
  background: url("~@/assets/image/comprehensive/popup-close.png") center center /
    100% 100% no-repeat;
}
.analysis {
  padding: 20px 0 20px 90px;
  color: #a9daff;
  .analysis-icon {
    color: #fe4d3b;
  }
  .analysis-title {
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    display: inline-block;
    margin: 0 10px;
  }
}
.urge-button {
  display: inline-block;
  width: 110px;
  height: 34px;
  margin-top: 5px;
  line-height: 34px;
  text-align: center;
  color: #3b9afe;
  cursor: pointer;
  background: url("~@/assets/image/comprehensive/urge-button.png") center center /
    100% 100% no-repeat;
}
</style>

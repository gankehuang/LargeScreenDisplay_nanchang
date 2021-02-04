<template>
  <Dialog
    v-if="visible"
    width="70%"
    title="指数"
    :visible.sync="visible"
    :before-close="closeModal"
    :append-to-body="true"
  >
    <div class="analysis">
      <svg-icon
        icon-class="popup-tip"
        class="analysis-icon"
      />
      <span class="analysis-title">二级指标得分</span>
    </div>
    <IndexName
      :index="info"
      :code="code"
    />
    <div class="analysis">
      <svg-icon
        icon-class="popup-tip"
        class="analysis-icon"
      />
      <span class="analysis-title">三级指标得分</span>
    </div>
    <TableList
      :index="info"
      :code="code"
    />
  </Dialog>
</template>

<script>
import IndexName from './IndexName'
import TableList from './TableList'
export default {
  components: {
    IndexName,
    TableList
  },
  props: {
    info: {
      type: Number,
      default: 3360
    }
  },
  data () {
    return {
      visible: false,
      selectedCounty: undefined,
      selectedIndicator: { label: '总分' },
      IndexNameList: [],
      code: ''
    }
  },
  watch: {
    visible (val) {}
  },
  beforeDestroy () {
    this.$EventBus.$off('update:selectedCounty')
    this.$EventBus.$off('update:selectedIndicator')
    this.$EventBus.$off('update:selectedItemCode')
  },
  mounted () {
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
    closeModal () {
      this.visible = false
    },
    openModal () {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>

.analysis {
  padding: 0px 0 10px 90px;
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

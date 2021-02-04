<!-- 惠民服务 预警处置、活动之后、县区督导 的排版组件 -->
<template>
  <div class="tlb-box form-page">
    <div
      class="search-bar"
    >
      <div class="left">
        <slot name="title-left" />
      </div>
      <div class="right">
        <slot name="title-right" />
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  beforeDestroy () {
  },
  activated () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }

}
</script>
<style lang='scss' scoped>
@import '~@/styles/form.scss';
.tlb-box {
  width: 100%;
  height: 498px;
  background: rgba(8, 28, 63, 0.47);
  border: 0.5px solid #0f4f8f;
}
</style>

<template>
  <el-table
    :data="data"
    v-bind="$attrs"
    v-on="$listeners"
    v-loading="isLoading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <template slot="empty">
      <P>{{ text }}</P>
    </template>
    <slot />
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: ''
    }
  },
  watch: {
    isLoading(val) {
      if (val) {
        this.text = ''
      }
    },
    data(arr) {
      if (arr.length === 0) {
        this.text = this.$props.emptyText
      } else {
        this.text = ''
      }
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <el-tree
    v-bind="$attrs"
    v-on="$listeners"
    :empty-text="text"
    :data="data"
    v-loading="isLoading"
    element-loading-background="rgba(122,191,238,0.5)"
  />
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          children: 'children'
        }
      }
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
    data(val) {
      if (this.$props.data.length === 0) {
        this.text = this.$props.emptyText
      } else {
        this.text = ''
      }
    }
  }
}
</script>

<style></style>

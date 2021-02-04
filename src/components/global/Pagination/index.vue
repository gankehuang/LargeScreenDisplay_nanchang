<template>
  <el-pagination
    class="pagination"
    :current-page="pageNum"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="sizeChange"
    @current-change="currentChange"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    pageNum: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 15, 25, 50]
    },
    total: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      size: null
    }
  },
  methods: {
    sizeChange (val) {
      this.size = val
      this.$emit('update:pageNum', 1)
      this.$emit('update:pageSize', val)
      this.$emit('pagination-change', { pageSize: val, pageNum: 1 })
    },
    currentChange (val) {
      this.$emit('update:pageNum', val)
      this.$emit('pagination-change', { pageSize: this.size, pageNum: val })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>

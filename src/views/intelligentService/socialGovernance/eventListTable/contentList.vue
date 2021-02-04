<template>
  <div style="height: 100%">
    <el-table
      :data="tableData"
      current-row-key="id"
      height="700"
      stripe
    >
      <el-table-column label="事件标题">
        <template slot-scope="scope">
          <span style="color: #7ff2f4">
            {{ scope.row.eventName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="事件时间"
        prop="happenTime"
      />
      <el-table-column
        label="办结期限"
        prop="handleDate"
      />
      <el-table-column
        label="事件分类"
        prop="typeText"
      />
      <el-table-column
        label="所属网格"
        prop="gridName"
      />
      <el-table-column
        label="当前状态"
        prop="status"
      />
      <el-table-column
        label="采集时间"
        prop="collectDate"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEventDetails(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :page-size.sync="pagination.pageSize"
      :page-num.sync="pagination.pageNum"
      :total.sync="pagination.total"
      @pagination-change="change"
    />
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    backValue: {
      type: Function,
      default: () => {}
    },
    pagination: {
      type: Object,
      required: true,
      default: () => ({
        pageNum: 1,
        pageSize: 15,
        total: 10000
      })
    },
    itemBack: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  methods: {
    handleEventDetails (rowData) {
      if (this.itemBack) {
        this.itemBack({
          visible: true,
          info: rowData
        })
      }
    },
    change (e) {
      if (this.backValue) {
        this.backValue(e.pageNum, e.pageSize)
      }
    }
  }

}
</script>
<style lang='scss' scoped>
</style>

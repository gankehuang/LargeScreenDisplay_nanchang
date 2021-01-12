<template>
  <div class="table-list-container">
    <el-table
      :data="tableData"
      height="200"
      :header-cell-style="{ 'background-color': 'rgba(169, 218, 255, 0.27)' }"
    >
      <el-table-column
        label="一级指标"
        align="center"
        prop="firstIndicatorName"
      ></el-table-column>
      <el-table-column
        label="二级指标"
        align="center"
        prop="secondIndicatorName"
      ></el-table-column>
      <el-table-column
        label="三级指标"
        align="center"
        prop="indicatorName"
      ></el-table-column>
      <el-table-column
        label="权重"
        align="center"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="得分"
        align="center"
        prop="score"
      ></el-table-column>
    </el-table>
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
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const list = {
        code: this.code
      }
      superviseStatisticByRegion(list).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.warn3Indicators
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/customTable.scss";
.table-list-container {
  padding: 0 90px;
}
</style>

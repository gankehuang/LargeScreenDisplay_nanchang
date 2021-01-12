<template>
  <div
    class="page"
    v-loading="isLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <div class="search-bar">
      <div class="left">
        <el-button type="primary" icon="el-icon-plus">录入信息</el-button>
      </div>
      <div class="right">
        <el-input
          v-model="advancedForm.name"
          placeholder="发布机构"
          clearable
          class="search-input"
        />
        <el-button type="primary">查询</el-button>
        <el-button plain @click="advancedSearchShow = true">高级搜索</el-button>
      </div>
    </div>

    <search-advance v-show="advancedSearchShow">
      <el-form ref="advancedForm" :model="advancedForm" label-width="140px">
        <el-form-item label="标题">
          <el-input clearable class="search-input" />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>

        <el-form-item class="buttons">
          <el-button type="primary" @click="searchAdvance">查询</el-button>
          <el-button type="primary" @click="resetSearchForm">重置</el-button>
          <el-button plain @click="advancedSearchShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </search-advance>

    <div class="control-bar">
      <el-button
        plain
        icon="el-icon-delete"
        :disabled="!selection.length"
        @click="del(selection)"
        >批量删除</el-button
      >
    </div>

    <el-table
      v-loading="false"
      :data="tableData"
      current-row-key="id"
      height="100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed="left" />
      <el-table-column label="标题" prop="sqr" width="400" />
      <el-table-column label="发布机构" prop="ssqy" />
      <el-table-column label="发布状态" prop="bszt" />
      <el-table-column label="发布时间" prop="bslb" />
      <el-table-column label="操作" width="350" fixed="right">
        <template>
          <td-btn content="编辑" icon="el-icon-edit" />
          <td-btn content="删除" icon="el-icon-delete" />
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :page-size.sync="pagination.pageSize"
      :page-num.sync="pagination.pageNum"
      :total.sync="pagination.total"
      @pagination-change="getList"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      selection: [],
      tableData: [
        {
          sqr:
            '关于印发《2020年度市综治责任单位平安建设（综治工作）考核评价内容》的通知',
          ssqy: '市委平安办',
          bszt: '发布',
          bslb: '2020-10-19 16:00:23'
        },
        {
          sqr:
            '关于印发《2020年度县区（开发区、管理局）平安建设（综治工作）考核评价内容》的通知',
          ssqy: '市委平安办',
          bszt: '发布',
          bslb: '2020-10-19 15:57:16'
        }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 2
      },
      searchValue: '',
      advancedSearchShow: false,
      advancedForm: {}
    }
  },
  mounted() {},
  methods: {
    getList() {},
    resetSearchForm() {
      this.advancedForm = this.$options.data().advancedForm
      this.getList()
    },
    searchAdvance() {},
    del() {},
    handleSelectionChange() {}
  }
}
</script>

<style lang="scss" scoped></style>

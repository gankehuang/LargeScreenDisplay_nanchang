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
        <el-button type="primary" icon="el-icon-plus">所属单位</el-button>
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
        <el-form-item label="单位字头名">
          <el-input clearable class="search-input" />
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
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="所属单位" prop="sqr" width="400" />
      <el-table-column label="单位字头号" prop="ssqy" />
      <el-table-column label="操作" width="350" fixed="right">
        <template>
          <td-btn content="新增" icon="el-icon-plus" />
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
          sqr: '南昌市',
          ssqy: 'test'
        },
        {
          sqr: '东湖区综治中心',
          ssqy: '南昌市东湖区综治中心'
        }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 2
      },
      searchValue: '',
      advancedSearchShow: false,
      advancedForm: {
        name: '南昌市'
      }
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

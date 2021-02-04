<template>
  <div
    v-loading="isLoading"
    class="page"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <div class="search-bar">
      <div class="left">
        <el-button
          type="primary"
          icon="el-icon-plus"
        >
          录入信息
        </el-button>
      </div>
      <div class="right">
        <el-input
          v-model="advancedForm.name"
          placeholder="标题"
          clearable
          class="search-input"
        />
        <el-button type="primary">
          查询
        </el-button>
        <el-button
          plain
          @click="advancedSearchShow = true"
        >
          高级搜索
        </el-button>
      </div>
    </div>

    <search-advance v-show="advancedSearchShow">
      <el-form
        ref="advancedForm"
        :model="advancedForm"
        label-width="140px"
      >
        <el-form-item label="公文标题">
          <el-input
            clearable
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="公文编号">
          <el-input
            clearable
            class="search-input"
          />
        </el-form-item>

        <el-form-item class="buttons">
          <el-button
            type="primary"
            @click="searchAdvance"
          >
            查询
          </el-button>
          <el-button
            type="primary"
            @click="resetSearchForm"
          >
            重置
          </el-button>
          <el-button
            plain
            @click="advancedSearchShow = false"
          >
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </search-advance>

    <div class="control-bar">
      <el-button
        plain
        icon="el-icon-delete"
        :disabled="!selection.length"
        @click="del(selection)"
      >
        批量删除
      </el-button>
    </div>

    <el-table
      v-loading="false"
      :data="tableData"
      current-row-key="id"
      height="100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        fixed="left"
      />
      <el-table-column
        label="公文标题"
        prop="sqr"
        width="400"
      />
      <el-table-column
        label="公文编号"
        prop="ssqy"
      />
      <el-table-column
        label="发文部门"
        prop="bszt"
      />
      <el-table-column
        label="发文时间"
        prop="bslb"
      />
      <el-table-column
        label="公文类型"
        prop="jssj"
      />
      <el-table-column
        label="紧急通知"
        prop="cjr"
      />
      <el-table-column
        label="公文状态"
        prop="zt"
      />
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
  data () {
    return {
      isLoading: false,
      selection: [],
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchValue: '',
      advancedSearchShow: false,
      advancedForm: {}
    }
  },
  mounted () {},
  methods: {
    getList () {},
    resetSearchForm () {
      this.advancedForm = this.$options.data().advancedForm
      this.getList()
    },
    searchAdvance () {},
    del () {},
    handleSelectionChange () {}
  }
}
</script>

<style lang="scss" scoped></style>

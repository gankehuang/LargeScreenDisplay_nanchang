<template>
  <Dialog
    v-if="info"
    v-loading="isLoading"
    :is-need-head="false"
    width="60%"
    top="10vh"
    :visible.sync="dialogVisible"
    append-to-body
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
    destroy-on-close
    @open="openBefore"
  >
    <div class="content-border">
      <el-form
        class="search-form"
        :inline="true"
        :model="searchForm"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="searchForm.idCard"
            placeholder="请输入身份证号"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="getList"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-if="info.type === '融入'"
        v-loading="isLoading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba( 0, 0, 0, 0.7)"
        :data="tableData"
        height="80%"
        stripe
      >
        <template slot="empty">
          <p>{{ emptyText }}</p>
        </template>
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          label="姓名"
          prop="name"
        >
          <template slot-scope="scope">
            {{ scope.row.name | hideName }}
          </template>
        </el-table-column>
        <el-table-column
          label="身份证号"
          prop="idCard"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.idCard | hideIdCard }}
          </template>
        </el-table-column>
        <el-table-column
          label="手机号码"
          prop="mobilePhone"
        >
          <template slot-scope="scope">
            {{ scope.row.mobilePhone | hidePhone }}
          </template>
        </el-table-column>
        <!--      <el-table-column label="负责的网格" prop="gridName" />-->
        <!--      <el-table-column label="单位" prop="unit" />-->
        <!--      <el-table-column label="工作内容">-->
        <!--        <template slot-scope="scope">-->
        <!--          <div class="text-overflow" :title="scope.row.content">-->
        <!--            {{ scope.row.content }}-->
        <!--          </div>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
      </el-table>

      <el-table
        v-if="info.type === '人口' || info.type === '特殊人口'"
        :data="tableData"
        height="80%"
        stripe
      >
        <template slot="empty">
          <p>{{ emptyText }}</p>
        </template>
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          label="姓名"
          prop="name"
        >
          <template slot-scope="scope">
            {{ scope.row.name | hideName }}
          </template>
        </el-table-column>
        <el-table-column
          label="身份证号"
          prop="idCard"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.idCard | hideIdCard }}
          </template>
        </el-table-column>
        <el-table-column
          label="所属区域"
          prop="area"
        />
        <el-table-column
          label="性别"
          prop="gender"
        />
        <el-table-column
          label="手机号码"
          prop="mobilePhone"
        >
          <template slot-scope="scope">
            {{ scope.row.mobilePhone | hidePhone }}
          </template>
        </el-table-column>
        <el-table-column
          label="户籍地"
          prop="residence"
        />
      </el-table>

      <Pagination
        :page-size.sync="pagination.pageSize"
        :page-num.sync="pagination.pageNum"
        :total.sync="pagination.total"
        @pagination-change="getList"
      />
    </div>
  </Dialog>
</template>

<script>
import {
  queryGridFusePerson,
  querySpecialPopulation,
  queryPopulation
} from '@/api/smartData/gridView'
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dialogVisible: false,
      searchForm: {
        name: '',
        idCard: ''
      },
      isLoading: false,
      tableData: [],
      emptyText: '',
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  methods: {
    openBefore () {
      this.getList()
    },
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    },
    getList () {
      this.isLoading = true
      if (this.info.type === '融入') {
        queryGridFusePerson(this.pagination.pageNum, this.pagination.pageSize, {
          type: this.info.itemCode,
          gridCode: this.info.gridCode,
          name: this.searchForm.name,
          idCard: this.searchForm.idCard
        }).then((res) => {
          this._handleData(res)
        })
      } else if (this.info.type === '人口') {
        queryPopulation(this.pagination.pageNum, this.pagination.pageSize, {
          type: this.info.itemCode,
          gridCode: this.info.gridCode,
          name: this.searchForm.name,
          idCard: this.searchForm.idCard
        }).then((res) => {
          this._handleData(res)
        })
      } else if (this.info.type === '特殊人口') {
        querySpecialPopulation(
          this.pagination.pageNum,
          this.pagination.pageSize,
          {
            type: this.info.itemCode,
            gridCode: this.info.gridCode,
            name: this.searchForm.name,
            idCard: this.searchForm.idCard
          }
        ).then((res) => {
          this._handleData(res)
        })
      }
    },
    _handleData (res) {
      this.isLoading = false
      const { status, data } = res
      if (status === 200) {
        this.tableData = data.list
        this.pagination.total = data.total
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/importantTable.scss';
.content-border {
  position: relative;
  height: 700px;
  padding: 20px;
}
</style>

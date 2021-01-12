<template>
  <div
    v-if="visible"
    class="mask-container"
  >
    <div class="mask"></div>
    <div
      class="table-modal"
      v-loading="isLoading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba( 0, 0, 0, 0.7)"
    >
      <div
        class="table-modal-close"
        @click="closeModal"
      ></div>
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
            >查询</el-button>
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
          ></el-table-column>
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
          > </el-table-column>
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
    </div>
  </div>
</template>

<script>
import {
  queryGridFusePerson,
  querySpecialPopulation,
  queryPopulation
} from '@/api/smartData/gridView'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
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
  watch: {
    visible(val) {
      if (val) {
        this.getList()
      }
    }
  },
  methods: {
    getList() {
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
    _handleData(res) {
      this.isLoading = false
      const { status, data } = res
      if (status === 200) {
        this.tableData = data.list
        this.pagination.total = data.total
      }
    },
    closeModal() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/importantTable.scss';
.table-modal {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1350px;
  height: 828px;
  background: url('~@/assets/image/gridNumber/组 9.png') center center / 100%
    100% no-repeat;
  border-radius: 8px;
  .content-border {
    position: relative;
    width: 1257px;
    height: 700px;
    margin: 66px 46px 36px;
    border: 1px solid #0e4f90;
    border-radius: 10px;
    padding: 20px;
  }
  .table-modal-close {
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    z-index: 200;
    top: 20px;
    right: 20px;
    background: url('~@/assets/image/gridNumber/table-modal-close.png')
      no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>

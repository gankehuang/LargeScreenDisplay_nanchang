<template>
  <Dialog
    width="60%"
    top="10vh"
    :is-need-head="false"
    :visible.sync="dialogVisible"
    append-to-body
    @open="openBefore"
  >
    <div class="content-border">
      <el-table
        v-loading="isLoading"
        :data="tableData"
        height="90%"
        stripe
        style="width:95%; margin: 1% auto 0;background-color: transparent;"
      >
        <template slot="empty">
          <p>{{ emptyText }}</p>
        </template>
        <el-table-column
          label="姓名"
          prop="xm"
        />
        <el-table-column
          label="性别"
          prop="xb"
        />
        <el-table-column
          label="年龄"
          prop="nl"
        />
        <el-table-column
          label="身份证"
          prop="sfz"
          width="150"
        />
        <el-table-column
          label="现居地"
          prop="xjd"
          width="200"
        />
        <el-table-column
          label="低保人员"
          width="100"
          prop="dbry"
        />
        <el-table-column
          label="婚姻状况"
          width="100"
          prop="hyzk"
        />
        <el-table-column
          label="信访人员"
          width="100"
          prop="xfry"
        />
        <el-table-column
          label="失业人员"
          width="100"
          prop="syry"
        />
        <el-table-column
          label="矛盾纠纷当事人"
          prop="mdjf"
          width="120"
        />
        <el-table-column
          label="失信被执行人"
          prop="sx"
          width="120"
        />
        <el-table-column
          label="风险等级"
          prop="fxdj"
        />
        <el-table-column
          label="备注"
          width="100px"
          prop="bz"
        />
        <el-table-column
          label="操作"
          prop="edit"
          width="100"
        >
          <template>
            <el-button
              size="mini"
              @click="showConverModal"
            >
              传达县区
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        style="margin-right: 40px"
        :page-size.sync="pageSize"
        :page-num.sync="pageNum"
        :total.sync="total"
        @pagination-change="getList"
      />
    </div>

    <ConveyModal ref="conveyModal" />
  </Dialog>
</template>

<script>

import { getBuildingList } from '@/api/riskPrevention/importPeople'
import ConveyModal from './ConveyModal'

export default {
  components: {
    ConveyModal
  },
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      dialogVisible: false,
      searchForm: {
        gridName: ''
      },
      isLoading: false,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 10,
      emptyText: ''
    }
  },
  methods: {
    openBefore () {
      this.tableData = [
        {
          xm: '吴*杰',
          xb: '男',
          nl: '36',
          sfz: '360****9710',
          xjd: '某市*****村五组（公路边）',
          dbry: '√',
          fxdj: '★',
          bz: '数据已更新'
        },
        {
          xm: '熊*忠',
          xb: '男',
          nl: '45',
          sfz: '360****9725',
          xjd: '某市*****21栋2单元506号',
          hyzk: '√',
          fxdj: '★',
          bz: '未变化'
        },
        {
          xm: '杜*娇',
          xb: '女',
          nl: '41',
          sfz: '360****9760',
          xjd: '某市*****21栋2单元506号',
          xfr: '√',
          fxdj: '★',
          bz: '数据已更新'
        },
        {
          xm: '王*国',
          xb: '男',
          nl: '51',
          sfz: '360****9710',
          xjd: '某市*****4栋1单元162号',
          mdjf: '√',
          syry: '√',
          fxdj: '★★',
          bz: '人员排除'
        },
        {
          xm: '周*英',
          xb: '男',
          nl: '51',
          sfz: '360****9821',
          xjd: '某市*****家园二期2A-1-501B',
          mdjf: '√',
          sx: '√',
          fxdj: '★★',
          bz: '未变化'
        },
        {
          xm: '梁*明',
          xb: '男',
          nl: '55',
          sfz: '360****9750',
          xjd: '某市*****家园二期2A-1-501B',
          mdjf: '√',
          xfr: '√',
          sx: '√',
          fxdj: '★★★',
          bz: '未变化'
        },
        {
          xm: '王*宝',
          xb: '男',
          nl: '52',
          sfz: '360****9720',
          xjd: '某市*****家园二期8-4-307',
          mdjf: '√',
          fxdj: '★',
          bz: '人员排除'
        },
        {
          xm: '周*花',
          xb: '女',
          nl: '47',
          sfz: '360****9670',
          xjd: '某市赤*****佳苑15栋3单元306号',
          mdjf: '√',
          fxdj: '★',
          bz: '数据已更新'
        },
        {
          xm: '何*实',
          xb: '男',
          nl: '41',
          sfz: '360****9690',
          xjd: '某市*****华庭小区6栋1单元1102号',
          dbry: '√',
          fxdj: '★',
          bz: '数据已更新'
        }
      ]
    },
    async getList () {
      this.isLoading = true
      const { status, data } = await getBuildingList(
        this.pageNum,
        this.pageSize,
        {
          regionCode: this.info.code
        }
      )
      if (status === 200) {
        this.isLoading = false
        this.tableData = data.list
        if (this.tableData.length === 0) {
          this.emptyText = '暂无数据'
        } else {
          this.emptyText = ''
        }
        this.total = data.total
      }
    },
    // 打开弹框
    openModal () {
      this.dialogVisible = true
    },
    // 关闭弹框
    closeModal () {
      this.dialogVisible = false
    },
    showConverModal () {
      this.$refs.conveyModal.openModal()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow: auto;
}
</style>

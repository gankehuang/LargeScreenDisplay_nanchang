<template>
  <div
    class="form-page"
    v-loading="isLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <div class="search-bar">
      <div class="left">
        <!-- <el-button
          type="primary"
          icon="el-icon-plus"
        >录入信息</el-button> -->
        <el-button
          plain
          icon="el-icon-delete"
          :disabled="!selection.length"
          @click="del(selection)"
          >批量删除</el-button
        >
      </div>
      <div class="right">
        <el-input
          v-model="advancedForm.superviseContent"
          placeholder="督导内容"
          clearable
          class="search-input"
        />
        <el-button type="primary" @click="searchForm">查询</el-button>
        <el-button plain @click="advancedSearchShow = true">高级搜索</el-button>
      </div>
    </div>

    <search-advance v-show="advancedSearchShow">
      <el-form ref="advancedForm" :model="advancedForm" label-width="140px">
        <el-form-item label="县区">
          <el-select
            v-model="advancedForm.superviseRegion"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in gridCodeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件状态">
          <el-select
            v-model="advancedForm.status"
            placeholder="请选择"
            clearable
          >
            <el-option label="未受理" value="1"></el-option>
            <el-option label="已派发" value="2"></el-option>
            <el-option label="已处置" value="3"></el-option>
            <el-option label="超时" value="4"></el-option>
            <el-option label="催单" value="5"></el-option>
            <el-option label="已归档" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="督导时间">
          <el-date-picker
            v-model="dataList"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" @click="searchAdvance">查询</el-button>
          <el-button type="primary" @click="resetSearchForm">重置</el-button>
          <el-button plain @click="advancedSearchShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </search-advance>

    <div class="control-bar"></div>

    <el-table
      v-loading="false"
      :data="tableData"
      stripe
      current-row-key="id"
      height="100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed="left" />
      <el-table-column label="事件名称" prop="eventName" />
      <el-table-column label="督导县区" prop="superviseRegion" />
      <el-table-column label="督导指标名称" prop="indicatorName" width="120" />
      <el-table-column label="督导内容" prop="superviseContent" width="680" />
      <el-table-column label="督导时间" prop="createTime" width="160" />
      <el-table-column label="督导时指标" prop="originIndex" />
      <el-table-column label="现在指标" prop="originIndex" />
      <el-table-column label="整改情况" prop="processingDesc">
        <template slot-scope="scope">
          {{ scope.row.processingDesc ? scope.row.processingDesc : "--" }}
        </template>
      </el-table-column>
      <el-table-column label="事件状态" prop="statusText" />
      <el-table-column label="评价">
        <template>
          无内容
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <td-btn
            content="指派"
            v-if="scope.row.status === '1' || scope.row.status === '4'"
            icon="el-icon-bicycle"
            @click="handleEvent(scope.row, '指派')"
          />
          <td-btn
            content="处置"
            v-if="scope.row.status !== '3' && scope.row.status !== '6'"
            icon="el-icon-wind-power"
            @click="handleEvent(scope.row, '处置')"
          />
          <td-btn
            v-if="scope.row.status === '3'"
            content="核查"
            icon="el-icon-date"
            @click="handleEvent(scope.row, '核查')"
          />
          <td-btn
            content="删除"
            icon="el-icon-delete"
            @click="del([scope.row.id])"
          />
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :page-size.sync="pagination.pageSize"
      :page-num.sync="pagination.pageNum"
      :total.sync="pagination.total"
      @pagination-change="getList"
    />

    <!--事件详情弹框-->
    <EventModal
      v-if="modal === 'event'"
      :info="eventInfo"
      @onEventModal="onEventModal"
      @bindBtnClose="modal = ''"
    />

    <!--事件指派或上报弹框-->
    <EventCirculationModal
      v-if="modal === 'report'"
      :modal-title="dealModalTitle"
      :event-id="needEventId"
      @onDealModal="onDealModal"
      @bindBtnClose="modal = ''"
    />

    <!--事件处置弹框-->
    <EventHandleModal
      v-if="modal === 'deal'"
      :event-id="needEventId"
      @onShowToast="onShowToast"
      @closeModal="modal = ''"
    />

    <!--核查弹框-->
    <CheckModal
      v-if="modal === 'check'"
      :event-id="needEventId"
      :processingDesc="processingDesc"
      :processingTime="processingTime"
      @onShowToast="onCheckModal"
      @closeModal="modal = ''"
    />

    <!--事件具体详情弹框-->
    <EventDetailModal
      :visible.sync="eventDetailModal.visible"
      :info="eventDetailModal.info"
      @update:visible="modal = ''"
    />
  </div>
</template>

<script>
import { queryEventList } from '@/api/intelligentService/regionSupervision'
import { deleteEvent } from '@/api/intelligentService/earlyWarningDisposal'
import { eventReminder } from '@/api/intelligentService/earlyWarningDisposal'
import eventMixin from '../../evenModule/eventMixin'
export default {
  mixins: [eventMixin],
  data() {
    return {
      dataList: [],
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
      advancedForm: {
        superviseContent: '',
        superviseRegion: '',
        status: null,
        startTime: '',
        endTime: '',
        eventCodeList: 'supervise'
      },
      gridCodeList: [
        { value: '安义县', name: '安义县' },
        { value: '经开区', name: '经开区' },
        { value: '青云谱区', name: '青云谱区' },
        { value: '南昌县', name: '南昌县' },
        { value: '东湖区', name: '东湖区' },
        { value: '湾里局', name: '湾里局' },
        { value: '红谷滩区', name: '红谷滩区' },
        { value: '西湖区', name: '西湖区' },
        { value: '进贤县', name: '进贤县' },
        { value: '新建区', name: '新建区' },
        { value: '高新区', name: '高新区' },
        { value: '青山湖区', name: '青山湖区' }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 查询
    searchForm() {
      this.getList()
    },
    async getList() {
      try {
        if (this.dataList && this.dataList.length > 0) {
          this.advancedForm.startTime = this.dataList[0] + ' 00:00:00'
          this.advancedForm.endTime = this.dataList[1] + ' 23:59:59'
        } else {
          this.advancedForm.startTime = ''
          this.advancedForm.endTime = ''
        }
        const { status, data } = await queryEventList(
          this.pagination.pageNum,
          this.pagination.pageSize,
          this.advancedForm
        )
        if (status === 200) {
          this.tableData = data.list
          this.pagination.total = data.total
        }
      } catch (error) {}
      this.$emit('mapInit', this.pagination.total)
    },
    resetSearchForm() {
      this.dataList = []
      this.advancedForm = this.$options.data().advancedForm
      this.getList()
    },
    searchAdvance() {
      this.getList()
      this.advancedSearchShow = false
    },
    handleSelectionChange(val) {
      this.selection = []
      val.forEach(element => {
        this.selection.push(element.id)
      })
    },
    handleEvent(curRow, type) {
      switch (type) {
        case '上报':
          this.modal = 'report'
          this.dealModalTitle = '事件上报'
          this.needEventId = curRow.resourceId
          break
        case '指派':
          this.modal = 'report'
          this.dealModalTitle = '事件指派'
          this.needEventId = curRow.id
          break
        case '处置':
          this.modal = 'deal'
          this.needEventId = curRow.id
          break
        case '核查':
          this.modal = 'check'
          this.processingDesc = curRow.processingDesc
          this.processingTime = curRow.processingTime
          this.needEventId = curRow.id
          break
        case '详情':
          this.modal = ''
          this.eventDetailModal.visible = true
          this.eventDetailModal.info = {
            id: curRow.id
          }
          break
        case '催单':
          eventReminder({
            eventId: curRow.id
          }).then(res => {
            const { status } = res
            if (status === 200) {
              this.$message.success('催单成功！')
            }
          })
          break
      }
    },
    del(arr) {
      this.$confirm('删除该事件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteEvent(arr).then(res => {
            const { status } = res
            if (status === 200) {
              this.$message.success('删除成功！')
              this.getList()
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/form.scss";
.form-container {
  width: 500px;
  position: fixed;
  top: 490px !important;
  right: 20px;
  background-color: #304156;
  opacity: 0.9;
  padding: 24px;
  z-index: 2000;
  /deep/ .el-range-input {
    background-color: transparent !important;
    color: #fff;
  }
  /deep/.el-range-separator {
    color: #fff;
  }
}
</style>

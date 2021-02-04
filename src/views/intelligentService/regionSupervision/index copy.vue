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
          placeholder="事件名称"
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
        <el-form-item label="县区">
          <el-input
            clearable
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="指标名称">
          <el-input
            clearable
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="是否超时">
          <el-switch />
        </el-form-item>
        <el-form-item label="是否整改">
          <el-switch />
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
        label="督导县区"
        prop="superviseRegion"
      />
      <el-table-column
        label="督导指标名称"
        prop="总分"
        width="160"
      />
      <el-table-column
        label="督导内容"
        prop="superviseContent"
        width="180"
      />
      <el-table-column
        label="督导时间"
        prop="createTime"
        width="160"
      />
      <el-table-column
        label="是否超时"
        prop="bsnr"
      />
      <el-table-column
        label="是否整改"
        prop="sqsj"
      />
      <el-table-column
        label="督导时指标"
        prop="isRectify"
      />
      <el-table-column
        label="现在指标"
        prop="curIndex"
      />
      <el-table-column label="整改情况" />
      <el-table-column label="评价" />
      <el-table-column
        label="操作"
        width="350"
        fixed="right"
      >
        <template slot-scope="scope">
          <td-btn
            v-if="scope.row.status !== '3' && scope.row.status !== '6'"
            content="上报"
            icon="el-icon-s-promotion"
            @click="handleEvent(scope.row, '上报')"
          />
          <td-btn
            v-if="scope.row.status === '1'"
            content="指派"
            icon="el-icon-bicycle"
            @click="handleEvent(scope.row, '指派')"
          />
          <td-btn
            v-if="scope.row.status !== '6' && scope.row.status !== '3'"
            content="催单"
            icon="el-icon-alarm-clock"
            @click="handleEvent(scope.row, '催单')"
          />
          <td-btn
            v-if="scope.row.status !== '3' && scope.row.status !== '6'"
            content="处置"
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
            content="详情"
            icon="el-icon-view"
            @click="handleEvent(scope.row, '详情')"
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
      :processing-desc="processingDesc"
      :processing-time="processingTime"
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
import { eventReminder } from '@/api/intelligentService/earlyWarningDisposal'
import eventMixin from '../evenModule/eventMixin'
export default {
  mixins: [eventMixin],
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
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const { status, data } = await queryEventList(
          this.pagination.pageNum,
          this.pagination.pageSize,
          { eventCodeList: 'supervise' }
        )
        if (status === 200) {
          this.tableData = data.list
          this.pagination.total = data.total
        }
      } catch (error) {}
    },
    resetSearchForm () {
      this.advancedForm = this.$options.data().advancedForm
      this.getList()
    },
    searchAdvance () {},
    del () {},
    handleSelectionChange () {},
    handleEvent (curRow, type) {
      switch (type) {
        case '上报':
          this.modal = 'report'
          this.dealModalTitle = '事件上报'
          this.needEventId = curRow.resourceId
          break
        case '指派':
          this.modal = 'report'
          this.dealModalTitle = '事件指派'
          this.needEventId = curRow.resourceId
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
          }).then((res) => {
            const { status } = res
            if (status === 200) {
              this.$message.success('催单成功！')
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

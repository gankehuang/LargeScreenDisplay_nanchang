<template>
  <div
    v-loading="isLoading"
    class="form-page"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <div class="searchType">
      <div
        v-for="(item, index) in typeList"
        :key="index"
        :class="['searchTypeList', { isactive: index === tab }]"
        @click="searchTypes(index, item.value)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="search-bar">
      <div class="left">
        <el-button
          plain
          icon="el-icon-delete"
          :disabled="!selection.length"
          @click="del(selection)"
        >
          批量删除
        </el-button>
      </div>
      <div class="right">
        <el-input
          v-model="advancedForm.eventName"
          placeholder="事件名称"
          clearable
          class="search-input"
        />
        <!-- <el-select style="margin-left:20px;" v-model="advancedForm.type" placeholder="请选择分类">
          <el-option
            label="政治安全"
            value="1">
          </el-option>
          <el-option
            label="社会治安"
            value="2">
          </el-option>
          <el-option
            label="矛盾纠纷"
            value="3">
          </el-option>
          <el-option
            label="公共安全"
            value="4">
          </el-option>
          <el-option
            label="网络安全"
            value="5">
          </el-option>
        </el-select> -->
        <el-button
          type="primary"
          @click="getList"
        >
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
        <el-form-item label="事件名称">
          <el-input
            v-model="advancedForm.eventName"
            clearable
            class="search-input"
          />
        </el-form-item>

        <el-form-item label="事件状态">
          <el-select
            v-model="advancedForm.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="未受理"
              value="1"
            />
            <el-option
              label="已派发"
              value="2"
            />
            <el-option
              label="已处置"
              value="3"
            />
            <el-option
              label="超时"
              value="4"
            />
            <el-option
              label="催单"
              value="5"
            />
            <el-option
              label="已归档"
              value="6"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件等级">
          <el-select
            v-model="advancedForm.emergencyLevel"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="一级"
              value="1"
            />
            <el-option
              label="二级"
              value="2"
            />
            <el-option
              label="三级"
              value="3"
            />
            <el-option
              label="四级"
              value="4"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件来源">
          <el-select
            v-model="advancedForm.source"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="督办协办"
              value="SUPERVISORY_CO_ORGANIZER"
            />
            <el-option
              label="群众上报"
              value="MASS_REPORT"
            />
            <el-option
              label="主动发现"
              value="ACTIVE_DISCOVERY"
            />
            <el-option
              label="设备感知"
              value="DEVICE_AWARENESS"
            />
            <el-option
              label="县区上报"
              value="DISTRICT_REPORT"
            />
            <el-option
              label="其他"
              value="OTHERS"
            />
          </el-select>
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

    <el-table
      :data="tableData"
      current-row-key="id"
      height="100%"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        fixed="left"
      />
      <el-table-column
        label="事件名称"
        prop="eventName"
      />
      <el-table-column
        label="事件类型"
        prop="typeText"
      />
      <el-table-column
        label="事件来源"
        prop="sourceText"
      />
      <el-table-column
        label="发生时间"
        prop="happenedTime"
        width="180"
      />
      <el-table-column
        label="事件地点"
        prop="location"
      />
      <el-table-column
        label="事件等级"
        prop="emergencyLevelText"
      />
      <el-table-column
        label="事件图片"
        prop="snapImageUrl"
      >
        <template slot-scope="scope">
          <!--          <el-image-->
          <!--            v-if="scope.row.snapImageUrl || scope.row.snapBakUrl"-->
          <!--            style="width:100px;height:100px;"-->
          <!--            :src="scope.row.snapImageUrl"-->
          <!--            :preview-src-list="[-->
          <!--              scope.row.snapBakUrl-->
          <!--                ? scope.row.snapBakUrl-->
          <!--                : scope.row.snapImageUrl-->
          <!--            ]"-->
          <!--          />-->
          <el-image
            v-if="scope.row.eventCode === '62053' && scope.row.snapImageUrl || scope.row.snapBakUrl"
            style="width:100px;height:100px;"
            :src="scope.row.snapImageUrl"
            :preview-src-list="[
              scope.row.snapBakUrl
                ? scope.row.snapBakUrl
                : scope.row.snapImageUrl
            ]"
          />
          <CustomImage
            v-else
            style="width:100px;height:100px;"
            :src="scope.row.snapImageUrl"
            :preview-src-list="[
              scope.row.snapBakUrl
                ? scope.row.snapBakUrl
                : scope.row.snapImageUrl
            ]"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="事件状态"
        prop="statusText"
      />
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
            v-if="scope.row.status === '1' || scope.row.status === '4'"
            content="指派"
            icon="el-icon-bicycle"
            @click="handleEvent(scope.row, '指派')"
          />
          <td-btn
            v-if="
              scope.row.status !== '6' &&
                scope.row.status !== '3' &&
                scope.row.status !== '1'
            "
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
      :grid-code="gridCode"
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
import {
  queryEventList,
  deleteEvent,
  eventReminder
} from '@/api/intelligentService/earlyWarningDisposal'
import eventMixin from '../../evenModule/eventMixin'
export default {
  mixins: [eventMixin],
  data () {
    return {
      tab: 0,
      isLoading: false,
      selection: [],
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      gridCode: '',
      searchValue: '',
      advancedSearchShow: false,
      advancedForm: {
        eventName: '',
        type: '',
        status: '',
        emergencyLevel: '',
        excludeEventCodeList: 'supervise',
        source: ''
      },
      typeList: [
        {
          label: '所有预警',
          value: ''
        },
        {
          label: '政治安全',
          value: '1'
        },
        {
          label: '社会治安',
          value: '2'
        },
        {
          label: '矛盾纠纷',
          value: '3'
        },
        {
          label: '公共安全',
          value: '4'
        },
        {
          label: '网络安全',
          value: '5'
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.isLoading = true
      queryEventList(
        this.pagination.pageNum,
        this.pagination.pageSize,
        this.advancedForm
      )
        .then(res => {
          this.isLoading = false
          const { status, data } = res
          if (status === 200) {
            this.tableData = data.list
            this.pagination.total = data.total
            this.$emit('busData', res.data)
          }
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    searchTypes (index, value) {
      this.tab = index
      this.advancedForm.type = value
      this.getList()
    },
    resetSearchForm () {
      this.advancedForm = this.$options.data().advancedForm
      this.getList()
    },
    handleSelectionChange (val) {
      this.selection = []
      val.forEach(element => {
        this.selection.push(element.id)
      })
    },
    searchAdvance () {
      this.getList()
      this.advancedSearchShow = false
    },
    handleEvent (curRow, type) {
      switch (type) {
        case '上报':
          this.modal = 'report'
          this.dealModalTitle = '事件上报'
          this.needEventId = curRow.id
          break
        case '指派':
          this.modal = 'report'
          this.dealModalTitle = '事件指派'
          this.needEventId = curRow.id
          this.gridCode = curRow.gridCode
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
    del (arr) {
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
@import '~@/styles/form.scss';
.form-container {
  top: 490px !important;
}
</style>

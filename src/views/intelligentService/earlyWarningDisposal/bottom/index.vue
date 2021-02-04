<!-- 底部列表入口组件 -->
<template>
  <TableListBox>
    <template v-slot:title-left>
      <TitleTab
        :type-list="typeList"
        :back-value="getTypeValue"
        :del="del"
        :selection="selection"
      />
    </template>
    <template v-slot:title-right>
      <TitleSearch
        :search="getSearchValue"
      />
    </template>
    <template>
      <ListContent
        :loading="isLoading"
        :table-data="tableData"
        :pagination="pagination"
        :pagination-change="getPagination"
        :del="del"
        :get-selection="getSelection"
        :get-event="handleEvent"
      />
    </template>
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
  </TableListBox>
</template>
<script>

import TitleTab from './titleTab'
import TitleSearch from './titleSearch'
import ListContent from './listContent'

import {
  queryEventList,
  deleteEvent,
  eventReminder
} from '@/api/intelligentService/earlyWarningDisposal'
import eventMixin from '../../evenModule/eventMixin'

export default {
  components: {
    TitleTab,
    TitleSearch,
    ListContent
  },
  mixins: [eventMixin],
  props: {
  },
  data () {
    return {
      isLoading: false,
      tableData: [],
      selection: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
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
  mounted () {
  },
  methods: {
    // 得到 titleTab 返回的值
    getTypeValue (typeCode) {
      this.isLoading = true
      this.advancedForm.type = typeCode
      this.getList()
    },
    // 查询按钮的查询方法
    getSearchValue (e) {
      this.isLoading = true
      this.advancedForm = e
      this.pagination = {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
      this.getList()
    },
    // 接口调用方法
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
    // 删除的方法
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
    },
    // 得到 contentList 返回的页码数据
    getPagination (pageNum, pageSize) {
      this.pagination.pageNum = pageNum
      this.pagination.pageSize = pageSize !== null ? pageSize : 10
      this.getList()
    },
    // 得到选中需要删除的列表
    getSelection (e) {
      this.selection = e
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
    }
  }

}
</script>
<style lang='scss' scoped>
@import '~@/styles/form.scss';
</style>

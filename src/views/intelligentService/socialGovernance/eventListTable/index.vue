<!-- 事件列表的入口组件 -->

<template>
  <div
    v-loading="isLoading"
    class="form-page"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
    <SearchModal
      :back-value="getSearchValue"
      :page-name="pageName"
    />
    <ContentList
      :table-data="contentList"
      :pagination="pagination"
      :back-value="getPagination"
      :item-back="getItem"
    />
    <EventDetailsModal
      :visible.sync="eventDetailsModal.visible"
      :info="eventDetailsModal.info"
    />
  </div>
</template>
<script>

/**
* @param pageName type: String
*/

import { queryGovernEvent } from '@/api/intelligentService/socialGovernance'
import EventDetailsModal from './eventDetailsModal'
import SearchModal from './searchModal'
import ContentList from './contentList'

export default {
  components: {
    SearchModal,
    ContentList,
    EventDetailsModal
  },
  props: {
    pageName: String
  },
  data () {
    return {
      isLoading: false,
      contentList: [],
      pagination: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      },
      advancedForm: {
        effectScope: '',
        eventName: '',
        eventType: [],
        gridCode: [],
        status: '00,01,02,03,04',
        bizPlatform: [],
        happenStartTime: '',
        happenEndTime: '',
        timeStep: ''
      },
      eventDetailsModal: {
        visible: false,
        info: null
      }
    }
  },
  created () {
    switch (this.pageName) {
      case '待办事件':
        this.advancedForm.status = '00,01,02'
        break
      case '南昌社会治理APP':
        this.advancedForm.bizPlatform = ['202001']
        break
      case '平安志愿者APP':
        this.advancedForm.bizPlatform = ['202002']
        break
      case '创文明城市系统数':
        this.advancedForm.bizPlatform = ['3601003']
        break
      case '网格员':
        this.advancedForm.bizPlatform = [
          '0',
          '3601020',
          '3601008',
          '3601015',
          '3601012'
        ]
        break
    }
    this.fetchEventList()
  },
  methods: {
    fetchEventList () {
      const postData = {
        ...this.advancedForm
      }

      if (this.pageName === '待办事件' || this.pageName === '事件总数') {
        delete postData.bizPlatform
      }

      if (this.advancedForm.eventType.length) {
        postData.eventType = this.advancedForm.eventType[
          this.advancedForm.eventType.length - 1
        ]
      } else {
        postData.eventType = ''
      }

      if (this.advancedForm.gridCode.length) {
        postData.gridCode = this.advancedForm.gridCode[
          this.advancedForm.gridCode.length - 1
        ]
      } else {
        postData.gridCode = ''
      }

      postData.happenEndTime = this.advancedForm.timeStep !== '' ? this.advancedForm.timeStep[1] : ''
      postData.happenStartTime = this.advancedForm.timeStep !== '' ? this.advancedForm.timeStep[0] : ''

      postData.status =
        this.advancedForm.status !== ''
          ? this.advancedForm.status.split(',')
          : []

      this.isLoading = true
      queryGovernEvent(
        this.pagination.pageNum,
        this.pagination.pageSize,
        postData
      ).then(res => {
        this.isLoading = false
        const { status, data } = res
        if (status === 200) {
          this.contentList = data.list
          this.pagination.total = data.total
        }
      })
    },
    // 获取搜索组件返回的值
    getSearchValue (search, highSearch) {
      this.pagination.pageNum = 1
      if (search) {
        this.advancedForm.gridCode = [search[search.length - 1].code]
      }
      if (highSearch) {
        this.advancedForm = highSearch
      }
      this.fetchEventList()
    },
    // 获取列表组件页码的值
    getPagination (pageNum, pageSize) {
      this.pagination.pageNum = pageNum
      this.pagination.pageSize = pageSize !== null ? pageSize : 15
      this.fetchEventList()
    },
    getItem (e) {
      this.eventDetailsModal = e
    }
  }

}
</script>
<style lang='scss' scoped>
@import "~@/styles/form.scss";
.back-btn {
  color: #98caff;
  margin-left: 25px;
  cursor: pointer;
}

::v-deep .el-range-input {
  background: transparent;
  color: #fff;
}
::v-deep .el-range-separator {
  color: #fff;
}

::v-deep .form-container {
  top: 200px !important;
}
</style>

<!-- 高级搜索组件 -->

<template>
  <div>
    <search-advance v-show="visible">
      <el-form
        ref="advancedForm"
        :model="advancedForm"
        label-width="140px"
      >
        <el-form-item label="所属网格">
          <GridSelectBox
            :back-value="getPlaceValue"
            :input-value="inputValue"
          />
        </el-form-item>
        <el-form-item label="事件影响程度">
          <el-select
            v-model="advancedForm.effectScope"
            placeholder="请选择事件影响程度"
          >
            <el-option
              label="小"
              value="01"
            />
            <el-option
              label="中"
              value="02"
            />
            <el-option
              label="大"
              value="03"
            />
            <el-option
              label="重大"
              value="04"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件名称">
          <el-input
            v-model="advancedForm.eventName"
            placeholder="请输入事件名称"
          />
        </el-form-item>
        <el-form-item label="事件分类">
          <el-cascader
            v-model="advancedForm.eventType"
            placeholder="请选择事件分类"
            :options="eventCategoryList"
            :props="{
              label: 'dictLabel',
              value: 'dictValue'
            }"
          />
        </el-form-item>
        <el-form-item label="事发时间阶段">
          <el-date-picker
            v-model="advancedForm.timeStep"
            type="daterange"
            value-format="yyyy-MM-dd"
            placeholder="请选择事发时间阶段"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item
          v-if="pageName !== '待办事件'"
          label="事件状态"
        >
          <el-select
            v-model="advancedForm.status"
            placeholder="请选择事件状态"
          >
            <el-option
              label="不限"
              value="00,01,02,03,04"
            />
            <el-option
              label="受理"
              value="00"
            />
            <el-option
              label="处理中(上报)"
              value="01"
            />
            <el-option
              label="处理中(交办)"
              value="02"
            />
            <el-option
              label="结案"
              value="03,04"
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
            @click="closeBtn"
          >
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </search-advance>
  </div>
</template>
<script>

/**
 * @param pageName type: String
 * @param visible required: false, type: Boolean, default value: false, 控制组件是否显示
 * @param close required: false, type: Function, default value: () => {}, 关闭组件的回调
 * @param highSearch required: false, type: Function, default value: () => {}, 把 advancedForm 对象返回给父组件
 */

import { treeList } from '@/api/intelligentService/socialGovernance'

export default {
  components: {
  },
  props: {
    pageName: String,
    visible: {
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: () => {}
    },
    highSearch: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      placeValue: [],
      eventCategoryList: [],
      inputValue: '',
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
      }
    }
  },
  created () {
    this.fetchEventCategoryList()
  },
  methods: {
    getPlaceValue (e) {
      this.advancedForm.gridCode = e.map(item => item.code)
      this.inputValue = e.map(item => item.label).join('/')
    },
    // 把 advancedForm 对象返回给父组件
    searchAdvance () {
      if (this.highSearch) {
        this.highSearch(this.advancedForm)
      }
    },
    fetchEventCategoryList () {
      treeList({
        dictTypeCode: 'GOVERN_EVENT_TYPE'
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.eventCategoryList = data
        }
      })
    },
    // 重置form数据
    resetSearchForm () {
      this.advancedForm = this.$options.data().advancedForm
      this.inputValue = ''
    },
    closeBtn () {
      if (this.close) {
        this.close()
      }
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

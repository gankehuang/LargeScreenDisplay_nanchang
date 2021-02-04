<!-- 列表内容组件 -->
<template>
  <div
    v-loading="loading"
    class="form-page"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba( 0, 0, 0, 0.7)"
  >
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
          <!-- <el-image
            v-if="scope.row.snapImageUrl || scope.row.snapBakUrl"
            style="width:100px;height:100px;"
            :src="scope.row.snapImageUrl"
            :preview-src-list="[
              scope.row.snapBakUrl
                ? scope.row.snapBakUrl
                : scope.row.snapImageUrl
            ]"
          /> -->
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
            @click="delOne([scope.row.id])"
          />
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :page-size.sync="pagination.pageSize"
      :page-num.sync="pagination.pageNum"
      :total.sync="pagination.total"
      @pagination-change="change"
    />
  </div>
</template>
<script>

/**
 * @param loading required: false, type: Boolean, default value: true 控制列表是否正在加载
 * @param pagination required: true, type: Object, default value: () => {} 用于控制页码
 * @param tableDate required: true, type: Array, default value: () => [] 列表的数据
 * @param getSelection required: true, type: Function, default value: () => {} 用于把勾选中的项数据暴露给父组件
 * @param getEvent requried: true, type: Function, default value: () => {} 用于把选中的项暴露给父组件
 * @param paginationChange required: false, type: Function, default value: () => {} 用于把页码数据暴露给父组件
 * @param del required: true, false, type: Function, default value: () => {} 用于把要删除的项暴露给父组件
 */

export default {
  components: {
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      required: true,
      default: () => {}
    },
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    getSelection: {
      type: Function,
      required: true,
      default: () => {}
    },
    getEvent: {
      type: Function,
      required: true,
      default: () => {}
    },
    paginationChange: {
      type: Function,
      default: () => {}
    },
    del: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      selection: []
    }
  },
  methods: {
    // 处理选中数据列表
    handleSelectionChange (val) {
      this.selection = []
      val.forEach(element => {
        this.selection.push(element.id)
      })
      if (this.getSelection) {
        this.getSelection(this.selection)
      }
    },
    // 用于控制操作栏的方法
    handleEvent (item, action) {
      if (this.getEvent) {
        this.getEvent(item, action)
      }
    },
    // 删除一个的方法
    delOne (idList) {
      if (this.del) {
        this.del(idList)
      }
    },
    change (e) {
      if (this.paginationChange) {
        this.paginationChange(e.pageNum, e.pageSize)
      }
    }
  }

}
</script>
<style lang='scss' scoped>
</style>

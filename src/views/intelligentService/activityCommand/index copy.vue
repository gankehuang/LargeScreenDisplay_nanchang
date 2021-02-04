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
          placeholder="活动名称"
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
        <el-form-item label="活动名称">
          <el-input
            clearable
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
          />
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
        label="活动名称"
        prop="activityName"
      />
      <el-table-column
        label="活动时间"
        prop="activityTime"
      />
      <el-table-column
        label="活动地点"
        prop="venue"
      />
      <el-table-column
        label="活动规模"
        prop="activityScale"
      />
      <el-table-column
        label="涉及人数"
        prop="numberOfPeople"
      />
      <el-table-column
        label="活动内容"
        prop="activityContent"
        width="260"
      />
      <el-table-column
        label="参与领导"
        prop="lead"
        width="260"
      />
      <el-table-column
        label="视频回放"
        prop="videoPlayback"
      >
        <template>
          <el-button
            type="primary"
            @click="playVideo"
          >
            播放
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="活动档案"
        prop="activityFiles"
      />
    </el-table>

    <Pagination
      :page-size.sync="pagination.pageSize"
      :page-num.sync="pagination.pageNum"
      :total.sync="pagination.total"
      @pagination-change="getList"
    />

    <el-dialog
      title="视频回放"
      :visible.sync="dialogVisible"
      width="50%"
      :destroy-on-close="true"
    >
      <RtmpPlayer
        :src="require('@/assets/videos/backPlay.mp4')"
        :mute="true"
        video-type="video/mp4"
      />
    </el-dialog>
  </div>
</template>

<script>
import RtmpPlayer from '@/components/RtmpPlayer'
export default {
  components: {
    RtmpPlayer
  },
  data () {
    return {
      isLoading: false,
      selection: [],
      dialogVisible: false,
      tableData: [
        {
          activityName: '综治现场会',
          activityTime: '2020年10月25日',
          venue: '国体综治中心',
          activityScale: '小型活动',
          numberOfPeople: '20人',
          activityContent: '讨论南昌综治管理相关问题',
          lead: ' 南昌政法委书记、综治中心主任',
          videoPlayback: '',
          activityFiles: ''
        }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 1
      },
      searchValue: '',
      advancedSearchShow: false,
      advancedForm: {}
    }
  },
  mounted () {},
  methods: {
    getList () {},
    resetSearchForm () {
      this.advancedForm = this.$options.data().advancedForm
      this.getList()
    },
    searchAdvance () {},
    del () {},
    handleSelectionChange () {},
    playVideo () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped></style>

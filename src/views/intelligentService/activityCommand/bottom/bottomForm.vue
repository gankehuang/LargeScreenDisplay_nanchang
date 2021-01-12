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
        <el-button type="primary"
icon="el-icon-plus"
@click="add()"
          >录入信息</el-button
        >
        <!-- <el-button
          plain
          icon="el-icon-delete"
        >批量删除</el-button> -->
      </div>
      <div class="right">
        <el-input
          v-model="advancedForm.name"
          placeholder="活动名称"
          clearable
          class="search-input"
        />
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button plain @click="advancedSearchShow = true">高级搜索</el-button>
      </div>
    </div>

    <search-advance v-show="advancedSearchShow">
      <el-form ref="advancedForm" :model="advancedForm" label-width="140px">
        <el-form-item label="活动规模">
          <el-select
            v-model="advancedForm.scale"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in scaleList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="advancedForm.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动状态">
          <el-select
            v-model="advancedForm.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
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

    <el-table
      :data="tableData"
      current-row-key="id"
      height="100%"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed="left" />
      <el-table-column label="活动名称" prop="name" />
      <el-table-column label="活动时间" prop="activityStartTime" />
      <el-table-column label="活动地点" prop="activityAddresses">
        <template slot-scope="scope">
          {{
            scope.row.activityAddresses &&
            scope.row.activityAddresses.length > 0
              ? scope.row.activityAddresses[0].address
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="活动类型" prop="typeText" />
      <el-table-column label="活动规模" prop="scaleText" />
      <el-table-column label="涉及人数" prop="involveNumber" />
      <el-table-column label="活动状态" prop="statusText" />
      <el-table-column label="活动简介" prop="introduction" />
      <el-table-column label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <td-btn content="上传" icon="el-icon-s-promotion" />
          <td-btn
            content="修改"
            icon="el-icon-edit"
            @click="editMes(scope.row)"
          />
          <td-btn content="回放" icon="el-icon-bicycle" @click="Replay()" />
          <td-btn content="指挥记录" icon="el-icon-alarm-clock" />
          <td-btn
            content="删除"
            icon="el-icon-delete"
            @click="deletes(scope.row)"
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
    <!--增加活动弹框-->
    <AddActiveModal
      :visible.sync="addActiveModal.visible"
      :info="addActiveModal.info"
    />
    <el-dialog
      title="视频回放"
      :visible.sync="dialogVisible"
      width="50%"
      :destroy-on-close="true"
    >
      <video-player
        class="vjs-custom-skin"
        :options="playerOptions"
      ></video-player>
    </el-dialog>
  </div>
</template>

<script>
import AddActiveModal from './addActiveModal'
import {
  selectActivity,
  deleteActivityBase
} from '@/api/adminIntelligentService/activityCommand'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    AddActiveModal,
    videoPlayer
  },
  watch: {
    addActiveModal() {
      if (!this.addActiveModal.visible) {
        this.getList()
      }
    }
  },
  data() {
    return {
      dataList: [],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        controls: false, // 控制条
        preload: 'auto', // 视频预加载
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            src: require('@/assets/videos/backPlay.mp4')
          }
        ],
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      url: require('@/assets/videos/backPlay.mp4'),
      dialogVisible: false,
      isLoading: false,
      selection: [],
      addActiveModal: {
        visible: false,
        info: null
      },
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchValue: '',
      advancedSearchShow: false,
      advancedForm: {
        name: '',
        scale: null,
        type: null,
        status: null,
        startTime: '',
        endTime: ''
      },
      statusList: [
        { value: 0, name: '未开始' },
        { value: 1, name: '进行中' },
        { value: 2, name: '已结束' }
      ],
      typeList: [
        { value: 0, name: '演唱会' },
        { value: 1, name: '展会' },
        { value: 2, name: '会议' },
        { value: 3, name: '体育赛事' },
        { value: 4, name: '公益活动' },
        { value: 5, name: '节假日活动' },
        { value: 6, name: '其他' }
      ],
      scaleList: [
        { value: 0, name: '小型' },
        { value: 1, name: '中型' },
        { value: 2, name: '大型' },
        { value: 3, name: '超大型' }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.dataList && this.dataList.length > 0) {
        this.advancedForm.startTime = this.dataList[0] + ' 00:00:00'
        this.advancedForm.endTime = this.dataList[1] + ' 23:59:59'
      } else {
        this.advancedForm.startTime = ''
        this.advancedForm.endTime = ''
      }
      selectActivity(
        this.advancedForm,
        this.pagination.pageNum,
        this.pagination.pageSize
      ).then(res => {
        if (res.status === 200) {
          this.tableData = res.data
          this.pagination.total = res.data.length
          this.$emit('busData', res.data)
        }
      })
    },
    editMes(rowData) {
      this.addActiveModal.visible = true
      this.addActiveModal.info = rowData
    },
    searchAdvance() {
      this.getList()
      this.advancedSearchShow = false
    },
    handleSelectionChange() {},
    resetSearchForm() {
      this.dataList = []
      this.advancedForm = this.$options.data().advancedForm
      this.getList()
    },
    // 回放
    Replay() {
      this.dialogVisible = true
    },
    add() {
      this.addActiveModal.visible = true
    },
    // 删除
    deletes(row) {
      this.$confirm('删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteActivityBase({
            id: row.id
          }).then(res => {
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

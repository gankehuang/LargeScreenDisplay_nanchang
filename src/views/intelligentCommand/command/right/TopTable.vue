<template>
  <div class="list-container pepple-list">
    <el-table
      :data="tableData"
      :stripe="true"
      style="width: 100%"
    >
      <el-table-column
        prop="leaderName"
        label="姓名"
        width="60"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="175"
            trigger="click"
            display="none"
            :visible-arrow="false"
          >
            <div class="tan">
              <div class="tt">
                <svg-icon
                  icon-class="icon-dianhua"
                  class="icon-dianhua"
                  style="font-size: 22px"
                />
                <div>电话</div>
              </div>
              <div
                class="tt"
                @click="schedulingVideo"
              >
                <svg-icon
                  icon-class="icon-shipin"
                  class="icon-shipin"
                  style="font-size: 22px"
                />
                <div>视频</div>
              </div>
            </div>
            <div slot="reference">
              {{ scope.row.leaderName }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="leaderDistrict"
        label="县区/部门"
        width="90"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="175"
            trigger="click"
            display="none"
            :visible-arrow="false"
          >
            <div class="tan">
              <div
                class="tt"
                @click="schedulingVideo"
              >
                <svg-icon
                  icon-class="icon-dianhua"
                  class="icon-dianhua"
                  style="font-size: 22px"
                />
                <div>电话</div>
              </div>
              <div class="tt">
                <svg-icon
                  icon-class="icon-shipin"
                  class="icon-shipin"
                  style="font-size: 22px"
                />
                <div>视频</div>
              </div>
            </div>
            <div slot="reference">
              {{ scope.row.leaderDistrict }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="leaderPosition"
        label="职务"
        width="110"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="175"
            trigger="click"
            display="none"
            :visible-arrow="false"
          >
            <div class="tan">
              <div class="tt">
                <svg-icon
                  icon-class="icon-dianhua"
                  class="icon-dianhua"
                  style="font-size: 22px"
                />
                <div>电话</div>
              </div>
              <div
                class="tt"
                @click="schedulingVideo"
              >
                <svg-icon
                  icon-class="icon-shipin"
                  class="icon-shipin"
                  style="font-size: 22px"
                />
                <div>视频</div>
              </div>
            </div>
            <div slot="reference">
              {{ scope.row.leaderPosition }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="leaderPhone"
        label="电话"
        width="120px"
        disabled="true"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="175"
            trigger="click"
            display="none"
            :visible-arrow="false"
          >
            <div class="tan">
              <div class="tt">
                <svg-icon
                  icon-class="icon-dianhua"
                  class="icon-dianhua"
                  style="font-size: 22px"
                />
                <div>电话</div>
              </div>
              <div
                class="tt"
                @click="schedulingVideo(1)"
              >
                <svg-icon
                  icon-class="icon-shipin"
                  class="icon-shipin"
                  style="font-size: 22px"
                />
                <div>视频</div>
              </div>
            </div>
            <div slot="reference">
              {{ scope.row.leaderPhone }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-if="isShowFlv"
      class="rtmp-box video-position"
    >
      <img
        class="btn-close"
        src="@/assets/image/common/close-btn.png"
        @click="bindBtnClose(1)"
      >
      <FlvPlayer
        has-audio
        src="http://172.11.16.243:8025/flv"
        class="flvPlayer"
      />
    </div>
  </div>
</template>

<script>
import FlvPlayer from '@/components/FlvPlayer'
export default {
  components: {
    FlvPlayer
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isShowFlv: false
    }
  },
  methods: {
    bindBtnClose () {
      this.isShowFlv = false
    },
    schedulingVideo () {
      this.isShowFlv = true
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  height: 244px;
  overflow-y: auto;
  .el-table th {
    background-color: #64b4ff !important;
  }
}

.rtmp-box {
  position: relative;

  .btn-close {
    position: absolute;
    right: 35px;
    top: 10px;
    cursor: pointer;
    z-index: 999;
  }

  .flvPlayer {
    width: 400px;
    height: 200px;
  }
}

/* 设置滚动条的样式 */
.list-container::-webkit-scrollbar {
  width: 12px;
}

/* 滚动槽 */
.list-container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

/* 滚动条滑块 */
.list-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #04335d;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
<style lang="scss">
.pepple-list {
  position: relative;
  .el-table td,
  .el-table th.is-leaf {
    border: none !important;
  }
  .el-table th,
  .el-table tr,
  .el-table td {
    color: #ffffff;
    text-align: center;
  }
  .el-table th {
    background-color: rgba(100, 180, 255, 0.3) !important;
  }
  .el-table tr,
  .el-table td {
    background: rgba(46, 104, 206, 0.18) !important;
  }
  .el-table__row--striped td {
    background: rgba(6, 26, 62, 0.34) !important;
  }
}
.el-popover {
  background-color: transparent;
  padding: 0;
  border: 0;
  margin: 0;
}
.tan {
  display: flex;
  height: 108px;
  background: url("~@/assets/image/command/shipin.png") no-repeat;
}
.tt {
  text-align: center;
  width: 50%;
  height: 98px;
  padding-top: 35px;
  div {
    font-size: 18px;
    font-weight: 400;
    color: #a9daff;
  }
}
.video-position {
  position: absolute !important;
  top: 0;
  left: 0;
  z-index: 3002;
}
</style>

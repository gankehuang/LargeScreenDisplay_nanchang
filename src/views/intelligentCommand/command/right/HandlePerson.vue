<template>
  <div
    class="event-person"
    style="position:relative"
  >
    <div class="person-title">现场处置人员</div>
    <div
      v-if="isShowFlv"
      class="rtmp-box"
    >
      <img
        class="btn-close"
        src="@/assets/image/common/close-btn.png"
        @click="bindBtnClose()"
      />
      <FlvPlayer
        has-audio
        src="http://172.11.16.243:8025/flv"
        class="flvPlayer"
      />
    </div>
    <div
      v-else
      class="person-list"
    >
      <el-scrollbar style="height: 80%">
        <div
          class="person-item"
          v-for="item in personList"
          :key="item.id"
        >
          <div class="item-avatar">
            <el-image
              v-if="item.imageUrl"
              fit="cover"
              style="width: 100%; height: 100%"
              :preview-src-list="[item.imageUrl]"
              :src="item.imageUrl"
            />
          </div>
          <div
            class="item-content"
            @click="focusDevice(item)"
          >
            <div>姓名：{{ item.name }}</div>
            <!--              <div>状态：<span :style="{ color: 'red' }">离线</span></div>-->
            <div>状态：<span style="color:#00FFFF">在线</span></div>
            <div>队伍：专职网格员</div>
          </div>
          <!-- @click="handleMeetingModalVisible(0,item)" -->
          <div class="item-operate">
            <div
              class="btn"
              @click="handleSingleMeetingModalVisible(0,item)"
            ></div>
            <!-- @click="handleMeetingModalVisible(1,item)" -->
            <div
              class="btn"
              @click="handleSingleMeetingModalVisible(1,item)"
            ></div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <!-- <MeetingModal
      :visible.sync="meetingModalVisible"
      :gridMemberInfo.sync="gridMemberInfo"
      :clientId.sync="clientId"
    /> -->
    <SingleMeetingModal
      :visible.sync="singleMeetingModalVisible"
      :gridMemberInfo.sync="gridMemberInfo"
      :clientId.sync="clientId"
    />
  </div>
</template>

<script>
import FlvPlayer from '@/components/FlvPlayer'
// import MeetingModal from '@/components/MeetingModal'
import SingleMeetingModal from '@/components/SingleMeetingModal'
import { selectByGridAdminClientById } from '@/api/intelligentCommand/command'
export default {
  props: {
    personList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    FlvPlayer,
    // MeetingModal,
    SingleMeetingModal
  },
  data() {
    return {
      isShowFlv: false,
      // meetingModalVisible: false,
      singleMeetingModalVisible: false,
      gridMemberInfo: null,
      clientId: null
    }
  },
  methods: {
    bindBtnClose() {
      this.isShowFlv = false
    },
    schedulingVideo(item) {
      this.isShowFlv = true
      // this.$EventBus.$emit('schedulingVideo', item.id)
    },
    focusDevice(item) {
      if (item.lat && item.lon && item.isOnline === 1) {
        this.$EventBus.$emit('focusDevice', [item.lon, item.lat])
      }
    },
    // async handleMeetingModalVisible (type, item) {
    //   const gridMemberInfo = { callType: type, ...item }
    //   this.gridMemberInfo = gridMemberInfo
    //   this.meetingModalVisible = await this.handleSelectByGridAdminClientById()
    // },
    async handleSingleMeetingModalVisible(type, item) {
      const gridMemberInfo = { callType: type, ...item }
      this.gridMemberInfo = gridMemberInfo
      this.singleMeetingModalVisible = await this.handleSelectByGridAdminClientById()
    },
    async handleSelectByGridAdminClientById() {
      const { status, data } = await selectByGridAdminClientById({
        mobile: this.gridMemberInfo.tel
      })
      if (status === 200 && data) {
        this.clientId = data.clientId
        return true
      } else {
        this.$message.warning('网格员未登录过账号')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
.event-person {
  .person-title {
    width: 100%;
    height: 36px;
    font-size: 16px;
    color: #7dbcff;
    text-align: center;
    background: url('~@/assets/image/command/block-title-bg.png') no-repeat;
    background-size: contain;
    background-position: center center;
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
  }

  .person-list {
    height: 300px;
  }
  .person-item {
    margin-top: 10px;
    width: 100%;
    height: 100px;
    background: url('~@/assets/image/command/person-item-bg.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item-avatar {
      width: 62px;
      height: 78px;
      background: url('~@/assets/image/common/no-avatar.png') no-repeat;
      background-size: 100% 100%;
    }
    .item-content {
      color: #a9daff;
      line-height: 2;
      padding-left: 15px;
      cursor: pointer;
    }

    .item-operate {
      display: flex;
      .btn:nth-child(1) {
        width: 50px;
        height: 60px;
        background: url('~@/assets/image/command/tell-btn.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .btn:nth-child(2) {
        width: 50px;
        height: 60px;
        background: url('~@/assets/image/command/video-btn.png') no-repeat;
        background-size: 100% 100%;
        margin-left: 10px;
        cursor: pointer;
      }
      .btn:nth-child(3) {
        width: 50px;
        height: 60px;
        background: url('~@/assets/image/command/video-btn.png') no-repeat;
        background-size: 100% 100%;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>

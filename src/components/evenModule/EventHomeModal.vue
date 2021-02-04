<template>
  <Dialog
    v-if="info"
    width="60%"
    top="10vh"
    :title="modalTitle"
    :visible.sync="dialogVisible"
    append-to-body
    @open="openBefore"
  >
    <div class="base-block left1-block">
      <div class="table-head">
        <span class="head-col">姓名</span>
        <span class="head-col">性别</span>
        <span class="head-col">手机</span>
      </div>
      <el-scrollbar style="height: calc(100% - 28px);">
        <div
          v-for="item in personList"
          :key="item.id"
          class="table-row"
        >
          <span class="row-col">{{ item.name | hideName }}</span>
          <span class="row-col">{{ item.gender === '1' ? '男' : '女' }}</span>
          <span class="row-col">{{ item.phone | hidePhone }}</span>
        </div>
        <div
          v-if="!personList.length"
          class="no-person"
        >
          暂无人员
        </div>
      </el-scrollbar>
    </div>
    <div class="base-block left2-block">
      <IframeVideoPlay
        v-if="info.gbIndexCode || info.cameraIndexCode"
        :camera-index-code="
          info.gbIndexCode ? info.gbIndexCode : info.cameraIndexCode
        "
        class="video-item"
        width="100%"
        height="200"
      />
      <div
        v-else
        class="no-video"
      >
        暂无相关视频
      </div>
    </div>
    <div class="base-block right1-block">
      <el-scrollbar style="height: 100%;">
        <div class="item-row">
          <span>事件状态：</span>
          <span>{{ info.statusText | resultDataIsNull }}</span>
        </div>
        <div class="item-row">
          <span>紧急程度：</span>
          <span>{{ info.emergencyLevelText | resultDataIsNull }}</span>
        </div>
        <div class="item-row">
          <span>事件类型：</span>
          <span>{{ info.typeText | resultDataIsNull }}</span>
        </div>
        <div class="item-row">
          <span>发生时间：</span>
          <span>{{ info.happenedTime | resultDataIsNull }}</span>
        </div>
        <div class="item-row">
          <span>事件描述：</span>
          <span>{{
            info.description
              ? info.description
              : info.eventName + '预警，请及时处理！'
          }}</span>
        </div>
      </el-scrollbar>
    </div>
    <div class="base-block right2-block">
      <el-scrollbar style="height: 100%;">
        <div class="item-row">
          <span>姓名：</span>
          <span>{{ info.peopleName | hideName }}</span>
        </div>
        <div class="item-row">
          <span>身份证：</span>
          <span>{{ info.peopleIdNumber | hideIdCard }}</span>
        </div>
        <div class="item-row">
          <span>人员类别：</span>
          <span>{{ info.peopleLabel | resultDataIsNull }}</span>
        </div>
      </el-scrollbar>
    </div>
    <div
      class="base-block right3-block"
    >
      <div
        v-if="snapImageUrl.length"
        class="item-list"
      >
        <el-image
          v-for="(item, index) in snapImageUrl"
          :key="index"
          :src="
            item ? item : require('@/assets/image/warning/no-avatar.png')
          "
          class="img"
          :preview-src-list="[
            item ? item : require('@/assets/image/warning/no-avatar.png')
          ]"
        />
        <p>上报图片</p>
      </div>
      <div
        v-if="info.processingImageUrl"
        class="item-list"
      >
        <el-image
          :src="
            info.processingImageUrl
              ? info.processingImageUrl
              : require('@/assets/image/warning/no-avatar.png')
          "
          class="img"
        />
        <p>处理图片</p>
      </div>
      <div
        v-if="!snapImageUrl.length && !info.processingImageUrl"
        class="no-avatar"
      >
        暂无图片
      </div>
    </div>
    <template v-slot:footer>
      <div
        class="base-btn"
        @click="handleBtn('指派')"
      >
        指派
      </div>
      <div
        class="base-btn"
        @click="handleBtn('上报')"
      >
        上报
      </div>
      <div
        class="base-btn"
        @click="handleBtn('处置')"
      >
        处置
      </div>
      <div
        class="base-btn"
        @click="handleBtn('调度')"
      >
        调度
      </div>
      <div
        class="base-btn"
        @click="handleBtn('详情')"
      >
        详情
      </div>
    </template>
  </Dialog>
</template>

<script>
import { getGroupForce } from '@/api/intelligentCommand/warning'
export default {
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      dialogVisible: false,
      personList: []
    }
  },
  computed: {
    modalTitle () {
      if (this.info.peopleLabel && this.info.eventName) {
        return `${this.info.peopleLabel} - ${this.info.eventName}`
      }
      if (!this.info.peopleLabel && this.info.eventName) {
        return `人员布控 - ${this.info.eventName}`
      }
      if (this.info.peopleLabel && !this.info.eventName) {
        return this.info.peopleLabel
      }

      return '-'
    },
    snapImageUrl () {
      if (this.info &&
        this.info.snapImageUrl) {
        return []
      }
      if (this.info.snapImageUrl.indexOf(',') > -1) {
        return this.info.snapImageUrl.split(',')
      }
      return [this.info.snapImageUrl]
    }
  },
  methods: {
    openBefore () {
      this.getPersonInfo()
    },
    async getPersonInfo () {
      this.personList = []
      const { status, data } = await getGroupForce({
        gridCode: this.info.gridCode,
        eventId: this.info.eventId
      })
      if (status === 200) {
        const classObj = {}
        classObj['网格员'] = []
        data.forEach(item => {
          if (item.industryTypeName) {
            if (!classObj['' + item.industryTypeName + '']) {
              classObj['' + item.industryTypeName + ''] = [item]
            } else {
              classObj['' + item.industryTypeName + ''].push(item)
            }
          } else {
            classObj['网格员'].push(item)
          }
        })

        this.personList = classObj['网格员']
      }
    },
    // 处理不同按钮操作
    handleBtn (typeText) {
      if (typeText === '指派' || typeText === '上报' ||
        typeText === '处置' || typeText === '详情') {
        this.$emit('onEventBtnHandle', {
          btnTypeText: typeText,
          ...this.info
        })

        this.closeModal()

        return
      }

      if (typeText === '调度') {
        this.$router.push({
          path: '/intelligentCommand/command'
        })
      }
    },
    // 打开弹框
    openModal () {
      this.dialogVisible = true
    },
    // 关闭弹框
    closeModal () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow: auto;
}
::v-deep .el-dialog__body {
  position: relative;
  height: 580px;
  background: url("~@/assets/image/event/event-home-bg.png") no-repeat 43% center;
  background-size: contain;
}
.base-block {
  position: absolute;
  padding: 15px;
  background: url("~@/assets/image/event/event-home-block-bg.png") no-repeat;
  background-size: 100% 100%;
  &.left1-block {
    left: 50px;
    top: 15px;
    width: 270px;
    height: 200px;
    .table-head {
      display: flex;
      margin-bottom: 10px;
      .head-col {
        color: hsla(0,0%,100%,.5);
        &:nth-child(1) {
          flex: 0 0 30%;
        }
        &:nth-child(2) {
          flex: 0 0 27%;
        }
        &:nth-child(3) {
          flex: 0 0 35%;
        }
      }
    }
    .table-row {
      display: flex;
      flex-wrap: nowrap;
      margin-bottom: 10px;
      .row-col {
        color: #fff;
        white-space: nowrap;
        &:nth-child(1) {
          flex: 0 0 30%;
        }
        &:nth-child(2) {
          flex: 0 0 25%;
        }
        &:nth-child(3) {
          flex: 0 0 35%;
        }
      }
    }

    .no-person {
      color: #fff;
    }
  }
  &.left2-block {
    left: 50px;
    bottom: 15px;
    width: 270px;
    height: 230px;
    .no-video {
      color: #fff;
    }
  }

  &.right1-block {
    right: 164px;
    top: 15px;
    width: 255px;
    height: 180px;
    .item-row {
      color: #fff;
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }

  &.right2-block {
    right: 105px;
    top: 259px;
    width: 210px;
    height: 120px;
    .item-row {
      color: #fff;
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }

  &.right3-block {
    right: 160px;
    bottom: 15px;
    width: 230px;
    height: 130px;
    display: flex;
    .item-list {
      color: #fff;
      text-align: center;
      .img {
        width: 70px;
      }
    }

    .no-avatar {
      color: #fff;
    }
  }
}
::v-deep .el-dialog__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .base-btn {
    width: 100px;
    height: 30px;
    margin-left: 13px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: url("~@/assets/image/event/event-home-btn.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>

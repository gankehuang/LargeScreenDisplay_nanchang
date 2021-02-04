<template>
  <div
    v-if="visible"
    class="modal"
  >
    <img
      class="btn-close"
      src="@/assets/image/common/close-btn.png"
      @click="bindBtnClose"
    >
    <div class="title">
      视频预览
    </div>
    <div class="body">
      <div class="body-left">
        <div class="video-box">
          <div class="header">
            <img
              class="controll-icon"
              src="@/assets/image/gridView/controll.png"
            >
            <span
              v-if="info"
              class="bayonet-name"
            >{{
              info.positionName
            }}</span>

            <img
              class="toggle-icon"
              src="@/assets/image/gridView/menu.png"
            >
          </div>
          <div class="player-container">
            <IframeVideoPlay
              v-if="info"
              :camera-index-code="
                info.gbIndexCode ? info.gbIndexCode : info.cameraIndexCode
              "
              class="video-item"
              width="100%"
              height="100%"
            />
            <flv-player
              v-if="playerSrc && info.type == 1"
              :id="videoId"
              :is-new="true"
              :src="playerSrc"
            />
          </div>
        </div>

        <!-- <div
          class="photo-box"
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
        >
          <div class="header">
            <img
              class="controll-icon"
              src="@/assets/image/gridView/controll.png"
            />
            <span class="bayonet-name">实时抓拍</span>
          </div>

          <div class="photo-list">
            <img
              src="@/assets/image/gridView/arrow.png"
              class="control control-left"
              @click="scrollToLeft"
            />
            <div class="list-container">
              <div
                class="items"
                ref="container"
                :style="{ left: translateX + 'px' }"
              >
                <div
                  class="item"
                  v-for="item in snapFaceDataHikList"
                  :key="item.id"
                >
                  <el-image
                    style="width:80px;height:80px"
                    :z-index="99"
                    fit="contain"
                    :src="item.imageUrl"
                    @click="isShowHkVideo = false"
                    :preview-src-list="[
                      item.bkgUrl ? item.bkgUrl : item.imageUrl
                    ]"
                  />
                  <span class="time">{{
                    item.shootTime ? item.shootTime.split(" ")[1] : ""
                  }}</span>
                </div>
              </div>
            </div>

            <img
              src="@/assets/image/gridView/arrow.png"
              class="control control-right"
              @click="scrollToRight"
            />
          </div>
        </div> -->
      </div>

      <!-- <div
        class="body-right"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
      >
        <div class="statistics-box">
          <div class="total-item">
            <div class="content first">
              <p class="num">
                {{ todaySnapCount }}
              </p>
              <p class="text">
                当日抓拍
              </p>
            </div>
          </div>
          <div class="total-item seconds">
            <div class="content">
              <p class="num">
                {{ todayAlarmCount }}
              </p>
              <p class="text">
                当日报警
              </p>
            </div>
          </div>
        </div>

        <div class="record-box">
          <div class="record-title">
            通行记录
          </div>
          <div class="record-menu-list">
            <div
              class="record-menu-item"
              v-for="(item, index) in personTypeList"
              :key="index"
              @click="handlePersonType(item, index)"
              :class="{ active: curPersonType === index }"
            >
              {{ item }}
            </div>
          </div>

          <div class="record-list">
            <div class="thead">
              <div>抓拍图片</div>
              <div>时间</div>
              <div>姓名</div>
            </div>

            <div class="tbody">
              <div
                class="record-item"
                v-for="item in recordList"
                :key="item.id"
              >
                <div>
                  <el-image
                    style="width:40px;height:40px"
                    fit="contain"
                    :src="item.imageUrl"
                    @click="isShowHkVideo = false"
                    :preview-src-list="[
                      item.bkgUrl ? item.bkgUrl : item.imageUrl
                    ]"
                  />
                </div>
                <div>
                  {{ item.shootTime ? item.shootTime.split(" ")[1] : "" }}
                </div>
                <div>{{ item.name === "unknown" ? "未知" : item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import FlvPlayer from '@/components/FlvPlayer'
import { startVideo, selectSnapFaceBy } from '@/api/smartData/gridView'

export default {
  components: {
    FlvPlayer
  },
  props: {
    info: Object,
    visible: Boolean
  },
  data () {
    return {
      playerSrc: '',
      loading: false,
      translateX: 0,
      curPersonType: 2,
      curPersonTypeName: '陌生人员',
      personTypeList: ['普通人员', '重点人员', '陌生人员'],
      todaySnapCount: 0,
      todayAlarmCount: 0,
      snapFaceDataHikList: [],
      personListObj: {
        generalList: [],
        keyFocusList: [],
        strangerList: []
      },
      videoId: '',
      isShowHkVideo: true
    }
  },
  computed: {
    recordList () {
      if (this.curPersonTypeName === '普通人员') {
        return this.personListObj.generalList
      } else if (this.curPersonTypeName === '重点人员') {
        return this.personListObj.keyFocusList
      } else if (this.curPersonTypeName === '陌生人员') {
        return this.personListObj.strangerList
      } else {
        return []
      }
    }
  },
  watch: {
    info () {
      if (this.info && this.info.type === 1) {
        this.startVideo()
      }

      if (this.info.cameraIndexCode) {
        this.getDeviceInfo()
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.handleCloseImg)

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.handleCloseImg)
    })
  },
  methods: {
    handleCloseImg (e) {
      if (e.target.className === 'el-icon-circle-close') {
        this.isShowHkVideo = true
      }
    },
    bindBtnClose () {
      this.$emit('update:visible', false)
    },
    async getDeviceInfo () {
      const { status, data } = await selectSnapFaceBy({
        code: this.info.cameraIndexCode
      })
      if (status === 200) {
        this.todaySnapCount = data.snapCount
        this.todayAlarmCount = data.alarmCount
        this.snapFaceDataHikList = data.snaList
        this.personListObj = {
          generalList: data.knNameList.filter(item => {
            return item.name !== 'unknown'
          }),
          keyFocusList: data.focusList,
          strangerList: data.unNameList
        }
      }
    },
    // 获取RTC视频地址
    async startVideo () {
      this.playerSrc = ''

      const { status, data, message } = await startVideo(this.info.id)

      if (status === 200) {
        this.playerSrc = data.url
        this.videoId = data.id
      } else {
        this.$message.error(message[0].message)
      }
    },
    scrollToLeft () {
      if (this.translateX < -250) {
        this.translateX = this.translateX + 120
      } else {
        this.translateX = 0
      }
    },
    scrollToRight () {
      const width = this.$refs.container.offsetWidth
      if (this.translateX > -width + 640) {
        this.translateX = this.translateX - 80
      }
    },
    handlePersonType (item, index) {
      this.curPersonType = index
      this.curPersonTypeName = item
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: url("~@/assets/image/common/modal-bg.png") no-repeat;
  background-size: contain;
  width: 1033px;
  height: 709px;
  top: 50%;
  left: 53%;
  transform: translate(-50%, -50%);
  z-index: 999;
  padding: 12px 7px 6px 6px;

  .btn-close {
    position: absolute;
    top: 23px;
    right: 27px;
    cursor: pointer;
    z-index: 9;

    &:hover {
      filter: brightness(1.2);
    }
  }

  .title {
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    color: #00ffff;
    font-weight: bold;
  }

  .body {
    padding: 24px 20px;
    display: flex;
    height: calc(100% - 36px);
  }

  .body-left {
    width: 100%;
    height: 100%;
    .video-box {
      padding: 10px;
      height: 100%;
      border: 1px solid #0b61a0;

      .header {
        position: relative;

        .controll-icon {
          width: 14px;
          height: 14px;
          vertical-align: middle;
        }

        .bayonet-name {
          color: #00a0e9;
          padding-left: 10px;
          font-size: 12px;
        }

        .toggle-icon {
          position: absolute;
          right: 10px;
          top: 2px;
          width: 14px;
          height: 14px;
          cursor: pointer;
        }

        .toggle-list {
          position: absolute;
          z-index: 99;
          right: 18px;
          top: 30px;
          color: #fff;

          .toggle-item {
            font-size: 12px;
            background: rgba(3, 34, 60, 0.8);
            border-radius: 3px;
            margin-top: 10px;
            padding: 6px;
            cursor: pointer;

            &.active {
              color: #00a0e9;
            }
          }
        }
      }

      .player-container {
        margin-top: 10px;
        width: 100%;
        height: calc(100% - 50px);
        border: 1px solid #0b61a0;
      }
    }

    .photo-box {
      margin-top: 10px;
      height: 120px;
      border: 1px solid #0b61a0;

      .header {
        padding: 10px;
        display: flex;
        align-items: center;

        .controll-icon {
          width: 14px;
          height: 14px;
        }

        .bayonet-name {
          padding-left: 10px;
          color: #00a0e9;
          font-size: 12px;
        }
      }

      .photo-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;

        .control {
          cursor: pointer;
          width: 35px;
          height: 14px;
          margin: 0 4px;
          &:hover {
            filter: brightness(1.6);
          }
        }

        .control-left {
          transform: rotate(180deg);
        }

        .list-container {
          flex-grow: 1;
          overflow: hidden;
          padding-top: 3px;

          .items {
            display: flex;
            width: fit-content;
            position: relative;
            .item {
              position: relative;
              height: 72px;
              width: 60px;
              margin: 0 20px;

              ::v-deep.el-icon-circle-close {
                color: #fff;
              }

              .img-label {
                position: absolute;
                z-index: 99;
                font-size: 12px;
                color: #fff;
                left: -15px;
                top: -3px;
                width: 15px;
                padding: 2px;
                height: 68px;
                background: url("~@/assets/image/gridView/modal-photo-lable.png")
                  no-repeat;
                background-size: cover;
              }

              .time {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 5px;
                color: #fff;
                font-size: 12px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }

  .body-right {
    margin-left: 23px;
    width: calc(100% - 678px);
    overflow: hidden;

    .statistics-box {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 120px;

      .total-item {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: url("~@/assets/image/gridView/population-round.png")
          no-repeat;

        &:nth-child(2) {
          background: url("~@/assets/image/gridView/population-round1.png")
            no-repeat;
        }

        .content {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;

          .num {
            font-size: 18px;
          }

          .text {
            padding-top: 5px;
            font-size: 12px;
          }
        }

        .first {
          & > p {
            color: #3ea6d2;
          }
        }

        .seconds {
          & > p {
            color: #e60012;
          }
        }
      }
    }

    .record-box {
      position: relative;
      height: 486px;
      background: url("~@/assets/image/gridView/modal-record-bg.png") no-repeat;
      background-size: contain;

      .record-title {
        position: absolute;
        left: 10px;
        top: 20px;
        font-size: 16px;
        color: #fff;
      }

      .record-menu-list {
        position: absolute;
        right: 10px;
        top: 27px;
        display: flex;
        color: #fff;

        .record-menu-item {
          position: relative;
          font-size: 12px;
          padding: 3px 6px;
          z-index: 2;
          cursor: pointer;
          color: #ffffff;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            border: 1px solid #3695be;
            transform: skewX(160deg);
          }

          &.active {
            &::before {
              background: #3695be;
            }
          }
        }
      }

      .record-list {
        position: absolute;
        width: 100%;
        top: 63px;

        .thead {
          display: flex;

          & > div {
            color: #3695be;
            flex: 1;
            text-align: center;
          }
        }

        .tbody {
          &::-webkit-scrollbar {
            width: 0;
          }

          height: 423px;
          padding: 10px 0 30px 0;
          overflow-y: auto;

          .record-item {
            display: flex;
            height: 45px;
            align-items: center;

            .img {
              width: 30px;
              height: 30px;
            }

            & > div {
              flex: 1;
              text-align: center;
              font-size: 12px;
              color: #fff;
            }

            &:nth-child(odd) {
              background-color: rgba(255, 255, 255, 0.1);
              color: #fff;
            }
          }
        }
      }
    }
  }
}

/deep/ .el-icon-circle-close {
  color: #fff;
  z-index: 9999;
}

/deep/ .el-image-viewer__img {
  transform: scale(0.7) rotate(0deg) !important;
}
</style>

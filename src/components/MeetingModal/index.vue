<template>
  <div
    class="mask-container"
    v-if="visible"
  >
    <div class="mask"></div>
    <div class="meeting-modal-container">
      <div
        class="popup-close"
        @click="close"
      ></div>

      <div
        class="video-content"
        v-if="gridMemberInfo.callType===1"
      >
        <div
          class="video-one"
          v-if="joinList.length===1"
        >
          <div
            :id="'join'+joinList[0].id"
            class="video-view"
          ></div>
          <div class="edit-block">
            <div class="info">
              <svg-icon
                icon-class="population-people"
                class="icon"
              />
              <span class="name">{{joinList[0].name}}</span>
              <span class="name">专职网格员</span>
            </div>
            <div class="edit">
              <div
                class="fullscreen"
                :class="{'fullscreen-none':!joinList[0].fullscreen }"
              />
              <div
                class="camera"
                @click="handleRemoteCamera(joinList[0])"
                :class="{'camera-none':!joinList[0].camera }"
              ></div>
              <div
                class="mic"
                @click="handleRemoteMic(joinList[0])"
                :class="{'mic-none':!joinList[0].mic }"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="video-many"
          v-else
        >
          <div
            class="video-number"
            v-for="(item,index) in joinList"
            :id="'join'+item.id"
            :style="{width: comWidth,height: comHeight}"
            :key="index"
          >
          </div>
        </div>
        <div class="hangup-block">
          <div class="time-record">{{videoTimer}}</div>
          <div class="edit">
            <div
              class="mic"
              @click="handleLocalMic"
              :class="{'mic-none': !localMic}"
            />
            <div
              class="hangup"
              @click="leaveRoom(client)"
            />
            <!-- <div
              class="camera"
              @click="handleLocalCamera"
              :class="{'camera-none': !localCamera}"
            /> -->
          </div>
        </div>
      </div>
      <div
        class="mic-content"
        v-if="gridMemberInfo.callType===0"
      >
        <div class="mic-content-bg" />
        <div class="hangup-block">
          <div
            :id="'join'+joinList[0].id"
            style="visibility: hidden;"
          ></div>
          <div class="time-record">{{micTimer}}</div>
          <div class="edit">
            <!-- <div
              class="mic"
              @click="handleLocalMic"
              :class="{'mic-none': !localMic}"
            /> -->
            <div
              class="hangup"
              @click="leaveRoom(client)"
            />
          </div>
        </div>
      </div>
      <div class="member-list">
        <div class="search-block">
          <el-input placeholder="搜索人员">
            <template
              slot="prepend"
              icon="el-icon-search"
            />
            <el-button slot="append">邀请视频</el-button>
          </el-input>
        </div>
        <div class="tabs">
          <div
            class="tab"
            :class="{active:activeName==='join'}"
            @click="handleTab('join')"
          >已加入({{this.joinList.length}})</div>
          <div
            class="tab"
            :class="{active:activeName==='waitJoin'}"
            @click="handleTab('waitJoin')"
          >未加入(0)</div>
        </div>
        <div class="list custom-scrollbar">
          <div
            class="list-item"
            v-for="(item,index) in joinList"
            :key="index"
          >
            <el-image
              class="el-image"
              :src="item.avatar"
            />
            <div class="info">
              <div class="name">{{item.name}}</div>
              <div class="grid-name">{{item.gridName}}</div>
            </div>
            <div class="edit">
              <div class="kick-out">移除</div>
              <div class="voice-button"></div>
            </div>
          </div>
        </div>
        <div
          class="video-self-content"
          v-if="gridMemberInfo.callType===1"
        >
          <div class="video-self-title">本地视频</div>
          <div
            class="video-self"
            id="me"
          />
        </div>
        <div
          class="mic-self-content"
          v-if="gridMemberInfo.callType===0"
        >
          <div
            class="mic-self"
            id="me"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const testGridMember = {
  address: '江西省南昌市青山湖区京东镇京安社区京安社区第七网格',
  createTime: null,
  gridCode: '360111100012007',
  gridName: '京安社区第七网格',
  id: '27641',
  idCard: '360111199111026041',
  imageUrl: 'http://172.11.16.88:10011/zzgrid/gridAdmin/2020/01/19/zzgrid-gridAdmin-92cec650feb346f085d03fb3c3b1bbc2.jpg',
  name: '胡雪娟',
  selected: false,
  sex: null,
  tel: '15079155973'
}
import {
  // selectByGridAdminClientById,
  transmission,
  notification
} from '@/api/intelligentCommand/command'
import TRTC from 'trtc-js-sdk'
import trtcCallConfig from '@/config/trtcCallConfig'
import checkTRTC from '@/utils/checkTRTC'
import { genTestUserSig } from '@/utils/GenerateTestUserSig'
let x = 0
let a = 0
let b = 0
let seconds = 0
let minus = 0
let hour = 0
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    gridMemberInfo: {
      type: Object,
      default: () => { }
    },
    clientId: {
      type: String,
      default: () => { }
    }
  },
  data() {
    return {
      master: null,
      activeName: 'join',
      joinList: [],
      waitJoinList: [],
      localCamera: true,
      localMic: true,
      client: null,
      localStream: null,
      roomId: 29108,
      userId: '8888',
      micTimer: '语音通话未接通',
      videoTimer: '视频通话未接通',
      setIntervalId: null,
      noHangupTransmission: false
    }
  },
  computed: {
    remoteStreams() {
      return []
    },
    comWidth() {
      if (this.joinList.length <= 4) {
        return 98 / 2 + '%'
      } else {
        return 98 / 3 + '%'
      }
      // return 98 / this.joinList.length + '%'
    },
    comHeight() {
      if (this.joinList.length <= 2) {
        return 98 + '%'
      } else if (this.joinList.length <= 6) {
        return 98 / 2 + '%'
      } else {
        return 98 / 3 + '%'
      }
    }
  },
  watch: {
    async visible(val) {
      if (val) {
        this.gridMemberInfo.divId = 'join' + this.gridMemberInfo['id']
        this.gridMemberInfo.camera = true
        this.gridMemberInfo.mic = true
        this.gridMemberInfo.fullscreen = true
        this.joinList.push(this.gridMemberInfo)
        this.joinList.push(testGridMember)
        this.joinList.push(testGridMember)
        this.joinList.push(testGridMember)
        this.joinList.push(testGridMember)
        this.joinList.push(testGridMember)
        this.joinList.push(testGridMember)
        this.joinList.push(testGridMember)
        // this.joinList.push(testGridMember)
        // await this.handleTransmission()
        // await this.createClient(this.userId)
        return val
      } else {
        // this.leaveRoom(this.client)
        this.joinList = []
      }
    },
    joinList(arr) {
      if (arr.length === 5 || arr.length === 7) {
        // this.joinList.push(...[{}, {}])
      } else if (arr.length === 3 || arr.length === 8) {
        this.joinList.push({})
      } else {
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    handleTab(flag) {
      this.activeName = flag
    },
    // 控制远端摄像头
    handleRemoteCamera(item) {
      const remoteStreamObj = this.remoteStreams.find((cur) => {
        return cur.divId === item.divId
      })
      const remoteStream = remoteStreamObj ? remoteStreamObj.remoteStream : null
      item.camera ? remoteStream.muteVideo() : remoteStream.unmuteVideo()
      item.camera = !item.camera
      let seleIndex = 0
      this.joinList.forEach((element, index) => {
        seleIndex = index
      })
      this.joinList.splice(seleIndex, 1, item)
    },
    // 控制远端麦克风
    handleRemoteMic(item) {
      const remoteStreamObj = this.remoteStreams.find((cur) => {
        return cur.divId === item.divId
      })
      const remoteStream = remoteStreamObj ? remoteStreamObj.remoteStream : null
      item.mic ? remoteStream.muteAudio() : remoteStream.unmuteAudio()
      item.mic = !item.mic
      let seleIndex = 0
      this.joinList.forEach((element, index) => {
        seleIndex = index
      })
      this.joinList.splice(seleIndex, 1, item)
    },
    handleLocalCamera() {
      this.localCamera
        ? this.localStream.muteVideo()
        : this.localStream.unmuteVideo()
      this.localCamera = !this.localCamera
    },
    handleLocalMic() {
      this.localCamera
        ? this.localStream.muteAudio()
        : this.localStream.unmuteAudio()
      this.localMic = !this.localMic
    },
    // 加入房间
    joinRoom(client, roomId) {
      client
        .join({ roomId })
        .catch((error) => {
          console.error('进房失败 ' + error)
        })
        .then(() => {
          console.log('进房成功')
          // 创建本地流
          this.createStream(this.userId, this.gridMemberInfo.callType)
          // 播放远端流
          this.playStream(this.client)
        })
    },
    // 创建本地音视频流
    createStream(userId, callType) {
      const localStream = TRTC.createStream({
        userId,
        audio: true,
        video: !!callType
      })
      this.localStream = localStream

      localStream
        .initialize()
        .catch((error) => {
          console.error('初始化本地流失败 ' + error)
        })
        .then(() => {
          console.log('初始化本地流成功')
          // 创建好后才能播放 本地流播放 local_stream 是div的id
          localStream.play('me')
          // 创建好后才能发布
          this.publishStream(localStream, this.client)
        })
    },
    // 发布本地音视频流
    publishStream(localStream, client) {
      client
        .publish(localStream)
        .catch((error) => {
          console.error('本地流发布失败 ' + error)
        })
        .then(() => {
          console.log('本地流发布成功')
        })
    },
    // 订阅远端流--加入房间之前
    subscribeStream(client) {
      client.on('stream-added', (event) => {
        const remoteStream = event.stream
        this.remoteStreams.push({
          divId: this.gridMemberInfo.divId,
          remoteStream: remoteStream
        })
        if (this.gridMemberInfo.callType === 1) {
          this.setIntervalId = setInterval(() => {
            this.beginS(this.gridMemberInfo.callType)
          }, 1000)
        }
        if (this.gridMemberInfo.callType === 0) {
          this.setIntervalId = setInterval(() => {
            this.beginS(this.gridMemberInfo.callType)
          }, 1000)
        }
        console.log('远端流增加: ' + remoteStream.getId())
        client.subscribe(remoteStream)
      })
    },
    // 播放远端流
    playStream(client) {
      client.on('stream-subscribed', (event) => {
        const remoteStream = event.stream
        console.log('远端流订阅成功：' + remoteStream.getId())
        remoteStream.play(this.gridMemberInfo.divId)
      })
    },
    // 退出音视频
    leaveRoom(client) {
      this.handleInitTimer()
      if (!client) return
      client
        .leave()
        .then(() => {
          console.log('退房成功')
          // 停止本地流，关闭本地流内部的音视频播放器
          this.localStream.stop()
          // 关闭本地流，释放摄像头和麦克风访问权限
          this.localStream.close()
          this.localStream = null
          this.client = null
          this.joinList = []
          this.$emit('update:visible', false)
          !this.noHangupTransmission ? this.handleHangupTransmission() : null
          this.noHangupTransmission = false
          // 退房成功，可再次调用client.join重新进房开启新的通话。
        })
        .catch((error) => {
          console.error('退房失败 ' + error)
          // 错误不可恢复，需要刷新页面。
        })
    },
    // 通话计时器
    beginS(type) {
      // 计算秒
      x++
      if (x < 10) {
        seconds = '0' + x
      } else if (x >= 10 && x <= 59) {
        seconds = x
      } else if (x > 59) {
        seconds = '00'
        x = 0
        a++
      }

      if (a < 10) {
        minus = '0' + a
      } else if (a >= 10 && a <= 59) {
        minus = a
      } else if (a > 59) {
        minus = '00'
        a = 0
        b++
      }

      if (b < 10) {
        hour = '0' + b
      } else if (b >= 10 && b <= 59) {
        hour = b
      }
      if (type === 1) {
        this.videoTimer = hour + ':' + minus + ':' + seconds
      }
      if (type === 0) {
        this.micTimer = hour + ':' + minus + ':' + seconds
      }
    },
    // 初始化计时器
    handleInitTimer() {
      x = 0
      a = 0
      b = 0
      this.micTimer = '语音通话未接通'
      this.videoTimer = '视频通话未接通'
      clearInterval(this.setIntervalId)
    },
    // 创建通话客户端
    async createClient(userId) {
      const resultBool = await checkTRTC()
      if (!resultBool) {
        return this.$message.error('该浏览器不支持webRTC')
      }
      this.client = TRTC.createClient({
        sdkAppId: trtcCallConfig.SDKAPPID,
        userId: userId,
        userSig: genTestUserSig(userId).userSig,
        mode: 'rtc'
      })

      // 注册远程监听，要放在加入房间前--这里用了发布订阅模式
      this.subscribeStream(this.client)
      // 监听
      this.client.on('peer-leave', (event) => {
        this.$message.warning(
          `网格员${this.gridMemberInfo.name}${this.gridMemberInfo.id}已挂断通话`
        )
        this.handleInitTimer()
        this.noHangupTransmission = true
      })
      // 初始化后才能加入房间
      this.joinRoom(this.client, this.roomId)
    },
    // 呼叫通知栏通知
    async handleNotification() {
      const params = { clientId: this.clientId }
      switch (this.gridMemberInfo.callType) {
        case 0:
          params.title = '语音会议'
          params.text = '昌治久安邀请您参议语音会议'
          break
        case 1:
          params.title = '视频会议'
          params.text = '昌治久安邀请您参议视频会议'
          break
        default:
          break
      }
      const { status } = await notification(params)
      if (status === 200) {
        console.log('通知栏消息发送成功')
      }
    },
    // 呼叫透传通知
    async handleTransmission() {
      this.master = {
        name: '市综治中心',
        callType: this.gridMemberInfo.callType
      }
      const { status, data } = await transmission({
        clientId: this.clientId,
        msg: JSON.stringify(this.master)
      })
      if (status === 200) {
        console.log('--------------单推成功回调', data)
      }
      this.handleNotification()
    },
    // 挂断透传通知
    async handleHangupTransmission() {
      this.master = {
        isHangup: true
      }
      const { status, data } = await transmission({
        clientId: this.clientId,
        msg: JSON.stringify(this.master)
      })
      if (status === 200) {
        console.log('--------------单推挂断成功回调', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-container {
  position: absolute;
}
.meeting-modal-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 1350px;
  height: 830px;
  background: url('~@/assets/image/comprehensive/popup-container.png') center
    center / 100% 100% no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-close {
  position: absolute;
  cursor: pointer;
  top: 30px;
  right: 40px;
  width: 20px;
  height: 20px;
  background: url('~@/assets/image/comprehensive/popup-close.png') center center /
    100% 100% no-repeat;
}
.video-content {
  position: absolute;
  top: 52px;
  left: 63px;
  width: 940px;
  height: 729px;
  background: rgba(24, 18, 0, 0.14);
  border: 1px solid #023d7b;
  .video-one {
    position: relative;
    width: 100%;
    height: 595px;
  }
  .video-view {
    width: 100%;
    height: 100%;
  }
  .edit-block {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 36px;
    padding: 0 16px;
    line-height: 36px;
    background: url('~@/assets/image/command/single_video_line.png') center
      center / 100% 100% no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      color: #a9daff;
      font-size: 18px;
      .icon {
        display: inline-block;
        margin-right: 10px;
      }
      .name {
        display: inline-block;
        margin-right: 10px;
      }
    }
    .edit {
      display: flex;
      align-items: center;
      .fullscreen,
      .camera,
      .mic {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 20px;
      }
      .fullscreen {
        background: url('~@/assets/image/command/edit_fullscreen_on.png') center
          center / 100% 100% no-repeat;
      }
      .camera {
        background: url('~@/assets/image/command/edit_carema_on.png') center
          center / 100% 100% no-repeat;
      }
      .mic {
        background: url('~@/assets/image/command/edit_mic_on.png') center center /
          100% 100% no-repeat;
      }
      .fullscreen-none {
        background: url('~@/assets/image/command/edit_fullscreen_off.png')
          center center / 100% 100% no-repeat;
      }
      .camera-none {
        background: url('~@/assets/image/command/edit_carema_off.png') center
          center / 100% 100% no-repeat;
      }
      .mic-none {
        background: url('~@/assets/image/command/edit_mic_off.png') center
          center / 100% 100% no-repeat;
      }
    }
  }
  .hangup-block {
    width: 100%;
    height: 134px;
    .time-record {
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #a9daff;
      line-height: 56px;
    }
    .edit {
      margin: 0 auto;
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .mic,
    .hangup,
    .camera {
      cursor: pointer;
      width: 42px;
      height: 42px;
    }
    .mic {
      background: url('~@/assets/image/command/video_voice_on.png') center
        center / 100% 100% no-repeat;
    }
    .mic-none {
      background: url('~@/assets/image/command/video_voice_off.png') center
        center / 100% 100% no-repeat;
    }
    .hangup {
      background: url('~@/assets/image/command/video_ring _off.png') center
        center / 100% 100% no-repeat;
    }
    .camera {
      background: url('~@/assets/image/command/video_on_camera.png') center
        center / 100% 100% no-repeat;
    }
    .camera-none {
      background: url('~@/assets/image/command/video_off_camera.png') center
        center / 100% 100% no-repeat;
    }
  }
  .video-many {
    position: relative;
    width: 100%;
    padding: 0 7px;
    height: 595px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .video-number {
    background-color: #000;
  }
}
.mic-content {
  position: absolute;
  top: 52px;
  left: 63px;
  width: 940px;
  height: 729px;
  background: rgba(24, 18, 0, 0.14);
  border: 1px solid #023d7b;
  .mic-content-bg {
    margin: 188px 0 104px 173px;
    width: 595px;
    height: 225px;
    background: url('~@/assets/image/command/mic_content_bg.png') center center /
      100% 100% no-repeat;
  }
  .hangup-block {
    width: 100%;
    .time-record {
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #a9daff;
      line-height: 56px;
    }
    .edit {
      margin: 60px auto;
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      // justify-content: space-between;
    }
    .mic,
    .hangup,
    .camera {
      cursor: pointer;
      width: 42px;
      height: 42px;
    }
    .mic {
      background: url('~@/assets/image/command/video_voice_on.png') center
        center / 100% 100% no-repeat;
    }
    .mic-none {
      background: url('~@/assets/image/command/video_voice_off.png') center
        center / 100% 100% no-repeat;
    }
    .hangup {
      background: url('~@/assets/image/command/video_ring _off.png') center
        center / 100% 100% no-repeat;
    }
  }
}
.member-list {
  position: absolute;
  top: 52px;
  right: 81px;
  width: 256px;
  height: 728px;
  background: url('~@/assets/image/command/met_mod_col.png') center center /
    100% 100% no-repeat;
  .list {
    margin: 18px auto 0;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 92%;
    height: 400px;
    .list-item {
      width: 220px;
      height: 90px;
      margin: 9px 0;
      padding: 15px 12px;
      display: flex;
      justify-content: space-around;
      background: url('~@/assets/image/command/audio_member_bg.png') center
        center / 100% 100% no-repeat;
    }
    .el-image {
      width: 45px;
      height: 60px;
    }
    .info {
      width: 64px;
      color: #a9daff;
      .name {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .grid-name {
        line-height: 16px;
        font-size: 12px;
      }
    }
    .edit {
      // width: 50px;
      .kick-out {
        cursor: pointer;
        text-align: center;
        width: 50px;
        height: 20px;
        line-height: 18px;
        background: rgba(45, 125, 205, 0.16);
        border: 1px solid #3b9afe;
        border-radius: 10px;
        color: #fff;
      }
      .voice-button {
        cursor: pointer;
        margin: 15px 0 0 20px;
        width: 20px;
        height: 20px;
        background: url('~@/assets/image/command/audio_member_on.png') center
          center / 100% 100% no-repeat;
      }
    }
  }
  .video-self-title {
    text-align: center;
    margin: 30px auto 10px;
    width: 186px;
    height: 8px;
    background: url('~@/assets/image/command/single_video_title.png') center
      center / 100% 100% no-repeat;
    font-size: 14px;
    font-weight: bold;
    color: #a9daff;
    line-height: 8px;
  }
  .video-self {
    margin: 0 auto;
    width: 216px;
    height: 137px;
    background: url('~@/assets/image/command/single_video_self.png') center
      center / 100% 100% no-repeat;
  }
}
.search-block {
  margin: 0 6px;
  width: 95%;
  margin-top: 35px;
}
.tabs {
  margin: 10px 6px 0;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  .tab {
    flex: 0.5;
    cursor: pointer;
    text-align: center;
    font-weight: 400;
    color: #3b9afe;
    // line-height: 28px;
    padding-bottom: 5px;
    border-bottom: 1px solid #023d7b;
    &.active {
      color: #a9daff;
      border-bottom: 1px solid #a9daff;
    }
  }
}
</style>

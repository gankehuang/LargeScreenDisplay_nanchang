<template>
  <div
    v-if="visible"
    class="single-meeting-modal"
  >
    <div
      class="popup-close"
      @click="close"
    ></div>
    <div
      style="visibility: hidden;width:0;height:0;"
      id="me"
    ></div>
    <div
      v-if="gridMemberInfo.callType===1"
      class="video-content"
      style="width:100%;height:100%"
    >
      <div
        :id="gridMemberInfo.divId"
        :ref="gridMemberInfo.divId"
        style="width:100%;height:80%"
      />
      <div class="time-record">
        {{ videoTimer }}
      </div>
      <div class="edit-block">
        <div class="info">
          <svg-icon
            icon-class="population-people"
            class="icon"
          />
          <span class="name">{{ gridMemberInfo.name }}</span>
          <span class="name">专职网格员</span>
        </div>
        <div class="edit">
          <div
            class="fullscreen"
            @click="handleFullScreen"
            :class="{'fullscreen-none':!gridMemberInfo.fullscreen }"
          />
          <div
            class="camera"
            :class="{'camera-none':!gridMemberInfo.camera }"
            @click="handleRemoteCamera(gridMemberInfo)"
          />
          <div
            class="mic"
            :class="{'mic-none':!gridMemberInfo.mic }"
            @click="handleRemoteMic(gridMemberInfo)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="gridMemberInfo.callType===0"
      class="audio-content"
    >
      <div class="mic-content-bg" />
      <div
        :id="gridMemberInfo.divId"
        style="visibility: hidden;"
      />
      <div class="time-record">
        {{ micTimer }}
      </div>
    </div>
  </div>
</template>

<script>
import {
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
  data () {
    return {
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
    remoteStreams () {
      return []
    }
  },
  watch: {
    async visible (bool) {
      if (bool) {
        this.gridMemberInfo.divId = 'join' + this.gridMemberInfo.id
        this.gridMemberInfo.camera = true
        this.gridMemberInfo.mic = true
        this.gridMemberInfo.fullscreen = true
        console.log('---------------', this.gridMemberInfo)
        await this.handleTransmission()
        await this.createClient(this.userId)
      } else {
        this.leaveRoom(this.client)
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    // Dom全屏操作
    handleFullScreen() {
      const girMemRef = this.$refs[this.gridMemberInfo.divId]

      girMemRef.requestFullscreen().then((res) => {
      }, () => {
        this.$message.error('该浏览器不支持全屏api')
      })
    },
    // 控制远端摄像头
    handleRemoteCamera (item) {
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
    handleRemoteMic (item) {
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
    // 加入房间
    joinRoom (client, roomId) {
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
    createStream (userId, callType) {
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
    publishStream (localStream, client) {
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
    subscribeStream (client) {
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
    playStream (client) {
      client.on('stream-subscribed', (event) => {
        const remoteStream = event.stream
        console.log('远端流订阅成功：' + remoteStream.getId())
        remoteStream.play(this.gridMemberInfo.divId)
      })
    },
    // 退出音视频
    leaveRoom (client) {
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
    beginS (type) {
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
    handleInitTimer () {
      x = 0
      a = 0
      b = 0
      this.micTimer = '语音通话未接通'
      this.videoTimer = '视频通话未接通'
      clearInterval(this.setIntervalId)
    },
    // 创建通话客户端
    async createClient (userId) {
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
    async handleNotification () {
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
    async handleTransmission () {
      const master = {
        name: '市综治中心',
        callType: this.gridMemberInfo.callType
      }
      const { status, data } = await transmission({
        clientId: this.clientId,
        msg: JSON.stringify(master)
      })
      if (status === 200) {
        console.log('--------------单推成功回调', data)
      }
      this.handleNotification()
    },
    // 挂断透传通知
    async handleHangupTransmission () {
      const master = {
        isHangup: true
      }
      const { status, data } = await transmission({
        clientId: this.clientId,
        msg: JSON.stringify(master)
      })
      if (status === 200) {
        console.log('--------------单推挂断成功回调', data)
      }
    }
  }
}
</script>

<style lang="scss">
.single-meeting-modal {
  position: absolute;
  top: 0px;
  left: 0;
  width: 400px;
  height: 300px;
  z-index: 1000;
  background-color: #000;
}
.popup-close {
  position: absolute;
  cursor: pointer;
  z-index: 1000;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: url('~@/assets/image/comprehensive/popup-close.png') center center /
    100% 100% no-repeat;
}
.video-content {
  .time-record {
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #a9daff;
    line-height: 18px;
  }
  .edit-block {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 36px;
    padding: 0 16px;
    line-height: 36px;
    background: url('~@/assets/image/command/video_line_block.png') center
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
}
.audio-content {
  .mic-content-bg {
    margin: 40px 0 0 -90px;
    width: 595px;
    height: 225px;
    transform: scale(0.5);
    background: url('~@/assets/image/command/mic_content_bg.png') center center /
      100% 100% no-repeat;
  }
  .time-record {
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #a9daff;
    line-height: 18px;
  }
}
</style>

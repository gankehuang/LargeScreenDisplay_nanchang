<template>
  <div class="modal">
    <div class="title">语音对讲</div>
    <div class="body">
      <img src="@/assets/image/command/voice.png" class="img-title" />
      <button class="btn-talk" @mousedown="startTalking">
        <img src="@/assets/image/command/talk.png" />
        <span>按住呼叫</span>
      </button>
      <button class="btn-stop" @click="bindBtnClose">结束对讲</button>
      <p class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import Call from '@/utils/call.js'
export default {
  props: {
    voiceIds: Array
  },
  data() {
    return {
      call: new Call(0),
      callStatus: 0,
      message: ''
    }
  },
  mounted() {
    this.initTalk()
    window.addEventListener('mouseup', this.stopTalking)
    window.addEventListener('keydown', this.bindSpaceKeyDown)
    window.addEventListener('keyup', this.bindSpaceKeyUp)
  },
  beforeDestroy() {
    this.call.unlink()
    window.removeEventListener('mouseup', this.stopTalking)
    window.removeEventListener('keydown', this.bindSpaceKeyDown)
    window.removeEventListener('keyup', this.bindSpaceKeyUp)
  },
  methods: {
    bindSpaceKeyDown(e) {
      if (e.keyCode === 32) {
        this.startTalking()
      }
    },
    bindSpaceKeyUp(e) {
      if (e.keyCode === 32) {
        this.stopTalking()
      }
    },
    async initTalk() {
      try {
        this.message = '初始化...'
        await this.call.checkPlugin()
        this.message = '正在连接设备...'
        await this.call.link(this.voiceIds)
        this.message = '设备连接成功,按住按钮开始呼叫'
        this.callStatus = 1
      } catch (error) {
        this.message = error
      }
    },
    startTalking() {
      if (!this.callStatus) return false
      this.call.startTalking()
    },
    stopTalking() {
      if (!this.callStatus) return false
      this.call.stopTalking()
    },
    bindBtnClose() {
      this.$emit('bindBtnClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: url("~@/assets/image/command/modal-voice.png");
  width: 531px;
  height: 505px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 12px 7px 6px 6px;
  .btn-close {
    position: absolute;
    top: 23px;
    right: 27px;
    cursor: pointer;
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
    border-bottom: 1px solid #0b61a0;
  }
  .body {
    height: calc(100% - 36px);
    width: 100%;
    padding: 18px 23px;
    text-align: center;
    .btn-talk {
      display: block;
      margin: 15px auto 25px auto;
      color: #0fffff;
      width: 207px;
      height: 32px;
      text-align: center;
      background-color: transparent;
      background-image: url("~@/assets/image/command/btn-talk-bg.png");
      background-size: 145%;
      background-repeat: no-repeat;
      background-position: 50% 100%;
      outline: none;
      border: none;
      cursor: pointer;
      &:active {
        background-image: url("~@/assets/image/command/btn-talk-bg_active.png");
      }
      img {
        margin-right: 10px;
        vertical-align: bottom;
      }
    }
    .message {
      color: #fff;
      margin-top: 15px;
    }
  }
}

.btn-stop {
  background: url("~@/assets/image/command/submit-btn.png");
  width: 104px;
  height: 38px;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
}
</style>

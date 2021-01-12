<template>
  <div class="modal">
    <div class="title">远程视频</div>
    <img
      class="btn-close"
      src="@/assets/image/common/close-btn.png"
      @click="bindBtnClose"
    />
    <div class="body">
      <div class="player" v-loading="loading">
        <RtmpPlayer :src="src" v-if="src" :mute="mute" />
        <div class="monitor-control">
          <div class="btn-timer">
            <span @click="switchTimerUl">增加时长</span>
            <ul class="ul" v-show="timerUl">
              <li class="li" @click="switchTimer(10)">10分钟</li>
              <li class="li" @click="switchTimer(30)">30分钟</li>
              <li class="li" @click="switchTimer(60)">60分钟</li>
              <li class="li" @click="switchTimer(90)">90分钟</li>
            </ul>
          </div>
          <div class="btn-definition">
            <span @click="switchDefinitionUl">{{ definition }}</span>
            <ul class="ul" v-show="definitionUl">
              <li
                class="li"
                :class="definition === '流畅' && 'active'"
                @click="switchDefinition('流畅')"
              >
                流畅
              </li>
              <li
                class="li"
                :class="definition === '高清' && 'active'"
                @click="switchDefinition('高清')"
              >
                高清
              </li>
              <li
                class="li"
                :class="definition === '超清' && 'active'"
                @click="switchDefinition('超清')"
              >
                超清
              </li>
            </ul>
          </div>
          <img
            src="@/assets/image/command/volume-on.png"
            v-if="!mute"
            class="btn-mute"
            @click="switchMute"
          />
          <img
            src="@/assets/image/command/volume-off.png"
            v-else
            class="btn-mute"
            @click="switchMute"
          />
        </div>
      </div>
      <div class="control">
        <div>
          本次监控
          <span>{{ totalTime | formatTime }}</span
          >,剩余
          <span>{{ (totalTime - playedTime) | formatTime }}</span>
        </div>
        <button @click="bindBtnClose">结束</button>
      </div>
    </div>
  </div>
</template>

<script>
import RtmpPlayer from '@/components/RtmpPlayer'
import {
  openVideo,
  stopVideo,
  changeDeinition,
  changeMaxTimer
} from '@/api/intelligentCommand/command'
export default {
  props: ['userId'],
  components: {
    RtmpPlayer
  },
  data() {
    return {
      totalTime: 1000 * 60 * 10,
      playedTime: 0,
      timer: null,
      stayTimer: 0,
      src: '',
      mute: false,
      timerUl: false,
      definitionUl: false,
      definition: '流畅',
      loading: false
    }
  },
  filters: {
    formatTime(time) {
      let theTime = parseInt(time / 1000) // 秒
      let middle = 0 // 分
      let hour = 0 // 小时
      let result = ''

      if (theTime > 60) {
        middle = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (middle > 60) {
          hour = parseInt(middle / 60)
          middle = parseInt(middle % 60)
        }
      }

      if (theTime > 0) {
        result = '' + parseInt(theTime) + '秒'
      }
      if (middle > 0) {
        if (theTime > 0) {
          result = '' + parseInt(middle) + '分' + result
        } else {
          result = '' + parseInt(middle) + '分钟'
        }
      }
      if (hour > 0) {
        if (theTime > 0 || middle > 0) {
          result = '' + parseInt(hour) + '小时' + result
        }
      }
      return result
    }
  },
  methods: {
    bindBtnClose() {
      this.$emit('bindBtnClose')
    },
    startTimer() {
      if (this.totalTime - this.playedTime <= 0) {
        this.bindBtnClose()
      }
      this.timer = setTimeout(() => {
        this.playedTime += 1000
        this.startTimer()
      }, 1000)
    },
    switchMute() {
      this.mute = !this.mute
    },
    switchTimerUl() {
      this.timerUl = !this.timerUl
    },
    switchTimer(timer) {
      this.totalTime += 1000 * 60 * timer
      this.timerUl = false
      changeMaxTimer(timer * 60, this.userId)
    },
    switchDefinitionUl() {
      this.definitionUl = !this.definitionUl
    },
    switchDefinition(definition) {
      if (this.definition === definition) return
      this.definition = definition
      this.definitionUl = false
      if (definition === '流畅') {
        changeDeinition(1, this.userId)
      } else if (definition === '高清') {
        changeDeinition(2, this.userId)
      } else if (definition === '超清') {
        changeDeinition(3, this.userId)
      }
    }
  },
  async mounted() {
    this.loading = true
    const res = await openVideo(this.userId)
    this.src = res.url
    this.loading = false
    this.startTimer()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    stopVideo(this.userId)
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: url("~@/assets/image/command/modal-video.png");
  width: 711px;
  height: 528px;
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
    overflow: hidden;

    .control {
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      div {
        width: 300px;
        span {
          color: #0ff;
        }
      }
      button {
        width: 48px;
        height: 48px;
        background-color: #ff2a2a;
        border: none;
        outline: none;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        border-radius: 48px;
      }
      .timer {
        text-align: right;
      }
    }
  }
}

.player {
  width: 100%;
  height: 366px;
  position: relative;
  overflow: hidden;
  .video {
    width: 658px;
    height: 366px;
    margin: 20px auto;
    position: relative;
    z-index: 2;
  }
  .monitor-control {
    height: 34px;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    color: #fff;
    position: absolute;
    z-index: 3;
    bottom: 0;
    display: flex;
    align-items: center;
    .btn-timer {
      margin-left: 20px;
      margin-right: 480px;
      cursor: pointer;
      position: relative;
      .ul {
        background-color: #000;
        position: absolute;
        bottom: 10px;
        list-style: none;
        padding: 0;
        border: #0b61a0 1px solid;
        border-radius: 2px;
        .li {
          padding: 5px 7px;
          border-bottom: #0b61a0 1px solid;
          font-size: 12px;
        }
        .li:nth-last-of-type(1) {
          border-bottom: none;
        }
      }
    }
    .btn-definition {
      margin-right: 36px;
      cursor: pointer;
      position: relative;
      .ul {
        background-color: #000;
        position: absolute;
        bottom: 10px;
        left: -8px;
        list-style: none;
        padding: 0;
        border: #0b61a0 1px solid;
        border-radius: 2px;
        width: 40px;
        .li {
          padding: 5px 7px;
          border-bottom: #0b61a0 1px solid;
          font-size: 12px;
          &.active {
            color: #00ffff;
          }
        }
        .li:nth-last-of-type(1) {
          border-bottom: none;
        }
      }
    }
    .btn-mute {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="monitor" @click.self="$emit('click')">
    <div class="player" v-if="userId">
      <RtmpPlayer :src="src" v-if="src" :mute="mute" />
      <img
        src="@/assets/image/common/close-btn.png"
        class="btn-close"
        @click="stopMonitor"
      />
      <div class="player-control">
        <div class="call" @click="startTalk" v-if="isTalking === 0">
          <img src="@/assets/image/command/multi_voice.png" />
          连线
        </div>
        <div class="call" @click="stopTalk" v-else-if="isTalking === 1">
          <img src="@/assets/image/command/multi_voice_active.png" />
          请求中...
        </div>
        <div class="call" @click="stopTalk" v-else-if="isTalking === 2">
          <img src="@/assets/image/command/multi_voice_active.png" />
          已连接
        </div>
        <div class="control-right">
          <div class="btn-timer">
            <span @click="switchTimerUl">增加时长</span>
            <ul class="ul" v-show="timerUl">
              <li class="li" @click="addTime(10)">10分钟</li>
              <li class="li" @click="addTime(30)">30分钟</li>
              <li class="li" @click="addTime(60)">60分钟</li>
              <li class="li" @click="addTime(90)">90分钟</li>
            </ul>
          </div>
          <div class="time">
            {{ stayTime | formatTime }} / {{ totalTime | formatTime }}
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
    </div>
    <div class="monitor-empty" v-else>请选择播放设备</div>
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
  components: {
    RtmpPlayer
  },
  props: {
    userId: Number
  },
  data() {
    return {
      src: '',
      mute: true,
      timerUl: false,
      definitionUl: false,
      definition: '流畅',
      isTalking: 0, // 0未连接 1连接中 2已连接
      totalTime: 10 * 60, // 总播放时长
      stayTime: 0, // 已经播放时长
      timer: null // 计时器
    }
  },
  filters: {
    formatTime(time) {
      const s = (time % 60).toString()
      const m = ((time - s) / 60).toString()
      return `${m.padStart(2, 0)}:${s.padStart(2, 0)}`
    }
  },
  watch: {
    userId() {
      this.openMonitor()
    }
  },
  methods: {
    async openMonitor() {
      if (!this.userId) return false
      const res = await openVideo(this.userId)
      this.startTimer()
      this.src = res.url
    },
    async stopMonitor() {
      await stopVideo(this.userId)
      this.$emit('beforeDestroy')
      this.clearTimer()
      this.startTalk()
      this.src = ''
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
    },
    switchMute() {
      this.mute = !this.mute
    },
    switchTimerUl() {
      this.timerUl = !this.timerUl
    },
    addTime(time) {
      this.totalTime += time * 60
      this.timerUl = false
      changeMaxTimer(time * 60, this.userId)
    },
    async startTalk() {
      this.isTalking = 1
      await this.$parent.addTalker(this.userId)
      this.isTalking = 2
    },
    async stopTalk() {
      this.isTalking = 1
      await this.$parent.removeTalker(this.userId)
      this.isTalking = 0
    },
    startTimer() {
      if (this.stayTime < this.totalTime) {
        this.stayTime += 1
        this.timer = setTimeout(() => this.startTimer(), 1000)
      }
    },
    clearTimer() {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor {
  background-color: #000000;
  border: 1px solid #53818c;
  text-align: center;
  overflow: hidden;
  .monitor-empty {
    font-size: 14px;
    color: #ccc;
    margin-top: 20%;
  }
  .player {
    width: 100%;
    height: 100%;
    position: relative;
    &:hover .player-control {
      transform: translateY(0);
      visibility: visible;
    }
    .btn-close {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 2;
    }
    .player-control {
      height: 34px;
      width: 100%;
      padding: 0 10px;
      color: #fff;
      position: absolute;
      z-index: 3;
      bottom: 0;
      display: flex;
      align-items: center;
      visibility: hidden;
      justify-content: space-between;
      transform: translateY(30px);
      .call {
        cursor: pointer;
        img {
          margin-right: 2px;
        }
      }
      .control-right {
        display: flex;

        .btn-timer {
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
        .time {
          margin-left: 5px;
          margin-right: 15px;
        }
        .btn-definition {
          margin-right: 15px;
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
  }
}
</style>

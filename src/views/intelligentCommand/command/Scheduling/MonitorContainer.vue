<template>
  <div class="container">
    <div class="monitors" :class="'grid' + gridType">
      <scheduling-monitor
        class="item"
        v-show="index < gridType"
        v-for="(userId, index) in playingList"
        :class="activeIndex === index && 'active'"
        :key="index"
        :userId="userId"
        @click="activeIndex = index"
        @beforeDestroy="stopPlay(index)"
      />
    </div>
    <div class="control">
      <div class="grid-types">
        <img
          :src="gridType === 1 ? gridPngActive1 : gridPng1"
          class="grid-type"
          @click="gridType = 1"
        />
        <img
          :src="gridType === 4 ? gridPngActive4 : gridPng4"
          class="grid-type"
          @click="gridType = 4"
        />
        <img
          :src="gridType === 9 ? gridPngActive9 : gridPng9"
          class="grid-type"
          @click="gridType = 9"
        />
        <img
          :src="gridType === 16 ? gridPngActive16 : gridPng16"
          class="grid-type"
          @click="gridType = 16"
        />
      </div>
      <div class="talk" :class="talking && 'active'">
        <img src="@/assets/image/command/talk.png" />
        <span @mousedown="startTalk">按住呼叫</span>
      </div>
      <div style="width:150px"></div>
    </div>
  </div>
</template>

<script>
import gridPng1 from '@/assets/image/command/grid1.png'
import gridPng4 from '@/assets/image/command/grid4.png'
import gridPng9 from '@/assets/image/command/grid9.png'
import gridPng16 from '@/assets/image/command/grid16.png'
import gridPngActive1 from '@/assets/image/command/grid1_active.png'
import gridPngActive4 from '@/assets/image/command/grid4_active.png'
import gridPngActive9 from '@/assets/image/command/grid9_active.png'
import gridPngActive16 from '@/assets/image/command/grid16_active.png'

import SchedulingMonitor from './SchedulingMonitor'

import Call from '@/utils/call.js'

export default {
  props: {
    list: Array,
    playingIds: Array,
    talkingIds: Array
  },
  components: {
    SchedulingMonitor
  },
  data() {
    return {
      gridType: 4,
      gridPng1,
      gridPng4,
      gridPng9,
      gridPng16,
      gridPngActive1,
      gridPngActive4,
      gridPngActive9,
      gridPngActive16,
      activeIndex: null,
      playingList: new Array(16).fill(0),
      call: new Call(0),
      talking: false
    }
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.stopTalk)
    window.removeEventListener('keydown', this.bindSpaceKeyDown)
    window.removeEventListener('keyup', this.bindSpaceKeyUp)
    this.call.unlink()
    this.talkingIds.forEach(id => {
      this.$emit('stopTalking', id)
    })
  },
  mounted() {
    window.addEventListener('mouseup', this.stopTalk)
    window.addEventListener('keydown', this.bindSpaceKeyDown)
    window.addEventListener('keyup', this.bindSpaceKeyUp)
  },
  methods: {
    bindSpaceKeyDown(e) {
      if (e.keyCode === 32) {
        this.startTalk()
      }
    },
    bindSpaceKeyUp(e) {
      if (e.keyCode === 32) {
        this.stopTalk()
      }
    },
    startPlay(id) {
      if (this.activeIndex) {
        this.playingList.splice(this.activeIndex, 1, id)
      } else {
        const emptyContainerIndex = this.playingList.findIndex(item => !item)
        this.playingList.splice(emptyContainerIndex, 1, id)
        if (emptyContainerIndex === -1) {
          this.$message('以达到最大同时播放数限制,请选择替换窗口')
        } else if (emptyContainerIndex < 4) {
          this.gridType = 4
        } else if (emptyContainerIndex < 9) {
          this.gridType = 9
        } else if (emptyContainerIndex < 16) {
          this.gridType = 16
        }
      }
    },
    async stopPlay(index) {
      const [id] = this.playingList.splice(index, 1, 0)
      this.$emit('stopPlay', id)
    },
    switchGridType(gridType) {
      if (this.activeIndex >= gridType) {
        this.activeIndex = null
      }
      this.gridType = gridType
    },
    async initTalk(id) {
      try {
        await this.call.checkPlugin()
        await this.call.link([id])
      } catch (error) {
        this.$message(error)
      }
    },
    async addTalker(id) {
      if (this.talkingIds.length) {
        await this.call.addMembers([id])
      } else {
        await this.initTalk(id)
      }
      this.$emit('addTalker', id)
    },
    async removeTalker(id) {
      await this.call.removeMembers([id])
      this.$emit('removeTalker', id)
      if (!this.talkingIds.length) {
        this.call.unlink()
      }
    },
    startTalk() {
      if (!this.talkingIds.length || this.talking) return false
      this.talking = true
      this.call.startTalking()
    },
    stopTalk() {
      if (!this.talkingIds.length || !this.talking) return false
      this.talking = false
      this.call.stopTalking()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-left: 10px;
  flex-grow: 1;
  height: 98.85%;
  border: 1px solid rgba(83, 129, 140, 1);
  background-color: #03223c;
  padding: 20px;
  .monitors {
    width: 100%;
    height: 740px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item.active {
      border-color: yellow;
    }
  }
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .grid-types {
      display: flex;
      .grid-type {
        margin-right: 20px;
        cursor: pointer;
      }
    }
    .talk {
      user-select: none;
      font-size: 14px;
      color: #0ff;
      background-image: url("~@/assets/image/command/btn-talk-bg.png");
      background-repeat: no-repeat;
      background-position: bottom;
      height: 30px;
      width: 200px;
      text-align: center;
      cursor: pointer;
      &:active,
      &.active {
        background-image: url("~@/assets/image/command/btn-talk-bg_active.png");
      }
      img {
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
}

.grid1 .item {
  width: 100%;
  height: 100%;
}
.grid4 .item {
  width: 49.5%;
  height: 49%;
}
.grid9 .item {
  width: 33%;
  height: 32.6%;
}
.grid16 .item {
  width: 24.8%;
  height: 24%;
}
</style>

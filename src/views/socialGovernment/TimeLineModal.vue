<template>
  <div
    v-if="visible"
    class="time-line-container"
  >
    <div
      class="close"
      @click="close"
    />
    <el-scrollbar style="height: 800px;margin: 20px 46px 0 48px;">
      <div class="time-first" />
      <div
        v-for="(item, index) in list"
        :key="index"
        class="time-first-block"
      >
        <div class="line" />
        <div class="time-node-title">
          <div class="time">
            {{ item.time }}
          </div>
          <div class="node" />
          <div class="title">
            {{ item.title }}
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            {{ item.info }}
          </div>
        </div>
        <div
          class="image-node"
          :class="{ none: !item.imageUrl }"
        >
          <div class="node" />
          <el-image
            :src="item.imageUrl"
            :preview-src-list="[item.imageUrl]"
            class="el-image"
          />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { nanChangBigEvent, raws } from './mock'
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: []
    }
  },
  watch: {
    visible (visible) {
      if (visible) {
        this.handleValue()
      }
    }
  },
  mounted () {},
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    handleValue () {
      switch (this.value) {
        case 'dwzs':
          this.list = nanChangBigEvent
          break
        case 'flzygtt':
          this.list = raws
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-scrollbar__view {
  display: block !important;
  padding: 0 5px;
}
.time-line-container {
  width: 100%;
  height: 876px;
  position: absolute;
  top: -68px;
  left: 0;
  //   padding: 20px 46px 0 48px;
  z-index: 2001;
  background: url("~@/assets/image/socialGovernment/popup_right_bg.png") center
    center / 100% 100% no-repeat;
}
.close {
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 55px;
  right: 25px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}
.time-first {
  position: relative;
  width: 87px;
  height: 208px;
  margin: 20px 0 0 52px;
  z-index: 1;
  background: url("~@/assets/image/socialGovernment/time_line_modal(1).png")
    center center / 100% 100% no-repeat;
}
.time-first-block {
  width: 100%;
  height: 100%;
  color: #a9daff;
  margin: 0 0 20px;
  position: relative;
  top: -80px;
  .line {
    position: absolute;
    top: 20px;
    left: 95px;
    width: 3px;
    height: 150%;
    background: #228de0;
  }
  .time-node-title {
    display: flex;
    position: relative;
    z-index: 1;
    line-height: 28px;
    margin-bottom: 30px;
    padding-right: 15px;
    .time,
    .title {
      white-space: pre-line;
      font-weight: bold;
    }
    .time {
      width: 90px;
    }
    .title {
      width: 400px;
      font-size: 16px;
      color: #3beefe;
    }
    .node {
      width: 26px;
      height: 26px;
      position: relative;
      right: 4px;
      margin: 0 10px 0 0;
      background: url("~@/assets/image/socialGovernment/time_line_modal(4).png")
        center center / 100% 100% no-repeat;
    }
  }
  .info-node {
    display: flex;
    position: relative;
    z-index: 1;
    margin-bottom: 30px;
    padding-right: 15px;
    .node {
      width: 15px;
      height: 15px;
      margin: 0 20px 0 89px;
      background: url("~@/assets/image/socialGovernment/time_line_modal(3).png")
        center center / 100% 100% no-repeat;
    }
    .info {
      width: 400px;
      font-size: 14px;
      line-height: 24px;
    }
  }
  .image-node {
    display: flex;
    position: relative;
    z-index: 10;
    margin-bottom: 30px;
    padding-right: 15px;
    .node {
      width: 15px;
      height: 15px;
      margin: 80px 20px 0 89px;
      background: url("~@/assets/image/socialGovernment/time_line_modal(3).png")
        center center / 100% 100% no-repeat;
    }
    .el-image {
      width: 260px;
      height: 173px;
      background: url("~@/assets/image/socialGovernment/time_line_modal(5).png")
        center center / 100% 100% no-repeat;
    }
  }
  .none {
    display: none;
  }
}
</style>

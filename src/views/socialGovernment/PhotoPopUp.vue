<template>
  <div class="time-line-container" v-if="visible">
    <div class="close" @click="close"></div>
    <div class="sidebarList">
      <div
        :class="['sidebarOne', { currentOne: currentIndex === index }]"
        v-for="(item, index) in cityTitle"
        :key="index"
        @click="sidebarClick(index, item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="time-first" />
    <div class="time-first-block">
      <div class="line" />
      <div class="time-node-title">
        <div class="node" />
        <div class="title">政府跨部门办案平台</div>
      </div>
      <div class="info-node">
        <div class="node" />
        <div class="info">
          <el-image
            :src="require('@/assets/image/dataView/zfkbm.jpg')"
            :preview-src-list="[require('@/assets/image/dataView/zfkbm.jpg')]"
          >
          </el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nanChangBigEvent, raws } from './mock'
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }
    // value: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {
      cityTitle: ['政府跨部门办案平台'],
      currentIndex: 0
    }
  },
  mounted() {},
  watch: {
    visible(newVal) {
      if (newVal) {
        this.currentIndex = 0
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    sidebarClick(index, item) {
      this.currentIndex = index
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
  .sidebarList {
    position: absolute;
    z-index: 200;
    top: 115px;
    left: 30px;
    .sidebarOne {
      cursor: pointer;
      margin-top: 10px;
      width: 46px;
      height: 160px;
      background: url("~@/assets/image/socialGovernment/Sidebar.png") center
        center / 100% 100% no-repeat;
      writing-mode: vertical-lr;
      text-align: center;
      line-height: 46px;
      font-size: 16px;
      font-weight: 400;
      color: #a9daff;
    }
    .currentOne {
      background: url("~@/assets/image/socialGovernment/SidebarOn.png") center
        center / 100% 100% no-repeat;
      font-weight: bold;
    }
  }
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
    height: 27%;
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

    .title {
      margin-left: 85px;
      width: 400px;
      font-size: 16px;
      color: #3beefe;
    }
    .node {
      width: 26px;
      height: 26px;
      position: relative;
      left: 82px;
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
      span {
        color: #00ffff;
        font-size: 14px;
      }
    }
    .img-list {
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      .el-image {
        margin-top: 10px;
        width: 30%;
        height: 100px;
      }
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
  }
  .none {
    display: none;
  }
}
.el-image {
  // margin: 20% auto 0;
  width: 80%;
}
</style>

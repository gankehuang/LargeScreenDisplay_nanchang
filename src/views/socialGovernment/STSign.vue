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
    <el-scrollbar
      style="height: 800px;margin: 20px 46px 0 48px;"
      v-if="value === 'CitySTSign' ? true : false"
      ref="elscrollbar"
    >
      <div class="time-first" />
      <div class="time-first-block">
        <div class="line" />
        <div class="time-node-title" ref="blockScroll1">
          <div class="node" />
          <div class="title">城市大脑</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">投资额：约<span>1.8亿</span></div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            数据量：实现<span>20多亿</span>条数据的共享协同
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            打通部门数：打通<span>53</span>个市直部门、<span>11</span>个省直部门
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            六大应用场景：
            <div class="img-list">
              <div class="list-one">
                <el-image
                  :src="
                    require('@/assets/image/socialGovernment/交通不限行.png')
                  "
                  class="el-image"
                  :preview-src-list="[
                    require('@/assets/image/socialGovernment/交通不限行.png')
                  ]"
                />
                <p>南昌交通不限行</p>
              </div>
              <div class="list-one">
                <el-image
                  :src="
                    require('@/assets/image/socialGovernment/扶贫不落一人.png')
                  "
                  :preview-src-list="[
                    require('@/assets/image/socialGovernment/扶贫不落一人.png')
                  ]"
                  class="el-image"
                />
                <p>扶贫不落一人</p>
              </div>
              <div class="list-one">
                <el-image
                  :src="
                    require('@/assets/image/socialGovernment/优惠政策直达.jpg')
                  "
                  :preview-src-list="[
                    require('@/assets/image/socialGovernment/优惠政策直达.jpg')
                  ]"
                  class="el-image"
                />
                <p>优惠政策直达</p>
              </div>
              <div class="list-one">
                <el-image
                  :src="
                    require('@/assets/image/socialGovernment/文明创建不下线1.png')
                  "
                  :preview-src-list="[
                    require('@/assets/image/socialGovernment/文明创建不下线1.png')
                  ]"
                  class="el-image"
                />
                <p>文明创建不下线</p>
              </div>
              <div class="list-one">
                <el-image
                  :src="
                    require('@/assets/image/socialGovernment/舒心停车 先离场后付费.jpg')
                  "
                  :preview-src-list="[
                    require('@/assets/image/socialGovernment/舒心停车 先离场后付费.jpg')
                  ]"
                  class="el-image"
                />
                <p>舒心停车·停车先离场后付费</p>
              </div>
              <div class="list-one">
                <el-image
                  :src="
                    require('@/assets/image/socialGovernment/先看病后付费.png')
                  "
                  :preview-src-list="[
                    require('@/assets/image/socialGovernment/先看病后付费.png')
                  ]"
                  class="el-image"
                />
                <p>先看病后付费</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <el-scrollbar
      style="height: 800px;margin: 20px 46px 0 48px;"
      v-if="value === 'BrightSTSign' ? true : false"
    >
      <div class="time-first" />
      <div class="time-first-block">
        <div class="line" />
        <div class="time-node-title">
          <div class="node" />
          <div class="title">雪亮工程</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">一类天网探头：<span>6万个</span></div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">社会面二、三类探头<span>7万个</span></div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            应用系统：
            <div class="img-list">
              <div class="list-one">
                <el-image
                  :src="require('@/assets/image/socialGovernment/xlgc.png')"
                  :preview-src-list="[
                    require('@/assets/image/socialGovernment/xlgc.png')
                  ]"
                  class="el-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
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
  data() {
    return {
      cityTitle: ['城市大脑'],
      currentIndex: 0
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.currentIndex = 0
      }
    },
    value(newVal) {
      if (newVal === 'CitySTSign') {
        this.cityTitle = ['城市大脑']
      } else {
        this.cityTitle = ['雪亮工程']
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    sidebarClick(index, item) {
      this.currentIndex = index
      if (index === 0) {
        this.$nextTick(() => {
          const div = this.$refs['elscrollbar'].$refs['wrap']
          div.scrollTop = 0
        })
        return
      }
      this.$nextTick(() => {
        const div = this.$refs['elscrollbar'].$refs['wrap']
        switch (index) {
          case 1:
            div.scrollTop = this.$refs['blockScroll2'].offsetTop
            break
        }
      })
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
  padding: 20px 0;
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
      height: 120px;
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
      .list-one {
        margin-top: 10px;
        width: 30%;
        height: 100px;
        .el-image {
          width: 100%;
          height: 70px;
        }
        p {
          margin: 0;
          padding: 0;
          color: #00ffff;
          text-align: center;
        }
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
</style>

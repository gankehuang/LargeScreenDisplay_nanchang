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
      ref="elscrollbar"
    >
      <div class="time-first" />
      <div class="time-first-block" ref="blockScroll1">
        <div class="line" />
        <div class="time-node-title">
          <div class="node" />
          <div class="title">智慧法院</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">地址：南昌市中级人民法院位于北京东路1858号</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            实景图：
            <div class="img-list">
              <el-image
                :src="require('@/assets/image/01智慧法院/市法院.jpg')"
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/市法院.jpg')
                ]"
                class="el-image"
              />
            </div>
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            应用系统：
            <div class="img-list">
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/多元化解e平台.png')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/多元化解e平台.png')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/法官E助理.png')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/法官E助理.png')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/警务指挥中心.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/警务指挥中心.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/科技法庭.png')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/科技法庭.png')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/审判e管理.png')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/审判e管理.png')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/审判执行平台.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/审判执行平台.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/收转发E中心.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/收转发E中心.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/诉讼服务中心.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/诉讼服务中心.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/执行指挥中心.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/执行指挥中心.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/01智慧法院/应用系统/中国移动微法院.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/01智慧法院/应用系统/中国移动微法院.jpg')
                ]"
                class="el-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="time-first-block" ref="blockScroll2">
        <div class="line" />
        <div class="time-node-title">
          <div class="node" />
          <div class="title">智慧检察院</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">地址：南昌市红谷滩新区庐山南大道426号负一楼</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            实景图：
            <div class="img-list">
              <el-image
                :src="
                  require('@/assets/image/02智慧检察院/实景图/智慧检察院（附图1）.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/02智慧检察院/实景图/智慧检察院（附图1）.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/02智慧检察院/实景图/智慧检察院（附图2）.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/02智慧检察院/实景图/智慧检察院（附图2）.jpg')
                ]"
                class="el-image"
              />
            </div>
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            应用系统：
            <div class="img-list">
              <el-image
                :src="
                  require('@/assets/image/02智慧检察院/智慧检察院（附图3）.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/02智慧检察院/智慧检察院（附图3）.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/02智慧检察院/智慧检察院（附图4）.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/02智慧检察院/智慧检察院（附图4）.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/02智慧检察院/智慧检察院（附图5）.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/02智慧检察院/智慧检察院（附图5）.jpg')
                ]"
                class="el-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="time-first-block" ref="blockScroll3">
        <div class="line" />
        <div class="time-node-title">
          <div class="node" />
          <div class="title">智慧公安</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">地址：红谷滩新区凤凰中大道1866号</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            大数据指挥中心：
            <div class="img-list">
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/大数据指挥中心/大数据指挥中心大厅.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/大数据指挥中心/大数据指挥中心大厅.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/大数据指挥中心/大数据指挥中心门头.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/大数据指挥中心/大数据指挥中心门头.jpg')
                ]"
                class="el-image"
              />
            </div>
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            政法跨部门系统：
            <div class="img-list">
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/政法跨部门系统/政法跨部门办案.png')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/政法跨部门系统/政法跨部门办案.png')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/政法跨部门系统/政法跨部门办案2.png')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/政法跨部门系统/政法跨部门办案2.png')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/政法跨部门系统/政法跨部门办案3.png')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/政法跨部门系统/政法跨部门办案3.png')
                ]"
                class="el-image"
              />
            </div>
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            智慧视觉中心：投资<span>2亿元</span>，占地<span>3600余平方</span>，存储容量<span
              >100PB</span
            >
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            <div class="img-list">
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心门头.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心门头.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心一楼大厅.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心一楼大厅.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心一楼大厅室内.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心一楼大厅室内.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心一楼大厅右侧.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心一楼大厅右侧.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心一楼大厅左侧.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/03智慧公安/智慧视觉中心/智慧视觉中心一楼大厅左侧.jpg')
                ]"
                class="el-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="time-first-block" ref="blockScroll4">
        <div class="line" />
        <div class="time-node-title">
          <div class="node" />
          <div class="title">智慧司法</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">地址：红谷滩区祥瑞路89号市法律服务中心二楼</div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            实景图：
            <div class="img-list">
              <el-image
                :src="
                  require('@/assets/image/04智慧司法/市12348公共法律服务网络平台大屏幕.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/04智慧司法/市12348公共法律服务网络平台大屏幕.jpg')
                ]"
                class="el-image"
              />
              <el-image
                :src="
                  require('@/assets/image/04智慧司法/市12348公共法律服务网络平台坐席.jpg')
                "
                :preview-src-list="[
                  require('@/assets/image/04智慧司法/市12348公共法律服务网络平台坐席.jpg')
                ]"
                class="el-image"
              />
            </div>
          </div>
        </div>
        <div class="info-node">
          <div class="node" />
          <div class="info">
            应用系统：“南昌市掌上12348”微信公众号<br />司法行政应急指挥平台<br />社区矫正执法监管综合管理平台<br />安置帮教数据库平台<br />执法监督平台<br />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
// import { nanChangBigEvent, raws } from './mock'
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
      cityTitle: ['智慧法院', '智慧检察院', '智慧公安', '智慧司法'],
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
      if (index === 0) {
        this.$nextTick(() => {
          const div = this.$refs['elscrollbar'].$refs['wrap']
          div.scrollTop = 0
        })
        return
      }
      console.log('12232', this.$refs['blockScroll4'])
      this.$nextTick(() => {
        const div = this.$refs['elscrollbar'].$refs['wrap']
        switch (index) {
          case 1:
            div.scrollTop = this.$refs['blockScroll2'].offsetTop
            break
          case 2:
            div.scrollTop = this.$refs['blockScroll3'].offsetTop
            break
          case 3:
            div.scrollTop = this.$refs['blockScroll4'].offsetTop
            break
        }
      })
    }
    // handleValue() {
    //   switch (this.value) {
    //     case 'dwzs':
    //       this.list = nanChangBigEvent
    //       break
    //     case 'flzygtt':
    //       this.list = raws
    //       break
    //     default:
    //       break
    //   }
    // }
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
  padding: 20px 0;
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
      // font-weight: bold;
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
      justify-content: flex-start;
      flex-wrap: wrap;
      .el-image {
        margin-top: 10px;
        width: 30%;
        height: 100px;
        margin: 5px;
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

<template>
  <div class="lea-spe-container">
    <!-- <Tabs
      :tab-list="tabList"
      width="500px"
      :cur-index="4"
    /> -->
    <div class="search-box">
      <el-input v-model="advancedForm.name" placeholder="领导姓名" clearable />
      <el-date-picker
        v-model="dataList"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button class="search-btn" @click="search()">
        <svg-icon icon-class="search" class="svg-icon" />搜索轨迹
      </el-button>
    </div>
    <el-scrollbar style="width:95%;height:890px;margin:0 auto">
      <div
        v-if="list.length > 1"
        class="line"
        :style="{ height: list.length * 400 + 'px' }"
      ></div>
      <div
        v-else
        class="line"
        :style="{ height: (list.length + 2) * 400 + 'px' }"
      ></div>
      <div class="lea-spe-list">
        <div class="lea-spe-start" />
        <div class="lea-spe-item" :key="index" v-for="(item, index) in list">
          <div class="item-left leader">
            <h1>{{ subString(item.time) }}</h1>
            <h1>{{ item.name }}</h1>
            <p style="font-size:16px">{{ item.info }}</p>
          </div>
          <div class="timeline">
            <div class="item-dot"></div>
          </div>
          <div class="item-right image">
            <div class="image-container">
              <el-image
                style="width:95%;height:85%"
                :src="item.picture"
                :preview-src-list="[item.picture]"
              ></el-image>
            </div>
          </div>
          <div class="sub-item-list">
            <div
              class="sub-item"
              :key="index"
              v-for="(item, index) in item.subList"
            >
              <span class="dot"></span>
              <svg-icon icon-class="location" class="icon"></svg-icon>
              <span class="info">
                <!-- <span class="name">{{item.name}}</span> -->
                <span class="action">{{ item.address }}</span>
                <!--                <span class="info-time">{{ item.inspectTime }}</span>-->
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import commonMixin from '../commonMixin'
import { leadershipInspectPage } from '@/api/adminIntelligentOffice/leaderInspection'
export default {
  mixins: [commonMixin],
  data() {
    return {
      list: [],
      dataList: [], // 时间选择
      advancedForm: {
        name: '',
        inspectTime: '',
        inspectEndTime: ''
      } // 查询条件
    }
  },
  mounted() {
    this.handleLeadershipInspectPage()
  },
  methods: {
    search() {
      this.handleLeadershipInspectPage()
    },
    subString(time) {
      return time.substring(0, 10)
    },
    async handleLeadershipInspectPage() {
      try {
        if (this.dataList && this.dataList.length > 0) {
          this.advancedForm.inspectTime = this.dataList[0] + ' 00:00:00'
          this.advancedForm.inspectEndTime = this.dataList[1] + ' 23:59:59'
        } else {
          this.advancedForm.inspectTime = ''
          this.advancedForm.inspectEndTime = ''
        }
        const { status, data } = await leadershipInspectPage({
          pageNum: 1,
          pageSize: 100,
          name: this.advancedForm.name,
          inspectTime: this.advancedForm.inspectTime,
          inspectEndTime: this.advancedForm.inspectEndTime
        })
        if (status === 200) {
          console.log(data)
          this.handleData(data.list)
        }
      } catch (error) {}
    },
    handleData(arr) {
      this.list = arr.map(item => {
        return {
          time: item.inspectTime,
          name: item.post + '   ' + item.name,
          info: item.inspectTheme,
          picture: item.picture,
          subList: item.leadershipInspectDetailVOS
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
  overflow-x: hidden;
}
.lea-spe-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("~@/assets/image/intelligentOffice/lea-spe-bg.png") center
    center / 100% 100% no-repeat;
  padding-top: 65px;
}
.search-box {
  height: 40px;
  position: fixed;
  z-index: 999;
  top: 100px;
  right: 80px;
  width: 600px;
  display: flex;
  /deep/.el-input {
    width: 200px;
    height: 32px;
    color: #aaa;
    background-color: rgb(6, 21, 55);
  }
  /deep/.el-date-editor {
    margin: 0 15px;
    background-color: rgb(6, 21, 55);
  }
  /deep/.el-range-input {
    color: #aaa;
    background-color: transparent;
  }
  /deep/.el-range-separator {
    color: #aaa;
  }
  .search-btn {
    width: 104px;
    height: 36px;
    border: none;
    color: #aaa;
    background: url("~@/assets/image/intelligentOffice/search-btn.png") center
      center / 100% 100% no-repeat;
  }
}
.line {
  position: absolute;
  top: 0;
  left: 50%;
  margin-right: -1px;
  width: 2px;
  height: 600px;
  background: rgba(120, 193, 255, 0.75);
}
.lea-spe-start {
  position: relative;
  top: -50px;
  width: 127px;
  height: 338px;
  background: url("~@/assets/image/intelligentOffice/lea-spe-start.png") center
    center / 100% 100% no-repeat;
}
.lea-spe-list {
  width: 70%;
  position: relative;
  left: 50%;
  margin-left: -35%;
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lea-spe-item {
  position: relative;
  top: -50px;
  width: 100%;
  margin-bottom: 100px;
  .timeline {
    position: relative;
    left: 50%;
    margin-left: -16px;
  }
  .item-line {
    position: relative;
    top: -250px;
    left: 16px;
    width: 2px;
    height: 300px;
    background: rgba(120, 193, 255, 0.75);
  }
  .item-dot {
    position: relative;
    top: -50px;
    left: 2px;
    width: 32px;
    height: 32px;
    background: url("~@/assets/image/intelligentOffice/lea-spe-node.png") center
      center / 100% 100% no-repeat;
    z-index: 10;
  }
  .item-left.leader {
    width: 50%;
    text-align: right;
    padding-right: 50px;
    color: #a9daff;
    p {
      position: relative;
      top: 25px;
    }
  }
  .item-right.image {
    position: relative;
    top: -200px;
    left: -125px;
    float: right;
    .image-container {
      width: 390px;
      height: 222px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url("~@/assets/image/intelligentOffice/lea-spe-image.png")
        center center / 100% 100% no-repeat;
    }
  }
  .sub-item-list {
    position: relative;
    left: 50%;
    top: 70px;
    z-index: 10;
  }
  .sub-item {
    margin-bottom: 20px;
    color: #a9daff;
    .dot {
      margin-left: -5.5px;
      display: inline-block;
      width: 11px;
      height: 11px;
      background: #99d5ff;
      border-radius: 50%;
    }
    .icon {
      margin: 0 10px;
    }
    .info {
      line-height: 24px;
      .name,
      .action,
      .info-time {
        display: inline-block;
        margin-left: 10px;
      }
      .info-time {
        color: #3b9afe;
      }
    }
  }
}
</style>

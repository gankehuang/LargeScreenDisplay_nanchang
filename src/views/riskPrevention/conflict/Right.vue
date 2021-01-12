<template>
  <div class="page-right">
    <div class="top">
      <span class="title">
        矛盾纠纷化解率
      </span>
      <div class="content">
        <div class="legand">
          <div class="item">
            <span></span>
            已处理
          </div>
          <div class="item">
            <span style="background: #fff;"></span>
            总数
          </div>
        </div>

        <div
          class="list-item"
          v-for="(item, index) in this.nameList"
          :key="index"
        >
          <span class="item-name">{{ item.name }}</span>
          <div style="flex: 0 0 calc(100% - 70px);display:flex;">
            <el-progress
              :style="{ width: getwidthList(item) + 'px' }"
              :text-inside="true"
              :stroke-width="18"
              :title="getPercentage(item) + '%'"
              :percentage="getPercentage(item)"
              color="#3B9AFE"
            ></el-progress>
            <span class="item-total">{{ item.all }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span class="title">
        动态预警
      </span>
      <div class="content">
        <div class="item-box">
          <div class="item-list" v-for="(item, index) in listArr" :key="index">
            <p class="item-title">
              {{ item.happenedTime }}
            </p>
            <div style="position:relative;">
              <div class="line" />
              <div class="item-con">
                <div class="imgs">
                  <CustomImage
                    lazy
                    v-if="item.snapImageUrl"
                    fit="cover"
                    :src="item.snapImageUrl"
                    :preview-src-list="
                      item.snapBakUrl ? [item.snapBakUrl] : [item.snapImageUrl]
                    "
                  />
                  <!--                  <el-image-->
                  <!--                    v-if="item.snapImageUrl"-->
                  <!--                    fit="cover"-->
                  <!--                    :src="item.snapImageUrl"-->
                  <!--                    :preview-src-list="-->
                  <!--                      item.snapBakUrl ? [item.snapBakUrl] : [item.snapImageUrl]-->
                  <!--                    "-->
                  <!--                  />-->
                </div>
                <div class="things" @click="showDialog(item)">
                  <div class="p">
                    中华情动态预警<span>{{ item.statusText }}</span>
                  </div>
                  <div class="p">
                    {{ item.peopleName }}
                  </div>
                  <div class="p text-overflows" :title="item.location">
                    {{ item.location }}
                  </div>
                </div>
                <div class="position" @click.stop="handleItem(item)">
                  <img src="@/assets/image/importPeople/position.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryEventList } from '@/api/riskPrevention/conflict.js'
export default {
  data() {
    return {
      nameList: [
        {
          name: '西湖区',
          all: 20692,
          isProcess: 19883
        },
        {
          name: '南昌县',
          all: 18450,
          isProcess: 18000
        },
        {
          name: '东湖区',
          all: 7981,
          isProcess: 7003
        },
        {
          name: '经开区',
          all: 6689,
          isProcess: 6640
        },
        {
          name: '安义县',
          all: 5450,
          isProcess: 5194
        },
        {
          name: '青山湖',
          all: 3052,
          isProcess: 2572
        },
        {
          name: '高新区',
          all: 805,
          isProcess: 791
        },
        {
          name: '青云谱区',
          all: 506,
          isProcess: 409
        },
        {
          name: '红谷滩区',
          all: 501,
          isProcess: 489
        },
        {
          name: '进贤县',
          all: 376,
          isProcess: 276
        },
        {
          name: '新建区',
          all: 310,
          isProcess: 300
        },

        {
          name: '湾里局',
          all: 21,
          isProcess: 19
        }
      ],
      totalList: [],
      widthList: [],
      percentageList: [],
      listArr: []
    }
  },
  mounted() {
    this.getEventList()
  },
  methods: {
    getPercentage(item) {
      return Number(((item.isProcess / item.all) * 100).toFixed(2))
    },
    getwidthList(item) {
      return parseInt((item.all / 76715) * 10 * 100)
    },
    getEventList() {
      const form = {
        eventName: '',
        type: '',
        status: '',
        emergencyLevel: '',
        eventCodeList: 'ZHQ_PERSONAL_CONTROL'
      }
      queryEventList(1, 50, form).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.listArr = data.list.filter(
            item => item.longitude && item.latitude
          )
        }
      })
    },
    handleItem(item) {
      this.$emit('focusEvent', item)
    },
    showDialog(item) {
      this.$emit('detailsEvent', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-right {
  z-index: 10;
}
.top {
  position: relative;
  width: 420px;
  height: 565px;
  padding: 30px 30px 10px 20px;
  background: url("~@/assets/image/conflict/right_top_bg.png") center center /
    100% 100% no-repeat;
  .content {
    width: 100%;
    margin-top: 40px;
    height: calc(100% - 40px);
  }
  .el-progress {
    width: 100%;
    display: inline-block;
  }
  /deep/.el-progress-bar__innerText {
    font-weight: bold;
  }
  /deep/.el-progress-bar__outer {
    background: #a9daff;
  }
  .legand {
    position: absolute;
    top: 40px;
    right: 10px;
    display: flex;
    .item {
      font-size: 14px;
      color: #fff;
      display: flex;
      margin-right: 10px;
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #3b9afe;
        border-radius: 50%;
        margin-right: 3px;
        position: relative;
        top: 3px;
      }
    }
  }
  .list-item {
    display: flex;
    margin-bottom: 20px;
    .item-name {
      color: #fff;
      flex: 0 0 70px;
    }

    .item-total {
      color: #fff;
      margin-left: 10px;
      text-align: right;
    }
  }
}
.bottom {
  position: relative;
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/conflict/left_block_bg.png") center center /
    100% 100% no-repeat;
  .content {
    width: 100%;
    margin-top: 40px;
    height: calc(100% - 40px);
  }
  .line {
    width: 1px;
    height: 110px;
    background: linear-gradient(180deg, #00a5ff 0%, rgba(0, 165, 255, 0) 100%);
    position: absolute;
    top: -12px;
    left: 11px;
  }
  .item-box {
    width: 100%;
    height: 220px;
    overflow-y: auto;
  }
  /* 设置滚动条的样式 */
  .item-box::-webkit-scrollbar {
    width: 12px;
  }

  /* 滚动槽 */
  .item-box::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  .item-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #04335d;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  .item-list {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 10px;
    .item-title {
      background: url("~@/assets/image/importPeople/z82.png") no-repeat;
      padding-left: 30px;
      color: #00ffff;
      margin-bottom: 6px;
    }
    .item-con {
      display: flex;
      margin-left: 30px;
      width: 356px;
      // height: 80px;
      background: rgba(0, 85, 255, 0.26);
      border: 1px solid #0b61a0;
      .imgs {
        .el-image {
          width: 70px;
          height: 100%;
        }
      }
      .things {
        flex: 1;
        padding-left: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #a9daff;
        line-height: 25px;
        position: relative;
        padding: 10px;
        height: 130px;
        .p {
          width: 260px;
          span {
            display: inline-block;
            width: 80px;
            height: 20px;
            line-height: 20px;
            margin-left: 80px;
            text-align: center;
            // background: url("~@/assets/image/importPeople/j1299.png")no-repeat center;
            // background-size: 100% 100%;
            background: #3498fb;
            border-radius: 8px;
            color: #ffffff;
          }
        }
        .p:nth-of-type(2) {
          height: 25px;
        }
        .p:nth-of-type(3) {
          height: 50px;
        }
        .types {
          position: absolute;
          top: 6px;
          right: 0;
          width: 56px;
          height: 19px;
          line-height: 19px;
          background: rgba(48, 85, 146, 0);
          border: 1px solid #e6b00e;
          border-radius: 4px;
          color: #e6b00e;
          text-align: center;
        }
      }
      .position {
        position: absolute;
        bottom: 10px;
        right: 0px;
        width: 64px;
        cursor: pointer;
        img {
          display: block;
          width: 15px;
          height: 20px;
        }
      }
    }
  }
}
.title {
  position: absolute;
  top: 10px;
  left: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #7dbcff;
  line-height: 18px;
}
</style>

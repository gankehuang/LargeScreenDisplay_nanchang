<template>
  <div class="page-box">
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="5"
    />
    <div class="custom-model">
      <el-input
        v-model="customInput"
        placeholder="自定义模型名称"
        prefix-icon="el-icon-edit-outline"
        class="input-with-select"
      >
        <el-select
          slot="prepend"
          v-model="selectItem"
          placeholder="请选择"
          class="select-style"
          @change="selectChange"
        >
          <el-option
            label="重点人群"
            value="1"
          />
          <el-option
            label="重点区域"
            value="2"
          />
          <el-option
            label="重点部位"
            value="3"
          />
          <el-option
            label="重点水域"
            value="4"
          />
          <el-option
            label="政法舆情"
            value="5"
          />
          <el-option
            label="流动人口"
            value="6"
          />
          <el-option
            label="出租房屋"
            value="7"
          />
          <el-option
            label="矛盾排调"
            value="8"
          />
          <el-option
            label="政法舆情"
            value="9"
          />
        </el-select>
      </el-input>
    </div>
    <div class="content">
      <div class="annulus-box">
        <div
          class="annulus"
          @click="toggleAlert"
        >
          <div class="torus" />
          <h1><span>模型加载</span></h1>
          <div class="line">
            <div class="line-box" />
            <div class="line-list">
              <ul>
                <li
                  v-for="(item, index) in selectList"
                  :key="index"
                  :class="setClass(index)"
                >
                  <div class="lines">
                    {{ item.name }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content-box">
        <div class="left">
          <div class="box-left-one">
            <h1>对象规则</h1>
            <el-scrollbar>
              <ul class="box-ul">
                <li
                  v-for="(item, index) in judgeList"
                  :key="index"
                  :class="item.current ? 'current' : ''"
                  @click="itemClick1(item, index)"
                >
                  {{ item.name }}
                </li>
                <li
                  class="add"
                  @click="addClick(1)"
                >
                  +
                </li>
              </ul>
            </el-scrollbar>
          </div>
          <div class="box-left-two">
            <h1>行为准则</h1>
            <el-scrollbar>
              <ul class="box-ul">
                <li
                  v-for="(item, index) in behaviorList"
                  :key="index"
                  :class="item.current ? 'current' : ''"
                  @click="itemClick2(item, index)"
                >
                  {{ item.name }}
                </li>
                <li
                  class="add"
                  @click="addClick(2)"
                >
                  +
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
        <div class="center" />
        <div class="right">
          <div class="box-right-one">
            <h1>时空准则</h1>
            <el-scrollbar>
              <ul class="box-ul">
                <li
                  v-for="(item, index) in spaceTimeList"
                  :key="index"
                  :class="item.current ? 'current' : ''"
                  @click="itemClick3(item, index)"
                >
                  {{ item.name }}
                </li>
                <li
                  class="add"
                  @click="addClick(3)"
                >
                  +
                </li>
              </ul>
            </el-scrollbar>
          </div>
          <div class="box-right-two">
            <h1>处置准则</h1>
            <el-scrollbar>
              <ul class="box-ul">
                <li
                  v-for="(item, index) in managementList"
                  :key="index"
                  :class="item.current ? 'current' : ''"
                  @click="itemClick4(item, index)"
                >
                  {{ item.name }}
                </li>
                <li
                  class="add"
                  @click="addClick(4)"
                >
                  +
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div class="options">
        <div
          class="model"
          @click="addClick(5)"
        />
        <div
          class="reset"
          @click="resetClick"
        />
      </div>
    </div>
    <div
      v-if="addDialog"
      class="dialog-view"
    >
      <div :class="isBig ? 'modal-dialog big' : 'modal-dialog'">
        <div class="modal-title">
          {{ modelData.name }}
        </div>
        <div class="modal-close">
          <svg-icon
            icon-class="closed"
            class="svg-icon"
            @click="closeModal"
          />
        </div>
        <crowdBasicPrinciples
          v-if="modelData.active == 1 && selectItem == 1"
          @submitEvent="submitEvent"
        />
        <crowdBehavior
          v-if="modelData.active == 2 && selectItem == 1"
          @submitEvent="submitEvent"
        />
        <crowdSpaceTime
          v-if="modelData.active == 3 && selectItem == 1"
          @submitEvent="submitEvent"
        />
        <crowdDispose
          v-if="modelData.active == 4 && selectItem == 1"
          @submitEvent="submitEvent"
        />
        <areaBasicPrinciples
          v-if="modelData.active == 1 && selectItem == 2"
          @submitEvent="submitEvent"
        />
        <areaBehavior
          v-if="modelData.active == 2 && selectItem == 2"
          @submitEvent="submitEvent"
        />
        <areaSpaceTime
          v-if="modelData.active == 3 && selectItem == 2"
          @submitEvent="submitEvent"
        />
        <areaDispose
          v-if="modelData.active == 4 && selectItem == 2"
          @submitEvent="submitEvent"
        />
        <modelView
          v-if="modelData.active == 5"
          :item-view="itemView"
        />
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from '../commonMixin'
import { queryAlarmRecord } from '@/api/alert'
import crowdBasicPrinciples from './crowd/basicPrinciples'
import crowdBehavior from './crowd/behavior'
import crowdSpaceTime from './crowd/spaceTime'
import crowdDispose from './crowd/dispose'
import areaBasicPrinciples from './area/basicPrinciples'
import areaBehavior from './area/behavior'
import areaSpaceTime from './area/spaceTime'
import areaDispose from './area/dispose'
import modelView from './model/index'
export default {
  components: {
    crowdBasicPrinciples,
    crowdBehavior,
    crowdSpaceTime,
    crowdDispose,
    areaBasicPrinciples,
    areaBehavior,
    areaSpaceTime,
    areaDispose,
    modelView
  },
  mixins: [commonMixin],
  data () {
    return {
      customInput: '',
      selectItem: '1',
      itemView: [],
      addDialog: false,
      selectList: [],
      isBig: false,
      judgeList: [
        {
          id: '1001',
          name: '重点信访人员',
          current: false
        },
        {
          id: '1002',
          name: '退役重点人员',
          current: false
        },
        {
          id: '1003',
          name: '刑释解戒人员',
          current: false
        },
        {
          id: '1004',
          name: '社区矫正人员',
          current: false
        },
        {
          id: '1005',
          name: '西藏人员',
          current: false
        },
        {
          id: '1006',
          name: '未就业人员',
          current: false
        },
        {
          id: '1007',
          name: '未缴纳社保人员',
          current: false
        }
      ],
      behaviorList: [
        {
          id: '2001',
          name: '离昌',
          current: false
        },
        {
          id: '2002',
          name: '离省',
          current: false
        },
        {
          id: '2003',
          name: '进京',
          current: false
        },
        {
          id: '2004',
          name: '首次出现',
          current: false
        },
        {
          id: '2005',
          name: '多次出现',
          current: false
        },
        {
          id: '2006',
          name: '单独出现',
          current: false
        },
        {
          id: '2007',
          name: '多人聚集',
          current: false
        }
      ],
      spaceTimeList: [
        {
          id: '3001',
          name: '重要敏感时期',
          current: false
        },
        {
          id: '3002',
          name: '重大活动期间',
          current: false
        },
        {
          id: '3003',
          name: '省行政中心',
          current: false
        },
        {
          id: '3004',
          name: '市行政中心',
          current: false
        },
        {
          id: '3005',
          name: '八一广场',
          current: false
        },
        {
          id: '3006',
          name: '秋水广场',
          current: false
        },
        {
          id: '3007',
          name: '学校',
          current: false
        }
      ],
      managementList: [
        {
          id: '4000',
          name: '推送主管部门',
          current: false
        },
        {
          id: '4001',
          name: '推送专职网格员',
          current: false
        },
        {
          id: '4021',
          name: '推送网格员',
          current: false
        },
        {
          id: '4002',
          name: '推送属地单位',
          current: false
        },
        {
          id: '4003',
          name: '推送法定监护人',
          current: false
        },
        {
          id: '4004',
          name: '推送"四帮一"管护人员',
          current: false
        },
        {
          id: '4005',
          name: '6小时内完成',
          current: false
        },
        {
          id: '4006',
          name: '12小时内完成',
          current: false
        },
        {
          id: '4007',
          name: '24小时内完成',
          current: false
        },
        {
          id: '4008',
          name: '48小时内完成',
          current: false
        }
      ],
      modelData: {
        active: null,
        name: null
      }
    }
  },
  mounted () {
    this.queryAlarmRecord()
  },
  methods: {
    closeModal () {
      this.addDialog = false
    },
    selectChange (data) {
      this.selectList = []
      if (data === '1') {
        this.judgeList = [
          {
            id: '1001',
            name: '重点信访人员',
            current: false
          },
          {
            id: '1002',
            name: '退役重点人员',
            current: false
          },
          {
            id: '1003',
            name: '刑释解戒人员',
            current: false
          },
          {
            id: '1004',
            name: '社区矫正人员',
            current: false
          },
          {
            id: '1005',
            name: '西藏人员',
            current: false
          },
          {
            id: '1006',
            name: '未就业人员',
            current: false
          },
          {
            id: '1007',
            name: '未缴纳社保人员',
            current: false
          }
        ]
        this.behaviorList = [
          {
            id: '2001',
            name: '离昌',
            current: false
          },
          {
            id: '2002',
            name: '离省',
            current: false
          },
          {
            id: '2003',
            name: '进京',
            current: false
          },
          {
            id: '2004',
            name: '首次出现',
            current: false
          },
          {
            id: '2005',
            name: '多次出现',
            current: false
          },
          {
            id: '2006',
            name: '单独出现',
            current: false
          },
          {
            id: '2007',
            name: '多人聚集',
            current: false
          }
        ]
        this.spaceTimeList = [
          {
            id: '3001',
            name: '重要敏感时期',
            current: false
          },
          {
            id: '3002',
            name: '重大活动期间',
            current: false
          },
          {
            id: '3003',
            name: '省行政中心',
            current: false
          },
          {
            id: '3004',
            name: '市行政中心',
            current: false
          },
          {
            id: '3005',
            name: '八一广场',
            current: false
          },
          {
            id: '3006',
            name: '秋水广场',
            current: false
          },
          {
            id: '3007',
            name: '学校',
            current: false
          }
        ]
        this.managementList = [
          {
            id: '4000',
            name: '推送主管部门',
            current: false
          },
          {
            id: '4001',
            name: '推送专职网格员',
            current: false
          },
          {
            id: '4021',
            name: '推送网格员',
            current: false
          },
          {
            id: '4002',
            name: '推送属地单位',
            current: false
          },
          {
            id: '4003',
            name: '推送法定监护人',
            current: false
          },
          {
            id: '4004',
            name: '推送"四帮一"管护人员',
            current: false
          },
          {
            id: '4005',
            name: '6小时内完成',
            current: false
          },
          {
            id: '4006',
            name: '12小时内完成',
            current: false
          },
          {
            id: '4007',
            name: '24小时内完成',
            current: false
          },
          {
            id: '4008',
            name: '48小时内完成',
            current: false
          }
        ]
      }
      if (data === '2') {
        this.judgeList = [
          {
            id: '1001',
            name: '省行政中心',
            current: false
          },
          {
            id: '1002',
            name: '市行政中心',
            current: false
          },
          {
            id: '1003',
            name: '八一广场',
            current: false
          },
          {
            id: '1004',
            name: '秋水广场',
            current: false
          }
        ]
        this.behaviorList = [
          {
            id: '2001',
            name: '严重精神障碍人员出现',
            current: false
          },
          {
            id: '2002',
            name: '信访人员聚集',
            current: false
          },
          {
            id: '2003',
            name: '退役重点人员聚集',
            current: false
          },
          {
            id: '2004',
            name: '10人以上聚集',
            current: false
          },
          {
            id: '2005',
            name: '20人以上聚集',
            current: false
          },
          {
            id: '2006',
            name: '50人以上聚集',
            current: false
          }
        ]
        this.spaceTimeList = [
          {
            id: '3001',
            name: '日常时段',
            current: false
          },
          {
            id: '3002',
            name: '重要敏感时期',
            current: false
          },
          {
            id: '3003',
            name: '重大活动期间',
            current: false
          },
          {
            id: '3004',
            name: '第一圈层',
            current: false
          },
          {
            id: '3005',
            name: '第二圈层',
            current: false
          },
          {
            id: '3006',
            name: '第三圈层',
            current: false
          }
        ]
        this.managementList = [
          {
            id: '4001',
            name: 'A级预警',
            current: false
          },
          {
            id: '4002',
            name: 'B级预警',
            current: false
          },
          {
            id: '4005',
            name: 'C级预警',
            current: false
          }
        ]
      }
    },
    resetClick () {
      this.selectList = []
      this.resetFun(this.judgeList)
      this.resetFun(this.behaviorList)
      this.resetFun(this.spaceTimeList)
      this.resetFun(this.managementList)
    },
    resetFun (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].current = false
      }
    },
    addClick (data) {
      this.isBig = false
      this.addDialog = true
      this.modelData.active = data
      if (data === 1) {
        this.modelData.name = '对象规则'
      }
      if (data === 2) {
        this.modelData.name = '行为准则'
      }
      if (data === 3) {
        this.modelData.name = '时空准则'
      }
      if (data === 4) {
        this.modelData.name = '处置准则'
      }
      if (data === 5) {
        this.isBig = true
        this.modelData.name = ''
        if (this.customInput) {
          this.itemView = [
            {
              id: '6001',
              name: this.customInput,
              enable: true,
              current: false
            }
          ]
        } else {
          this.itemView = [
            {
              id: '5001',
              name: '严重精神病人员单独出现在学校',
              enable: true,
              current: false
            },
            {
              id: '925644860',
              name: '严重精神病人员单独出行',
              enable: true,
              current: false
            },
            {
              id: '5003',
              name: '信访人员在重点场所聚集',
              enable: true,
              current: false
            }
          ]
        }
      }
    },
    submitEvent (data) {
      if (this.modelData.active === 1) {
        this.judgeList.push(data)
      }
      if (this.modelData.active === 2) {
        this.behaviorList.push(data)
      }
      if (this.modelData.active === 3) {
        this.spaceTimeList.push(data)
      }
      if (this.modelData.active === 4) {
        this.managementList.push(data)
      }
      this.addDialog = false
    },
    itemClick1 (data, index) {
      for (let i = 0; i < this.judgeList.length; i++) {
        if (this.judgeList[i].id === data.id) {
          if (!this.judgeList[i].current) {
            if (this.selectList.length < 8) {
              this.selectList.push(data)
            } else {
              this.judgeList[i].current = !this.judgeList[i].current
            }
          } else {
            this.selectList = this.selectList.filter(u => u.id !== data.id)
          }
          this.judgeList[i].current = !this.judgeList[i].current
        }
      }
    },
    itemClick2 (data, index) {
      for (let i = 0; i < this.behaviorList.length; i++) {
        if (this.behaviorList[i].id === data.id) {
          if (!this.behaviorList[i].current) {
            if (this.selectList.length < 8) {
              this.selectList.push(data)
            } else {
              this.behaviorList[i].current = !this.behaviorList[i].current
            }
          } else {
            this.selectList = this.selectList.filter(u => u.id !== data.id)
          }
          this.behaviorList[i].current = !this.behaviorList[i].current
        }
      }
    },
    itemClick3 (data, index) {
      for (let i = 0; i < this.spaceTimeList.length; i++) {
        if (this.spaceTimeList[i].id === data.id) {
          if (!this.spaceTimeList[i].current) {
            if (this.selectList.length < 8) {
              this.selectList.push(data)
            } else {
              this.spaceTimeList[i].current = !this.spaceTimeList[i].current
            }
          } else {
            this.selectList = this.selectList.filter(u => u.id !== data.id)
          }
          this.spaceTimeList[i].current = !this.spaceTimeList[i].current
        }
      }
    },
    itemClick4 (data, index) {
      for (let i = 0; i < this.managementList.length; i++) {
        if (this.managementList[i].id === data.id) {
          if (!this.managementList[i].current) {
            if (this.selectList.length < 8) {
              this.selectList.push(data)
            } else {
              this.managementList[i].current = !this.managementList[i].current
            }
          } else {
            this.selectList = this.selectList.filter(u => u.id !== data.id)
          }
          this.managementList[i].current = !this.managementList[i].current
        }
      }
    },
    setClass (data) {
      return 'line' + data
    },
    toggleAlert () {
      this.$message({
        message: '模型加载成功！',
        type: 'success'
      })
    },
    bindBtnClose () {
      this.isShowAlert = false
    },
    bindShowDetail () {
      this.modal = 'event'
      this.eventInfo = this.eventList[0]
      this.eventInfo.happenedTime = this.alertInfo.alarmTime
      this.eventInfo.location = this.alertInfo.cameraName
      this.eventInfo.snapImageUrl = this.alertInfo.bkgUrl
    },
    queryAlarmRecord () {
      queryAlarmRecord({
        name: '徐荣华',
        beginTime: '2019-08-11 10:00:20',
        endTime: '2020-10-18 20:00:20',
        certificateNumber: '360122197112292712'
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          this.alertInfo = data.list[0]
          this.alertInfo.emergencyLevel = 3
          this.alertInfo.emergencyLevelText = '三级'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  background: url("~@/assets/image/AI/page-bg.png") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .custom-model {
    z-index: 99;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 392px;
    height: 60px;
    background: url("~@/assets/image/AI/custom-model-bg.png") no-repeat center
      center;
    background-size: 100% 100%;
    /deep/ .input-with-select {
      background: rgba(0, 0, 0, 0);
      border: 0px;
      border-radius: 10px;
    }
    /deep/ .el-select .el-input {
      width: 120px;
      font-size: 14px;
      color: #fff;
    }
    /deep/ .el-input__inner {
      font-size: 14px;
      height: 60px !important;
      line-height: 60px !important;
      border: none;
      background: rgba(0, 0, 0, 0);
      color: #fff;
    }
    /deep/ .el-input-group__prepend {
      border-radius: 10px 0 0 10px;
      background: rgba(0, 0, 0, 0);
      border: none;
    }
  }
  .content {
    position: absolute;
    top: 70px;
    left: 0px;
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    padding-top: 100px;
    // align-items: center;
    .annulus-box {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 620px;
      height: 620px;
      margin-top: -310px;
      margin-left: -310px;
      .annulus {
        width: 100%;
        height: 100%;
        position: relative;
        .torus {
          position: absolute;
          top: 35px;
          left: 0px;
          padding: 0px;
          margin: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url("~@/assets/image/AI/torus-bg.png") no-repeat center
            center;
          background-size: 600px;
          -webkit-transform: translate3d(0, 0, 0);
          -moz-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          animation: play1 20s linear infinite;
          @keyframes play1 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        }
        h1 {
          position: absolute;
          top: 35px;
          left: 0px;
          padding: 0px;
          margin: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url("~@/assets/image/AI/annuius-h1-bg.png") no-repeat
            center center;
          background-size: 560px;
        }
        span {
          font-size: 28px;
          background: linear-gradient(to right, #d4fdff 0%, #4facfe 100%);
          background-clip: text;
          -webkit-background-clip: text;
          text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
        }
      }
      .line {
        position: absolute;
        left: 0px;
        top: 35px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .line-box {
          width: 620px;
          height: 620px;
          position: relative;
          background: url("~@/assets/image/AI/annulus.png") no-repeat center
            center;
          background-size: 620px;
          -webkit-transform: translate3d(0, 0, 0);
          -moz-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          animation: play 20s linear infinite;
          @keyframes play {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
        .line-list {
          width: 620px;
          height: 620px;
          position: absolute;
          ul {
            margin: 0px;
            padding: 0px;
            list-style: none;
          }
          li {
            position: absolute;
            width: 90px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #a9daff;
            font-size: 14px;
            background: url("~@/assets/image/AI/line.png") no-repeat center
              center;
            transform: translate3d(0, 0, 0);
            animation: playAdd 1s;
            @keyframes playAdd {
              0% {
                opacity: 0.35;
                width: 200px;
                height: 200px;
              }
              100% {
                opacity: 0.5;
                width: 90px;
                height: 90px;
              }
            }
            .lines {
              display: flex;
              width: 60px;
              height: 60px;
              font-weight: bold;
              text-align: center;
              justify-content: center;
              align-items: center;
            }
          }
          .line0 {
            position: absolute;
            top: 45px;
            left: 50%;
            margin-left: -45px;
          }
          .line1 {
            position: absolute;
            top: 110px;
            left: 105px;
          }
          .line2 {
            position: absolute;
            top: 110px;
            right: 105px;
          }
          .line3 {
            position: absolute;
            top: 260px;
            left: 45px;
          }
          .line4 {
            position: absolute;
            top: 260px;
            right: 45px;
          }
          .line5 {
            position: absolute;
            bottom: 110px;
            left: 105px;
          }
          .line6 {
            position: absolute;
            bottom: 110px;
            right: 105px;
          }
          .line7 {
            position: absolute;
            bottom: 40px;
            left: 50%;
            margin-left: -45px;
          }
        }
      }
    }
    .content-box {
      padding: 0px 100px;
      width: 100%;
      height: 700px;
      display: flex;
      flex-direction: row;
    }
    .left,
    .right {
      width: 604px;
      height: 700px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      h1 {
        margin: 0px;
        padding: 0px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: #aadaff;
      }
      .box-ul {
        padding: 0px;
        margin: 0px 10px;
        list-style: none;
        height: 230px;
        li {
          float: left;
          cursor: pointer;
          width: 93px;
          height: 80px;
          word-break: break-all;
          padding: 0px 5px;
          margin: 0px 10px;
          margin-top: 14px;
          background: url("~@/assets/image/AI/list-bg.png") no-repeat center
            center;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #aadaff;
          text-align: center;
          &.current {
            background: url("~@/assets/image/AI/list-hover-bg.png") no-repeat
              center center;
            font-weight: bold;
            color: #fff;
          }
          &.add {
            font-size: 32px;
            &:hover {
              background: url("~@/assets/image/AI/list-hover-bg.png") no-repeat
                center center;
              color: #fff;
            }
          }
        }
      }
    }
    .center {
      flex: 1;
      flex-basis: auto;
    }
    .box-left-one {
      width: 604px;
      height: 319px;
      background: url("~@/assets/image/AI/left-one.png") no-repeat center center;
      background-size: 100% 100%;
      padding-right: 130px;
    }
    .box-left-two {
      width: 604px;
      height: 319px;
      background: url("~@/assets/image/AI/left-two.png") no-repeat center center;
      background-size: 100% 100%;
      padding-right: 130px;
    }
    .box-right-one {
      width: 604px;
      height: 319px;
      background: url("~@/assets/image/AI/right-one.png") no-repeat center
        center;
      background-size: 100% 100%;
      padding-left: 130px;
    }
    .box-right-two {
      width: 604px;
      height: 319px;
      background: url("~@/assets/image/AI/right-two.png") no-repeat center
        center;
      background-size: 100% 100%;
      padding-left: 130px;
    }
    .options {
      position: absolute;
      width: 240px;
      height: 37px;
      left: 50%;
      margin-left: -120px;
      bottom: 0px;
      display: flex;
      flex-direction: row;
      .model {
        width: 120px;
        height: 37px;
        background: url("~@/assets/image/AI/model1.png") no-repeat center center;
        background-size: 100% 100%;
        cursor: pointer;
        &:hover {
          background: url("~@/assets/image/AI/model2.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
      .reset {
        width: 120px;
        height: 37px;
        background: url("~@/assets/image/AI/reset1.png") no-repeat center center;
        background-size: 100% 100%;
        cursor: pointer;
        &:hover {
          background: url("~@/assets/image/AI/reset2.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
    }
  }
}
.dialog-view {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  .modal-dialog {
    width: 800px;
    height: 630px;
    background: url("~@/assets/image/AI/model.png") no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
    .modal-title {
      width: 100%;
      height: 40px;
      font-size: 14px;
      color: #00ffff;
      margin-top: 17px;
      text-align: center;
    }
    .modal-close {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 25px;
      right: 30px;
      .svg-icon {
        width: 16px;
        height: 16px;
        color: #3b9afe;
        font-weight: bold;
      }
    }
  }
  .big {
    width: 1350px;
    height: 828px;
    z-index: 999;
  }
}
</style>

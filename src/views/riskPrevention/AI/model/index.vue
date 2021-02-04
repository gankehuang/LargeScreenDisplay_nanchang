<template>
  <div class="model-view">
    <el-scrollbar>
      <ul>
        <li
          v-for="(item, index) in itemView"
          :key="index"
        >
          <div class="view">
            <h1><strong>模型名称</strong>{{ item.name }}</h1>
            <h1><strong>模型类型</strong>重点人群</h1>
          </div>
          <div class="view">
            <h1>
              <strong>启用状态</strong><el-switch
                v-model="item.enable"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </h1>
            <h1>
              <strong>启用时间</strong>{{ "2020-10-2" + index + " 12:03:15" }}
            </h1>
          </div>
          <div class="view options">
            <h1><strong>启用数量</strong>{{ 6 + index }}</h1>
          </div>
          <div class="view btns">
            <div
              class="btn"
              @click="resultClick(item.id)"
            >
              研判结果
            </div>
            <div
              class="btn"
              @click="ruleClick(item.name)"
            >
              研判规则
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
    <div
      v-if="addDialog"
      class="dialog-view"
    >
      <div class="modal-dialog">
        <div class="modal-title">
          研判规则
        </div>
        <div class="modal-close">
          <svg-icon
            icon-class="closed"
            class="svg-icon"
            @click="closeModal"
          />
        </div>
        <readRule :data-list="dataList" />
      </div>
    </div>
    <div
      v-if="bigDialog"
      class="dialog-view"
    >
      <div class="modal-dialog big">
        <div class="modal-title">
          研判结果
        </div>
        <div class="modal-close">
          <svg-icon
            icon-class="closed"
            class="svg-icon"
            @click="closeModal1"
          />
        </div>
        <readResult :id="id" />
      </div>
    </div>
  </div>
</template>

<script>
import readRule from './readRule'
import readResult from './readResult'
export default {
  components: {
    readRule,
    readResult
  },
  props: {
    itemView: {
      type: Array
    }
  },
  data () {
    return {
      id: null,
      value: true,
      addDialog: false,
      bigDialog: false,
      dataList: []
    }
  },
  methods: {
    resultClick (data) {
      this.bigDialog = true
      this.id = data
    },
    ruleClick (data) {
      this.addDialog = true
      if (data.indexOf('单独出现在学校') > -1) {
        this.dataList = [
          {
            name: '重点人员类型:',
            value: '严重精神障碍患者'
          },
          {
            name: '关注日期:',
            value: '日常时段'
          },
          {
            name: '重点部位:',
            value: '学校'
          },
          {
            name: '同行人数:',
            value: '0人'
          },
          {
            name: '通知对象:',
            value: '推送“四帮一”管护人员，推送市卫健委，推送县区综治中心'
          }
        ]
      }
      if (data.indexOf('单独出行') > -1) {
        this.dataList = [
          {
            name: '重点人员类型:',
            value: '严重精神障碍患者'
          },
          {
            name: '关注日期:',
            value: '日常时段'
          },
          {
            name: '同行人数:',
            value: '0人'
          },
          {
            name: '通知对象:',
            value: '推送“四帮一”管护人员，推送市卫健委，推送县区综治中心'
          }
        ]
      }
      if (data.indexOf('重点场所聚集') > -1) {
        this.dataList = [
          {
            name: '重点人员类型:',
            value: '信访人员'
          },
          {
            name: '关注日期:',
            value: '日常时段'
          },
          {
            name: '重点部位:',
            value: '重点场所'
          },
          {
            name: '同行人数:',
            value: '3人以上'
          },
          {
            name: '通知对象:',
            value: '推送市信访局，推送县区综治中心'
          }
        ]
      }
    },
    closeModal () {
      this.addDialog = false
    },
    closeModal1 () {
      this.bigDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.model-view {
  padding: 0px 30px;
  width: 100%;
  height: 758px;
  position: relative;
  ul {
    width: calc(100% - 75px);
    height: 758px;
    margin: 0px 45px;
    padding: 0px;
  }
  li {
    width: 1200px;
    height: 118px;
    padding-left: 165px;
    background: url("~@/assets/image/AI/model-list.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    .view {
      width: 32%;
      height: 118px;
      display: flex;
      flex-direction: column;
      line-height: 30px;
      margin: 29px 0px;
      h1 {
        padding: 0px;
        margin: 0px;
        color: #a9daff;
        font-size: 16px;
        font-weight: normal;
        strong {
          color: #3b9afe;
          font-size: 16px;
          padding-right: 15px;
          font-weight: normal;
        }
      }
    }
    .options {
      width: 18%;
    }
    .btns {
      width: 18%;
      height: 118px;
      margin: 23px auto 0px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .btn {
        cursor: pointer;
        color: #a9daff;
        width: 100px;
        height: 30px;
        background: url("~@/assets/image/AI/btn1.png") no-repeat center center;
        margin-bottom: 12px;
        text-align: center;
        line-height: 30px;
        &:hover {
          background: url("~@/assets/image/AI/btn2.png") no-repeat center center;
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
  background: rgba(0, 0, 0, 0.5);
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
    width: 1200px;
    height: 688px;
    z-index: 999;
  }
}
</style>

<template>
  <div class="model">
    <div class="model-box">
      <el-scrollbar style="height:100%;width:100%;">
        <div
          v-if="ids"
          class="list-container"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
            class="list-item"
          >
            <div class="left-box">
              <div class="img">
                <el-image
                  style="height:100%;width:100%;"
                  :src="item.snapImageUrl"
                  :preview-src-list="[item.snapImageUrl]"
                />
              </div>
              <div class="text">
                现场抓拍图片
              </div>
            </div>
            <div class="right-info">
              <div class="item-p">
                类型：<span class="label-value">{{ item.eventName }}</span>
              </div>
              <div class="item-p">
                抓拍地点：<span class="label-value">{{ item.deviceName }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="list-container"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
            class="list-item"
          >
            <div class="left-box">
              <div class="img">
                <el-image
                  style="height:100%;width:100%;"
                  :src="item.bkgUrl"
                  :preview-src-list="[item.bkgUrl]"
                />
              </div>
              <div class="text">
                现场抓拍图片
              </div>
            </div>
            <div class="right-info">
              <div class="item-p">
                姓名：<span class="label-value">{{
                  item.faceName | hideName
                }}</span>
              </div>
              <div class="item-p">
                身份证号：<span class="label-value">{{
                  item.certificateNumber | hideIdCard
                }}</span>
              </div>
              <div class="item-p">
                抓拍地点：<span class="label-value">{{ item.cameraName }}</span>
              </div>
              <div class="item-p">
                布控目标：<span class="label-value">{{ item.taskName }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {
  queryAlarmRecord,
  queryAlarmRecord1,
  queryAlarmRecord2
} from '@/api/AI/index'
export default {
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      ids: false,
      list: []
    }
  },
  created () {
    this.queryAlarmRecord()
  },
  methods: {
    submitClick () {
      this.$emit('submitEvent', this.form)
    },
    queryAlarmRecord () {
      if (this.id === '925644860') {
        const objects = {
          beginTime: '2020-01-01 00:00:00',
          endTime: '2020-10-25 00:00:00',
          taskId: this.id
        }
        queryAlarmRecord1(objects).then(res => {
          this.list = res.data.list
          this.list = this.list.filter(
            u => u.id !== 'fa2eca3bc6804443b57d17bc8bf52a90'
          )
        })
      } else if (this.id === '5001') {
        const objects = {
          name: '徐荣华',
          beginTime: '2020-01-01 00:00:00',
          endTime: '2020-10-25 00:00:00'
        }
        queryAlarmRecord(objects).then(res => {
          this.list = res.data.list
        })
      } else {
        this.ids = true
        queryAlarmRecord2().then(res => {
          this.list = res.data.list
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.model {
  width: 100%;
  height: calc(100% - 57px);
  /deep/ .el-form-item__label {
    color: #aadaff;
  }
  label {
    color: #aadaff;
    font-size: 14px;
  }
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-slider__runway {
    background: rgba(0, 0, 0, 0.2);
  }
  /deep/ .el-slider__button {
    width: 12px;
    height: 12px;
    background: #409eff;
  }
  /deep/ .el-radio {
    color: #aadaff;
    .el-radio__input.is-checked + .el-radio__label {
      color: #aadaff;
    }
    .el-radio__inner {
      background: none;
    }
  }
  .model-box {
    padding: 0px 60px;
    width: 100%;
    height: calc(100% - 30px);
  }
  .model-map {
    margin: 0px 30px 20px 30px;
    width: calc(100% - 60px);
    height: calc(100% - 120px);
    position: relative;
  }
  .model-footer {
    width: 100%;
    padding: 0px 20px;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
/deep/ .el-input__inner {
  background-color: #172638 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #fff;
}
.list-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
  height: 100%;
  .list-item {
    cursor: pointer;
    flex: 0 0 46%;
    margin: 10px 20px;
    background: url("~@/assets/image/AI/card-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 458px;
    height: 164px;
    display: flex;
    padding: 22px 40px;
    align-items: center;
    .left-box {
      text-align: center;
      .img {
        width: 96px;
        height: 92px;
        border: 1px solid #ccc;
      }
      .text {
        color: #16d0ff;
        padding-top: 7px;
      }
    }

    .right-info {
      padding-left: 44px;
      .item-p {
        color: #fff;
        line-height: 2;
        .label-value {
          color: #01aae5;
        }
      }
    }
  }
}

/deep/ .el-icon-circle-close {
  color: #fff;
}
</style>

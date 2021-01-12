<template>
  <div class="modal-box" v-if="visible">
    <div class="mask"></div>
    <div
      class="modal-container"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba( 0, 0, 0, 0.7)"
    >
      <img
        class="btn-close"
        src="@/assets/image/common/close-btn.png"
        @click="bindBtnClose"
      />
      <div class="form-title">活动报备</div>

      <el-form class="form-box" ref="form" :model="form" label-width="80px">
        <div class="form-left">
          <el-form-item label="活动名称">
            <el-input
              placeholder="请输入活动名称"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动地址" class="address-box">
            <div class="active-address">
              <el-scrollbar style="height:175px;">
                <div
                  class="address-item"
                  v-for="(item, index) in form.activityAddresses"
                  :key="index"
                >
                  <div class="item-content">
                    <div>{{ item.address }}</div>
                    <div>{{ item.video }}</div>
                  </div>
                  <i class="edit el-icon-edit" @click="editAddress(item,index)"></i>
                  <i @click="deleteAddress(index)" class="item-dot"></i>
                </div>
              </el-scrollbar>
            </div>
            <div class="add-btn" @click="addAddress"></div>
            <div class="add-form" v-if="isShowAddressForm">
              <div class="form-item">
                <div class="item-label">活动地址</div>
                <el-input v-model="activeAddressForm.name"></el-input>
              </div>
              <div class="form-item">
                <div class="item-label">经纬度</div>
                <div class="position-box">
                  <el-input v-model="activeAddressForm.position"></el-input>
                  <svg-icon icon-class="getPosition" @click="getPosition" />
                </div>
              </div>
              <div class="form-item">
                <div class="item-label">关联天网视频</div>
                <el-input v-model="activeAddressForm.video"></el-input>
              </div>
              <div class="form-item">
                <div class="item-label">排序</div>
                <el-input placeholder="按数字大小排序" type="number" v-model="activeAddressForm.seq"></el-input>
              </div>

              <div class="add-form-bottom">
                <el-button @click="isShowAddressForm = false">取消</el-button>
                <el-button type="primary"
                  @click="onAddressSubmit"
                  >保存</el-button
                >
              </div>
            </div>
          </el-form-item>

          <el-form-item label="活动时间">
            <el-date-picker
              v-model="form.activityStartTime"
              type="date"
              placeholder="开始时间"
              value-format="yyyy-MM-dd"
            />
            <span style="margin: 0 5px;">至</span>
            <el-date-picker
              v-model="form.activityEndTime"
              type="date"
              placeholder="结束时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="活动类型">
            <el-select v-model="form.type" placeholder="请选择活动类型">
              <el-option label="演唱会" :value="0"></el-option>
              <el-option label="展会" :value="1"></el-option>
              <el-option label="会议" :value="2"></el-option>
              <el-option label="体育赛事" :value="3"></el-option>
              <el-option label="公益活动" :value="4"></el-option>
              <el-option label="节假日活动" :value="5"></el-option>
              <el-option label="其他" :value="6"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动路线">
            <div class="route-box" @click="addActiveRoute">
              <img src="@/assets/image/command/select-active-btn.png" />
              <div class="tip-text">点击选择</div>
            </div>
          </el-form-item>
        </div>

        <div class="form-right">
          <el-form-item label="活动规模">
            <el-select v-model="form.scale" placeholder="请选择活动规模">
              <el-option label="小型" :value="0"></el-option>
              <el-option label="中型" :value="1"></el-option>
              <el-option label="大型" :value="2"></el-option>
              <el-option label="超大型" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="涉及人数">
            <el-input
              placeholder="请输入涉及人数"
              v-model="form.involveNumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="责任领导">
            <div class="leader-box">
              <el-scrollbar style="height:140px;">
                <div
                  class="leader-item"
                  v-for="(item, index) in form.activityLeaders"
                  :key="index"
                >
                  <div >{{ item.leaderName }}</div>
                  <div>{{ item.leaderDistrict }}</div>
                  <div>{{ item.leaderPosition }}</div>
                  <div>{{ item.leaderPhone }}</div>
                  <i class="edit el-icon-edit" @click="editLeader(item,index)"></i>
                  <i class="item-dot" @click="deleteLeader(index)"></i>
                </div>
              </el-scrollbar>
            </div>
            <div class="add-btn" @click="addLead"></div>

            <div class="add-form" v-if="isShowLeaderForm">
              <div class="form-item">
                <div class="item-label">姓名</div>
                <el-input v-model="leaderForm.name"></el-input>
              </div>
              <div class="form-item">
                <div class="item-label">县区/部门</div>
                <el-input v-model="leaderForm.region"></el-input>
              </div>
              <div class="form-item">
                <div class="item-label">职务</div>
                <el-input v-model="leaderForm.post"></el-input>
              </div>
              <div class="form-item">
                <div class="item-label">电话</div>
                <el-input v-model="leaderForm.tel"></el-input>
              </div>
              <div class="form-item">
                <div class="item-label">排序</div>
                <el-input placeholder="按数字大小排序" type="number" v-model="leaderForm.seq"></el-input>
              </div>


              <div class="add-form-bottom">
                <el-button @click="isShowLeaderForm = false">取消</el-button>
                <el-button type="primary"
                  @click="onLeaderSubmit">保存</el-button
                >
              </div>
            </div>
          </el-form-item>

          <el-form-item label="活动简介">
            <el-input type="textarea" v-model="form.introduction"></el-input>
          </el-form-item>

          <el-form-item label="活动状态">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">未开始</el-radio>
              <el-radio :label="1">进行中</el-radio>
              <el-radio :label="2">已结束</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="默认活动">
            <el-radio-group v-model="form.defaultMark">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>

      <div class="bottom-btns">
        <div class="btn btn-cancel" @click="bindBtnClose">取消</div>
        <div class="btn btn-confirm" @click="submit">确定</div>
      </div>
    </div>

    <SelectRouteModal
      :visible.sync="selectRouteModal.visible"
      :info="selectRouteModal.info"
      :nodeList.sync="form.activityRoutes"
    />

    <by-map-fixed-point
      :position.sync="position"
      :visible.sync="dialogMapShow"
      @submit-success="mapDialogSubmit"
    />
  </div>
</template>

<script>
import { addOrUpdateActivityBase } from '@/api/intelligentCommand/command'
import SelectRouteModal from './selectRouteModal'
export default {
  components: {
    SelectRouteModal
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    info: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    visible(val) {
      if (val && this.info) {
        this.form = this.info
        if(!this.info.defaultMark) {
          this.form.defaultMark = 0
        }
      }
    }
  },
  data() {
    return {
      map: null,
      loading: false,
      form: {
        name: '',
        activityAddresses: [],
        activityStartTime: '',
        activityEndTime: '',
        type: '',
        scale: '',
        involveNumber: '',
        activityLeaders: [],
        introduction: '',
        status: 0,
        activityRoutes: [],
        defaultMark: 0
      },
      activeAddressForm: { 
        name: '',
        video: '',
        position: '',
        index: null,
        seq: null
      },
      leaderForm: {
        name: '',
        region: '',
        post: '',
        tel: '',
        index: null,
        seq: null
      },
      isShowAddressForm: false,
      isShowLeaderForm: false,
      selectRouteModal: {
        visible: false,
        info: null
      },
      dialogMapShow: false,
      position: []
    }
  },
  methods: {
    bindBtnClose() {
      this.$emit('update:visible', false)
      this.$EventBus.$emit('updateCommend')
      this.form = {
        name: '',
        activityAddresses: [],
        activity_time: '',
        type: '',
        scale: '',
        involveNumber: '',
        activityLeaders: [],
        introduction: '',
        status: 0,
        activityRoutes: [],
        seq: null
      }
    },
    submit() {
      addOrUpdateActivityBase(this.form).then(res => {
        if (res.status === 200) {
          this.$message.success('修改成功!')
          this.bindBtnClose()
        }
      })
    },
    addLead() {
      this.isShowLeaderForm = true
      // this.leaderForm = {
      //   name: '',
      //   region: '',
      //   post: '',
      //   tel: ''
      // }
    },
    addAddress() {
      this.isShowAddressForm = true
      // this.activeAddressForm = {
      //   name: '',
      //   video: '',
      //   position: ''
      // }
    },
    addActiveRoute() {
      if (!this.form.activityAddresses.length) {
        this.$message.warning('请先增加活动地址！')
        return
      }
      this.selectRouteModal.visible = true
      this.selectRouteModal.info = {
        addressList: this.form.activityAddresses,
        lineList: this.form.activityRoutes
      }
    },
    onAddressSubmit() {
      if(this.activeAddressForm.index !== null) {
        this.deleteAddress(this.activeAddressForm.index)
      }
      this.form.activityAddresses.push({
        address: this.activeAddressForm.name,
        video: this.activeAddressForm.video,
        latitude: this.activeAddressForm.position.split(',')[1],
        longitude: this.activeAddressForm.position.split(',')[0],
        position: this.activeAddressForm.position.split(','),
        seq: this.activeAddressForm.seq
      })
      Object.assign(this.activeAddressForm, {
        name: '',
        video: '',
        position: '',
        index: null,
        seq: null
      })
      this.activeAddressForm
      this.isShowAddressForm = false
    },
    onLeaderSubmit() {
       if(this.leaderForm.index !== null) {
        this.deleteLeader(this.leaderForm.index)
      }
      this.form.activityLeaders.push({
        leaderName: this.leaderForm.name,
        leaderDistrict: this.leaderForm.region,
        leaderPosition: this.leaderForm.post,
        leaderPhone: this.leaderForm.tel,
        seq: this.leaderForm.seq
      })
      this.leaderForm = {
        name: '',
        region: '',
        post: '',
        tel: '',
        index: null,
        seq: null
      }
      this.isShowLeaderForm = false
    },
    // 监听地图弹框选择
    mapDialogSubmit(data) {
      this.activeAddressForm.position = [data.lng, data.lat]
      this.activeAddressForm.position = this.activeAddressForm.position.join(
        ','
      )
      this.dialogMapShow = false
    },
    getPosition() {
      this.dialogMapShow = true
    },
    deleteAddress(index) {
      delete this.form.activityAddresses[index]
      this.form.activityAddresses = this.form.activityAddresses.filter(
        item => item != undefined
      )
    },
    editAddress(item, index) {
      this.isShowAddressForm = true
      this.activeAddressForm = {
        name: item.address,
        video: item.video,
        position: item.longitude+','+item.latitude,
        index: index,
        seq: item.seq
      }
    },
    editLeader(item,index) {
      this.isShowLeaderForm = true
      this.leaderForm = {
        name: item.leaderName,
        region: item.leaderDistrict,
        post: item.leaderPosition,
        tel: item.leaderPhone,
        index: index,
        seq: item.seq
      }
    },
    deleteLeader(index) {
      delete this.form.activityLeaders[index]
      this.form.activityLeaders = this.form.activityLeaders.filter(
        item => item != undefined
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.modal-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 80%;
  background: url("~@/assets/image/gridView/grid-modal.png") no-repeat;
  background-size: 100% 100%;
  z-index: 999;
  padding: 20px 50px;
  color: #fff;
  .btn-close {
    position: absolute;
    top: 23px;
    right: 27px;
    cursor: pointer;
    z-index: 999;
    &:hover {
      filter: brightness(1.2);
    }
  }

  /deep/ .el-input__inner {
    width: 350px;
  }

  /deep/ .el-scrollbar__wrap {
    overflow: auto;
  }

  /deep/ .el-textarea__inner {
    background-color: #011632;
    border: 1px solid #033f7e;
    width: 350px;
  }

  /deep/ .el-range-input {
    background: transparent;
    color: #a9daff;
  }

  /deep/ .el-range-separator {
    color: #a9daff;
  }

  /deep/ .el-radio__label {
    color: #a9daff;
  }

  .form-title {
    font-size: 20px;
    font-weight: 600;
    color: #a9daff;
    padding: 30px 0;
  }

  .form-box {
    display: flex;
    .form-left,
    .form-right {
      flex: 1;
    }
  }

  .active-address {
    width: 350px;
    height: 190px;
    border: 1px solid #033f7e;
    background: #002452;
    padding: 10px 5px 10px 15px;

    .address-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      width: 95%;
      .item-dot {
        margin-left: 10px;
        width: 17px;
        height: 17px;
        background: url("~@/assets/image/command/active-address-close-dot.png")
          no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }

      .item-content {
        line-height: 1.5;
        background: #065eba;
        padding: 5px;
        flex: 0 0 85%;
        border-radius: 4px;
      }
    }
  }

  .leader-box {
    width: 350px;
    height: 150px;
    border: 1px solid #033f7e;
    background: #002452;
    padding: 10px 5px 10px 15px;
    .leader-item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      justify-content: space-around;
      .item-dot {
        width: 17px;
        height: 17px;
        background: url("~@/assets/image/command/active-address-close-dot.png")
          no-repeat;
        background-size: 100% 100%;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }

  .add-btn {
    margin-top: 10px;
    width: 50px;
    height: 35px;
    background: url("~@/assets/image/command/add-active-btn.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .route-box {
    padding: 10px 25px;
    width: 120px;
    height: 120px;
    border: 1px solid #033f7e;
    cursor: pointer;
    .tip-text {
      color: #a9daff;
    }
  }

  .bottom-btns {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    .btn {
      width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      background: url("~@/assets/image/command/active-submitBtn-bg.png")
        no-repeat 0 0/100% 100%;

      &:first-child {
        margin-right: 25px;
      }
    }
  }

  .address-box {
    position: relative;
  }

  .position-box {
    display: flex;
    align-items: center;

    .svg-icon {
      color: #00d8ff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .add-form {
    position: absolute;
    z-index: 99;
    padding: 20px;
    left: 10px;
    top: 72px;
    background-color: #082d72;
    width: 420px;
    border-radius: 6px;

    .add-form-bottom {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      /deep/ .el-button:first-child {
        background-color: #013c7a;
        border: 1px solid #033f7e;
      }

      /deep/ .el-button:last-child {
        background-color: #0055ff;
        border: 1px solid #033f7e;
      }
    }
  }
}
/deep/.el-date-editor {
  width: 30%;
  /deep/.el-input__inner {
    width: 100% !important;
  }
}
.edit {
  margin-left: 5px;
  font-weight: bold; 
  color: #065EBA;
  cursor: pointer;
}
</style>

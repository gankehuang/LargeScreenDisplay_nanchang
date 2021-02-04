<template>
  <div
    v-if="visible"
    class="mask-container shade"
  >
    <div class="mask" />
    <transition name="fade">
      <div
        v-loading="loading"
        class="modal-container"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba( 0, 0, 0, 0.7)"
      >
        <div class="title">
          人员信息
        </div>
        <div
          class="modal-close"
          @click="closeModal"
        >
          <i class="iconfont el-icon-close" />
        </div>
        <div class="modal-content">
          <div class="left-content">
            <div class="item">
              <span class="label-text">姓名：</span>
              <span class="value-text">{{ personInfo.name | hideName }}</span>
            </div>
            <div class="item">
              <span class="label-text">手机号码: </span>
              <span class="value-text">{{ personInfo.tel | hidePhone }}</span>
            </div>
            <div class="item">
              <span class="label-text">重点关注类型：</span>
              <span class="value-text">{{ personInfo.followType }}</span>
            </div>
            <div class="item">
              <span class="label-text">身份证号: </span>
              <span class="value-text">{{
                personInfo.idCard | hideIdCard
              }}</span>
            </div>
            <div
              class="item"
              style="flex: 0 0 100%;"
            >
              <span class="label-text">户籍地址：</span>
              <span class="value-text">{{
                personInfo.householdRegister || "江西省青山湖区"
              }}</span>
            </div>
            <div
              class="item"
              style="flex: 0 0 100%;"
            >
              <span class="label-text">家庭住址: </span>
              <span class="value-text">{{ personInfo.address || "--" }}</span>
            </div>
          </div>

          <div class="right-content">
            <el-image
              style="height:144px;width:110px;margin-left: 80px;"
              :z-index="9999"
              :src="personInfo.img"
              :preview-src-list="[personInfo.img]"
            />

            <div
              class="look-trajectory"
              @click="showPath()"
            >
              人员轨迹
            </div>
            <div
              class="look-trajectory"
              @click="showPath(1)"
            >
              车辆轨迹
            </div>
          </div>
        </div>
        <div class="snap-list">
          <div class="snap-title">
            最近抓拍
          </div>
          <div
            v-if="snapList.length > 0"
            style="width: 100%;height: 427px;"
          >
            <el-scrollbar style="height: 100%;">
              <div class="snap-center">
                <div
                  v-for="(item, index) in snapList"
                  :key="index"
                  class="snap-img"
                >
                  <el-image
                    style="width: 100px;height: 107px;display: block;"
                    :src="item.imageUrl"
                    :preview-src-list="[item.imageUrl]"
                  />
                  <div class="time">
                    <span>{{ getSimilarity(item.similarity) }}%</span>
                    {{ item.alarmTime.substring(5, 10) }}
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div
            v-else
            class="none"
          >
            暂无近日抓拍数据
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { queryPeopleRecord } from '@/api/riskPrevention/importPeople'
import { getZhqInfo } from '@/api/riskPrevention/conflict'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object
    }
  },
  data () {
    return {
      snapList: [],
      loading: false,
      personInfo: {
        name: '',
        tel: '',
        followType: '',
        idCard: '',
        householdRegister: '',
        address: '',
        img: '',
        imgbase64: ''
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.personInfo = this.$options.data().personInfo
        this.getPersonInfo()
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('update:visible', false)
    },
    async getPersonInfo () {
      this.loading = true
      const { status, data } = await getZhqInfo({ id: this.info.id })

      if (status === 200) {
        this.personInfo = {
          name: data[0].xm,
          tel: data[0].phone,
          followType: data[0].memo,
          idCard: data[0].gmsfzhm,
          householdRegister: '',
          address: data[0].residenceaddr,
          img: 'http://172.11.16.241:5054' + data[0].xp,
          imgbase64: data[0].imgbase64
        }
      }
      this.getSnapList()
    },
    showPath (type) {
      this.$emit('showPath', this.personInfo, type)
      this.closeModal()
    },
    getSimilarity (si) {
      let similarity = si * 100
      similarity = similarity.toString()
      similarity = similarity.substring(0, 5)
      return similarity
    },
    getSnapList () {
      const fd = {
        certificateNumber: this.personInfo.idCard,
        beginTime: '2020-01-01 00:00:00',
        endTime: '2021-10-25 00:00:00'
      }
      queryPeopleRecord(1, 50, fd).then((res) => {
        this.loading = false
        if (res.data.list) {
          this.snapList = res.data.list
          this.personInfo.img === '' ? this.snapList[0].imageUrl : null
        } else {
          this.snapList = []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.shade {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.modal-container {
  width: 964px;
  height: 737px;
  padding: 0 30px;
  background: url('~@/assets/image/importPeople/iconModal-bg.png') no-repeat
    center center;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 9999;
  overflow: hidden;
  .title {
    position: relative;
    padding: 30px 0 0 10px;
    line-height: 28px;
    font-size: 16px;
    color: #a9daff;
    border-bottom: 1px solid #024081;
    &:after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 130px;
      height: 6px;
      background: url('~@/assets/image/importPeople/title-bg.png') no-repeat
        center;
      background-size: 100% 100%;
    }
  }
  .modal-close {
    position: absolute;
    top: 24px;
    right: 30px;
    color: #3b9afe;
    cursor: pointer;
    .el-icon-close {
      font-weight: bold;
    }
    .el-icon-close:before {
      font-size: 24px;
    }
  }

  .modal-content {
    display: flex;
    padding: 15px;
    .left-content {
      color: #a9daff;
      display: flex;
      flex-wrap: wrap;
      flex: 0 0 77%;
      align-self: flex-start;
      .item {
        flex: 0 0 50%;
        // margin-top: 10px;'
        line-height: 36px;
        padding-right: 20px;
        font-size: 16px;
      }
    }

    .look-trajectory {
      position: absolute;
      right: 326px;
      top: 195px;
      width: 104px;
      height: 34px;
      line-height: 34px;
      background: url('~@/assets/image/importPeople/gj-button.png') no-repeat
        center;
      background-size: 100% 100%;
      text-align: center;
      color: #3b9afe;
      cursor: pointer;
      &:last-child {
        right: 198px;
      }
    }
  }
  .snap-list {
    margin: 10px;
    height: 461px;
    border: 1px solid #3b9afe;
    .snap-title {
      line-height: 33px;
      padding-left: 10px;
      font-size: 14px;
      color: #a9daff;
      border-bottom: 1px solid #3b9afe;
    }
    .none {
      line-height: 80px;
      font-size: 30px;
      color: #a9daff;
      font-weight: bold;
      text-align: center;
    }
    .snap-center {
      display: flex;
      flex-wrap: wrap;
      padding: 6px;
      overflow-x: hidden;
      .snap-img {
        margin: 4px;
      }
      .time {
        line-height: 20px;
        background: #004792;
        display: flex;
        padding: 0 3px;
        font-size: 12px;
        color: #a9daff;
        span {
          flex: 1;
          color: #17fbff;
        }
      }
    }
  }
}
/deep/.el-scrollbar__wrap {
  overflow: auto;
}
</style>

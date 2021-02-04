<template>
  <Dialog
    v-if="info"
    width="60%"
    top="5vh"
    title="人员信息弹窗"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @open="openBefore"
  >
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
          :src="personInfo.img?personInfo.img:require('@/assets/image/importPeople/avatar.png')"
          :preview-src-list="personInfo.img?[personInfo.img]:[]"
        />

        <div class="trajectory-btn-box">
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
    </div>
    <div class="snap-list">
      <div class="snap-title">
        最近抓拍
      </div>
      <div
        v-if="snapList.length > 0"
        style="width:100%;height:427px;"
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
                :preview-src-list="[item.bkgUrl ? item.bkgUrl : item.imageUrl]"
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
  </Dialog>
</template>

<script>
import {
  getMentalInfo,
  getAcceptInfo,
  getCorrectionInfo,
  getReleaseInfo,
  getVeteransInfo,
  queryPeopleRecord
} from '@/api/riskPrevention/importPeople'
export default {
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      snapList: [],
      loading: false,
      dialogVisible: false,
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
  methods: {
    openBefore () {
      this.getPersonInfo()
    },
    // 打开弹框
    openModal () {
      this.dialogVisible = true
    },
    // 关闭弹框
    closeModal () {
      this.dialogVisible = false
      this.personInfo = this.$options.data().personInfo
    },
    async getPersonInfo () {
      this.loading = true
      switch (this.info.curPageType) {
        case 'mentalDisease':
          await getMentalInfo({
            id: this.info.id
          }).then((res) => {
            const { status, data } = res
            if (status === 200) {
              const info = data[0]
              if (info) {
                this.personInfo = {
                  name: info.phychosis_NAME,
                  tel: info.phychosis_TEL,
                  followType: info.mental_SUB,
                  idCard: info.id_CARD,
                  householdRegister: '',
                  address: '',
                  img: info.img,
                  imgbase64: info.imgbase64
                }
              }
            }
          })
          break

        case 'petitionLetter':
          await getAcceptInfo({
            id: this.info.id
          }).then((res) => {
            const { status, data } = res
            if (status === 200) {
              const info = data[0]
              if (info) {
                this.personInfo = {
                  name: info.name,
                  tel: '',
                  followType: info.demands,
                  idCard: info.id_CARD,
                  householdRegister: info.address,
                  address: info.work_UNIT,
                  img: info.img,
                  imgbase64: info.imgbase64
                }
              }
            }
          })
          break

        case 'retire':
          await getVeteransInfo({
            id: this.info.id
          }).then((res) => {
            const { status, data } = res
            if (status === 200) {
              const info = data[0]
              if (info) {
                this.personInfo = {
                  name: info.name,
                  tel: '',
                  followType: info.p_TYPE,
                  idCard: info.id_CARD,
                  householdRegister: info.household,
                  address: '',
                  img: info.img,
                  imgbase64: info.imgbase64
                }
              }
            }
          })
          break

        case 'released':
          await getReleaseInfo({
            id: this.info.id
          }).then((res) => {
            const { status, data } = res
            if (status === 200) {
              const info = data[0]
              if (info) {
                this.personInfo = {
                  name: info.name,
                  tel: '-',
                  followType: this.info.curPageType,
                  idCard: info.id_CARD,
                  householdRegister: '',
                  address: info.household,
                  img: '',
                  imgbase64: info.imgbase64
                }
              }
            }
          })
          break

        case 'correct':
          await getCorrectionInfo({
            id: this.info.id
          }).then((res) => {
            const { status, data } = res
            if (status === 200) {
              const info = data[0]
              this.personInfo = {
                name: info.name,
                tel: '',
                followType: info.employer_TYPE,
                idCard: info.id_CARD,
                householdRegister: '',
                address: info.household,
                img: '',
                imgbase64: info.imgbase64
              }
            }
          })
          break
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
        if (res.data && res.data.list) {
          this.snapList = res.data.list
          if (this.personInfo.img === '') {
            this.personInfo.img = this.snapList[0].imageUrl
          }
        } else {
          this.snapList = []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow: auto;
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
      line-height: 36px;
      padding-right: 20px;
      font-size: 16px;
    }
  }

  .trajectory-btn-box {
    display: flex;
    margin-top: 20px;
    .look-trajectory {
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
        margin-left: 20px;
      }
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
</style>

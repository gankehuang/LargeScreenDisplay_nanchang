<template>
  <div
    v-if="visible"
    v-loading="loading"
    class="mask-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="transparent"
  >
    <div class="mask" />
    <div class="event-info-modal">
      <div
        class="close"
        @click="close"
      />
      <div class="title-block">
        中华情动态预警
      </div>
      <div class="peo-list">
        <div class="title">
          聚集人员
        </div>
        <div class="list">
          <div
            v-for="(item,index) in peoList"
            :key="index"
            class="list-item"
            :class="{'active':selectedItem.gmsfzhm===item.gmsfzhm}"
            @click="selectPer(item)"
          >
            <el-image
              class="el-image"
              :preview-src-list="[item.xp]"
              :src="item.xp"
            />
            <div class="info">
              <div class="name">
                {{ item.xm }}
              </div>
              <div class="sex">
                <span>性别:</span>
                {{ item.sex }}
              </div>
              <div class="age">
                <span>年龄:</span>
                {{ item.age }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line" />
      <div class="per-info-details">
        <div class="title">
          基本信息
        </div>
        <div class="info-details">
          <div class="row">
            <span>姓名:</span>
            {{ selectedItem.xm | hideName }}
          </div>
          <div class="row">
            <div class="col">
              <span>户籍地址:</span>
              {{ selectedItem.residenceaddr | hideAddress }}
            </div>
            <div class="col">
              <span>联系电话:</span>
              {{ selectedItem.phone | hidePhone }}
            </div>
          </div>
          <div class="row">
            <div class="col">
              <span>家庭住址:</span>
              {{ selectedItem.householdaddr }}
            </div>
            <div class="col">
              <span>身份证号码:</span>
              {{ selectedItem.gmsfzhm | hideIdCard }}
            </div>
          </div>
        </div>
        <div class="title">
          最近抓拍
          <div class="buttons">
            <div
              class="button"
              @click="showPath()"
            >
              人员轨迹
            </div>
            <div
              class="button"
              @click="showPath(1)"
            >
              车辆轨迹
            </div>
          </div>
        </div>
        <div
          v-loading="captureArrLoading"
          class="
              capture-details"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="transparent"
        >
          <div
            v-for="(item,index) in captureArr"
            :key="index"
            class="el-image-container"
          >
            <el-image
              class="el-image"
              :src="item.imageUrl"
              :preview-src-list="[item.imageUrl]"
            />
            <div class="data">
              <span>{{ getSimilarity(item.similarity) }}%</span>
              <span>{{ item.alarmTime.substring(5, 10) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IdCard } from '@/utils/idCard'
import { getZhqInfoByIdCards } from '@/api/riskPrevention/conflict'
import { queryPeopleRecord } from '@/api/riskPrevention/importPeople'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      selectedItem: {},
      peoList: [],
      captureArr: [],
      captureArrLoading: false
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.loading = true
        this.handleGetZhqInfoByIdCards()
      }
    },
    peoList (arr) {
      if (arr && arr.length > 0) {
        this.selectedItem = arr[0]
        this.hadnleQueryPeopleRecord()
        this.loading = false
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    selectPer (item) {
      this.selectedItem = item
      this.hadnleQueryPeopleRecord()
    },
    showPath (type) {
      this.$emit('showPath', this.selectedItem, type)
      this.close()
    },
    // 处理照片相似度字符串
    getSimilarity (si) {
      let similarity = si * 100
      similarity = similarity.toString()
      similarity = similarity.substring(0, 5)
      return similarity
    },
    // 处理人员具体信息
    handleDataToPeoList (data) {
      this.peoList = data.map((item) => {
        return {
          xm: item.xm,
          xp: item.xp,
          phone: item.phone,
          residenceaddr: item.residenceaddr,
          householdaddr: '-',
          gmsfzhm: item.gmsfzhm,
          idCard: item.gmsfzhm,
          imgbase64: item.imgbase64,
          sex: IdCard(item.gmsfzhm, 2),
          age: IdCard(item.gmsfzhm, 3)
        }
      })
    },
    // 根据聚集人员身份证号获取人员详情
    async handleGetZhqInfoByIdCards () {
      const idCards = this.info.peopleIdNumber.split(',')
      const { status, data } = await getZhqInfoByIdCards(idCards)
      if (status === 200) {
        this.handleDataToPeoList(data)
      }
    },
    // 获取当前选中人懒抓拍记录
    async hadnleQueryPeopleRecord () {
      this.captureArrLoading = true
      const params = {
        certificateNumber: this.selectedItem.gmsfzhm,
        beginTime: '2020-01-01 00:00:00',
        endTime: '2021-10-25 00:00:00'
      }
      const { status, data } = await queryPeopleRecord(1, 50, params)
      this.captureArrLoading = false
      if (status === 200) {
        this.captureArr = data.list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.event-info-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  margin: auto;
  width: 1350px;
  height: 828px;
  background: url('~@/assets/image/conflict/组 9.png') center center / 100% 100%
    no-repeat;
}
.title-block {
  position: absolute;
  width: 616px;
  height: 77px;
  top: 0px;
  left: 50%;
  margin-left: -308px;
  background: url('~@/assets/image/conflict/标题.png') center center / 100% 100%
    no-repeat;
  text-align: center;
  line-height: 77px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 80px;
}
/*关闭按钮*/
.close::before,
.close::after {
  content: '';
  width: 2px;
  height: 20px;
  background: #3b9afe;
  position: absolute;
  top: 11px;
  left: 22px;
}
.close::before {
  transform: rotate(45deg);
}
.close::after {
  transform: rotate(-45deg);
}
.line {
  position: absolute;
  top: 129px;
  left: 486px;
  width: 1px;
  height: 593px;
  background: linear-gradient(
    244deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(63, 138, 238, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}
.peo-list {
  position: absolute;
  top: 103px;
  left: 96px;
  .title {
    width: 304px;
    height: 36px;
    line-height: 36px;
    padding-left: 22px;
    background: url('~@/assets/image/conflict/圆角矩形 1 拷贝.png') center
      center / 100% 100% no-repeat;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #a9daff;
  }
  .list {
    height: 580px;
    margin: 17px 0 0 17px;
    overflow-y: auto;
  }
  /* 设置滚动条的样式 */
  .list::-webkit-scrollbar {
    width: 12px;
  }

  /* 滚动槽 */
  .list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  .list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #04335d;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  .list-item {
    width: 284px;
    height: 174px;
    padding: 30px 0 0 27px;
    cursor: pointer;
    background: url('~@/assets/image/conflict/组 4.png') center center / 100%
      100% no-repeat;
    display: flex;
    .el-image {
      width: 84px;
      height: 113px;
    }
    .info {
      margin-left: 20px;
      width: 100px;
    }
    .name {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #a9daff;
      line-height: 56px;
    }
    .sex,
    .age {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #a9daff;
      line-height: 26px;
      span {
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
  .list-item.active {
    background: url('~@/assets/image/conflict/组 4(1).png') center center / 100%
      100% no-repeat;
  }
}

.per-info-details {
  position: absolute;
  top: 103px;
  left: 537px;
  width: 100%;
  .title {
    position: relative;
    width: 662px;
    height: 36px;
    line-height: 36px;
    padding-left: 19px;
    background: url('~@/assets/image/conflict/圆角矩形 1 拷贝.png') center
      center / 100% 100% no-repeat;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #a9daff;
    .buttons {
      position: absolute;
      top: 0;
      right: 0;
      .button {
        cursor: pointer;
        display: inline-block;
        width: 100px;
        height: 30px;
        text-align: center;
        margin: 0 5px;
        line-height: 30px;
        background: url('~@/assets/image/conflict/组 106(2).png') center center /
          100% 100% no-repeat;
        font-size: 16px;
        color: #3b9afe;
      }
      .button:hover {
        color: #3be9fe;
        background: url('~@/assets/image/conflict/组 106(1).png') center center /
          100% 100% no-repeat;
      }
    }
  }
  .info-details {
    margin: 34px 0 26px 24px;
    width: 640px;
  }
  .row {
    width: 100%;
    display: flex;
    color: #a9daff;
    line-height: 36px;
    font-size: 16px;
    span {
      font-size: 16px;
      display: inline-block;
      margin-right: 10px;
      color: #7fbdff;
    }
  }
  .col {
    font-size: 16px;
    flex: 0.5;
    span {
      font-size: 16px;
      display: inline-block;
      margin-right: 10px;
      color: #7fbdff;
    }
  }
  .capture-details {
    margin: 26px 0 0 19px;
    // display: flex;
    width: 650px;
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    // flex-wrap: wrap;
    height: 350px;
    overflow-y: auto;
    .el-image-container {
      margin: 5px 3px;
      width: 120px;
      height: 151px;
      position: relative;
      display: inline-block;
    }
    .el-image {
      width: 100%;
      height: 100%;
    }
    .data {
      width: 100%;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      z-index: 2;
      background: #004792;
      span {
        width: 50%;
      }
      span:nth-of-type(1) {
        text-align: left;
        color: #17fbff;
      }
      span:nth-of-type(2) {
        text-align: right;
        color: #a9daff;
      }
    }
  }
  /* 设置滚动条的样式 */
  .capture-details::-webkit-scrollbar {
    width: 12px;
  }

  /* 滚动槽 */
  .capture-details::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  .capture-details::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #04335d;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
}
</style>

<template>
  <div class="win-info">
    <div class="title">走访情况</div>
    <div class="drop">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ level }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="tabLevel(item)"
            v-for="(item, index) in levelList"
            :key="index"
            >{{ item }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="list-item" v-for="(item, index) in this.nameList" :key="index">
      <span class="item-name">{{ item }}</span>
      <div style="flex: 0 0 calc(100% - 70px);display:flex;">
        <el-progress
          :style="{ width: widthList[index] }"
          :text-inside="true"
          :stroke-width="18"
          :title="getPercentage(index) + '%'"
          :percentage="getPercentage(index)"
          color="#3B9AFE"
        ></el-progress>
        <span class="item-total">{{ dataList[index] }}</span>
      </div>
    </div>

    <div class="legand">
      <div class="item">
        <span></span>
        已走访
      </div>
      <div class="item">
        <span style="background: #fff;"></span>
        应走访
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalList: [283, 239, 192, 173, 163, 161, 124, 121, 99, 97, 92, 91],
      totalList1: [279, 237, 183, 170, 159, 159, 122, 117, 98, 90, 90, 88],
      dataList: [283, 239, 192, 173, 163, 161, 124, 121, 99, 97, 92, 91],
      dataList1: [279, 237, 183, 170, 159, 159, 122, 117, 98, 90, 90, 88],
      nameList: [
        '青山湖区',
        '新建区',
        '南昌县',
        '安义县',
        '经开区',
        '青云谱区',
        '高新区',
        '进贤县',
        '红谷滩区',
        '湾里局',
        '西湖区',
        '东湖区'
      ],
      title: '精神病患者',
      level: '总数',
      levelList: ['总数', '3级', '4级', '5级'],
      percentageList: [],
      widthList: []
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    getPercentage(val) {
      return this.percentageList[val]
    },
    tabLevel(item) {
      this.level = item
      this.dataList = []
      this.dataList = []
      switch (this.level) {
        case '3级':
          for (let i = 0; i < 12; i++) {
            this.dataList[i] = parseInt(this.totalList[i] * 0.3)
            this.dataList1[i] = parseInt(this.totalList1[i] * 0.28)
          }
          break
        case '4级':
          for (let i = 0; i < 12; i++) {
            this.dataList[i] = parseInt(this.totalList[i] * 0.4)
            this.dataList1[i] = parseInt(this.totalList1[i] * 0.39)
          }
          break
        case '5级':
          for (let i = 0; i < 12; i++) {
            this.dataList[i] = parseInt(this.totalList[i] * 0.2)
            this.dataList1[i] = parseInt(this.totalList1[i] * 0.19)
          }
          break
        case '总数':
          this.dataList = this.totalList
          this.dataList1 = this.totalList1
          break
      }
      this.getList()
    },
    getList() {
      this.percentageList = []
      this.widthList = []
      this.dataList.forEach((item, index) => {
        let count = 100
        let wid = 0
        if (this.dataList1[index] / item) {
          count = parseInt((this.dataList1[index] / item) * 100)
        }
        if (item / this.dataList[0]) {
          wid = parseInt((item / this.dataList[0]) * 100)
        }
        this.percentageList.push(count)
        this.widthList.push(wid + '%')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.win-info {
  padding: 50px 30px 10px 20px;
  position: relative;
  width: 420px;
  height: 507px;
  background: url("~@/assets/image/importPeople/long-bg.png") no-repeat center
    center;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 20px;
  }
}
.drop {
  position: absolute;
  right: 0px;
  top: 13px;
  z-index: 40;
}
.el-dropdown {
  margin-right: 20px;
}
.el-dropdown-link {
  display: inline-block;
  width: 110px;
  line-height: 31px;
  text-align: center;
  font-size: 12px;
  color: #b2d9fb;
  background: url("~@/assets/image/importPeople/button-bg.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}
.el-progress {
  width: 100%;
  // height: 20px;
  display: inline-block;
}
/deep/.el-progress-bar__outer {
  // background: #031c3e;
}
/deep/.el-progress-bar__innerText {
  // color: #031336;
  font-weight: bold;
}
/deep/.el-form-item {
  margin: 0;
  color: #fff;
}
/deep/.el-form-item__label {
  color: #fff;
}
.counts {
  margin: 55px 10px 0 5px;
  line-height: 34px;
  font-size: 14px;
  color: #fff;
}
.legand {
  position: absolute;
  bottom: 20px;
  right: 42%;
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
/deep/.el-form-item__content {
  width: 80%;
  margin-bottom: 2px;
}
/deep/.el-progress-bar__outer {
  background: #a9daff;
}

.list-item {
  display: flex;
  margin-bottom: 16px;
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
</style>

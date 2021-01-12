<template>
  <div class="win-info">
    <div class="title">县区关爱小组配备情况</div>
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
        已配备
      </div>
      <div class="item">
        <span style="background: #fff;"></span>
        应配备
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  mounted() {
    this.getList()
  },
  data() {
    return {
      totalList: [283, 239, 192, 173, 163, 161, 124, 121, 99, 97, 92, 91],
      totalList1: [273, 232, 185, 165, 156, 152, 118, 112, 93, 89, 84, 82],
      dataList: [283, 239, 192, 173, 163, 161, 124, 121, 99, 97, 92, 91],
      dataList1: [273, 232, 185, 165, 156, 152, 118, 112, 93, 89, 84, 82],
      dataList3: [271, 223, 186, 161, 153, 151, 115, 112, 89, 83, 83, 82],
      dataList4: [272, 226, 183, 158, 152, 150, 113, 110, 86, 85, 82, 80],
      dataList2: [271, 226, 183, 163, 153, 153, 116, 116, 86, 86, 82, 81],
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
      percentageList: [],
      widthList: [],
      title: '精神病患者',
      level: '法定监护人',
      levelList: ['法定监护人', '精防人员', '社区干部', '社区民警']
    }
  },
  methods: {
    _compare() {
      return function(a, b) {
        return a - b
      }
    },
    getPercentage(val) {
      return this.percentageList[val]
    },
    tabLevel(item) {
      this.level = item
      switch (this.level) {
        case '法定监护人':
          this.dataList = this.totalList
          this.dataList1 = this.totalList1
          break
        case '精防人员':
          this.dataList1 = this.dataList2
          break
        case '社区干部':
          this.dataList1 = this.dataList3
          break
        case '社区民警':
          this.dataList1 = this.dataList4
          break
        default:
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
  padding: 60px 30px 10px 20px;
  position: relative;
  width: 420px;
  height: 565px;
  top: 10px;
  background: url("~@/assets/image/importPeople/js-left2-bg.png") no-repeat
    center center;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 15px;
    left: 5px;
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
    background: url("~@/assets/image/importPeople/button-bg.png") no-repeat
      center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
.el-progress {
  width: 100%;
  display: inline-block;
}
/deep/.el-progress-bar__innerText {
  font-weight: bold;
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
</style>

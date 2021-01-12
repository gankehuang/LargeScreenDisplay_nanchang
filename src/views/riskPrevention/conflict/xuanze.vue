<template>
  <div class="populations">
    <el-dropdown @command="hanleCommand">
      <span class="el-dropdown-link">
        {{ area }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu
        slot="dropdown"
        style="width: 100px;
    text-align: center;
     "
      >
        <el-dropdown-item
          :command="item"
          @click.native="areaClick(index)"
          v-for="(item, index) in areaList"
          :key="index"
          >{{ item }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown v-show="showTime">
      <span class="el-dropdown-link">
        {{ time }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu
        slot="dropdown"
        style="width: 80px;
    text-align: center;
     "
      >
        <el-dropdown-item
          @click.native="timeclick(index)"
          v-for="(item, index) in timeList"
          :key="index"
          >{{ item }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown v-show="showkind">
      <span class="el-dropdown-link">
        {{ kind }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu
        slot="dropdown"
        style="width: 80px;
    text-align: center;
    "
      >
        <el-dropdown-item
          @click.native="kindClick(index)"
          v-for="(item, index) in kindList"
          :key="index"
          >{{ item }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      area: '截至当前',
      areaList: ['截至当前', '按年月'],
      time: '2020',
      timeList: ['2020', '2019', '2018', '2017', '2016'],
      kind: '全年',
      kindList: [
        '全年',
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      showTime: false,
      showkind: false
    }
  },
  methods: {
    hanleCommand(e) {
      if (e === '截至当前') {
        this.showkind = false
        this.showTime = false
      } else {
        this.showkind = true
        this.showTime = true
      }
    },
    areaClick(index) {
      // console.log(item)
      this.area = this.areaList[index]
    },
    kindClick(index) {
      this.kind = this.kindList[index]
    },
    timeclick(index) {
      this.time = this.timeList[index]
    }
  }
}
</script>
<style lang="scss" scoped>
.populations {
  width: 40%;
  position: absolute;
  top: 135px;
  left: 450px;
}
.el-dropdown-link {
  display: inline-block;
  width: 100px;
  font-size: 16px;
  font-weight: 400;
  color: #a9daff;
  line-height: 31px;
  text-align: center;
  background-color: #002655;
  background-size: 100% 100%;
  cursor: pointer;
}
</style>

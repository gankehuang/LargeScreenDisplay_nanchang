<template>
  <InfoBlock
    title="走访情况"
    height="507px"
    :bg-url="require('@/assets/image/common/info-block-middle-bg.png')"
  >
    <template v-slot:topRight>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ level }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in levelList"
            :key="index"
            @click.native="tabLevel(item)"
          >
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>

    <div class="list-container">
      <div
        v-for="(item, index) in nameList"
        :key="index"
        class="list-item"
      >
        <span class="item-name">{{ item }}</span>
        <div class="item-progress">
          <el-progress
            :style="{ width: widthList[index] }"
            :text-inside="true"
            :stroke-width="15"
            :percentage="getPercentage(index)"
          />
          <span class="item-total">{{ dataList[index] }}</span>
        </div>
      </div>
    </div>

    <div class="legand-box">
      <div class="item-legand">
        <span class="item-dot" />
        <span>已走访</span>
      </div>
      <div class="item-legand">
        <span class="item-dot" />
        <span>应走访</span>
      </div>
    </div>
  </InfoBlock>
</template>

<script>
export default {
  data () {
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
  mounted () {
    this.getList()
  },
  methods: {
    getPercentage (val) {
      return this.percentageList[val]
    },
    tabLevel (item) {
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
    getList () {
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
.el-dropdown-link {
  display: inline-block;
  width: 110px;
  line-height: 31px;
  text-align: center;
  font-size: 12px;
  color: #b2d9fb;
  background: url("~@/assets/image/importPeople/js-left2-bg.png") no-repeat
  center;
  background-size: 100% 100%;
  cursor: pointer;
}

.list-container {
  width: 100%;
  margin-top: 20px;
  .list-item {
    display: flex;
    margin-bottom: 15px;
    .item-name {
      color: #fff;
      flex: 0 0 85px;
    }

    .item-progress {
      display: flex;
      flex: 0 0 calc(100% - 100px);
      ::v-deep .el-progress-bar__inner {
        background: linear-gradient(90deg, #3B9AFE 0%, #00FFFF 100%);
        border-radius: 0;
      }
      ::v-deep .el-progress-bar__outer {
        background-color: #0075AB;
        border-radius: 0;
      }
      ::v-deep .el-progress-bar__innerText {
        color: #031C3C;
      }
    }

    .item-total {
      margin-left: 13px;
      color: #FEFFFF;
      font-size: 16px;
      font-weight: 500;
      text-align: right;
    }
  }
}

.legand-box {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  .item-legand {
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    margin-right: 15px;
    .item-dot {
      margin-right: 8px;
      width: 8px;
      height: 8px;
      background: linear-gradient(90deg, #3B9AFE 0%, #00FFFF 100%);
    }

    &:last-child {
      .item-dot {
        background: #0075AB;
      }
    }
  }
}

</style>

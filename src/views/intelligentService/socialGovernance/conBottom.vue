<template>
  <div class="conBottom">
    <p class="title">
      统计截止至：{{ nowDateTime }}
    </p>
    <div class="drop">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ level }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="width: 109px;text-align: center;line-height: 36px;background:#00225C;border-radius: 6px;border: 1px solid #559AF6;"
        >
          <el-dropdown-item
            v-for="(item, index) in levelList"
            :key="index"
            @click.native="tabLevel(item)"
          >
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <button class="search-btn">
        查询
      </button>
    </div>
    <div class="btm-box">
      <div class="box-left">
        <div>
          <div class="box-left-one">
            <p>394<span>个</span></p>
            <p>联动县区、部门总数</p>
          </div>
          <div class="box-left-one">
            <p>35.4<span>%</span></p>
            <p>网格员处置事件占比</p>
          </div>
        </div>
        <div class="box-table">
          <el-scrollbar style="height:100%;width:100%;">
            <el-table
              stripe
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                label="序号"
                type="index"
              />
              <el-table-column
                prop="date"
                label="县区"
              />
              <el-table-column
                prop="name"
                label="处置率"
              />
              <el-table-column
                prop="address"
                label="处置数量"
              />
            </el-table>
          </el-scrollbar>
        </div>
      </div>
      <div class="box-right">
        <div>
          <div class="box-left-one">
            <p>27.56<span>%</span></p>
            <p>事件中矛盾纠纷占比</p>
          </div>
          <div class="box-left-one">
            <p>98.92<span>%</span></p>
            <p>矛盾纠纷化解率</p>
          </div>
        </div>
        <div class="box-table">
          <el-scrollbar style="height:100%;width:100%;">
            <el-table
              stripe
              :data="tableData1"
              style="width: 100%"
            >
              <el-table-column
                label="序号"
                type="index"
              />
              <el-table-column
                prop="date"
                label="类型"
              />
              <el-table-column
                prop="name"
                label="占比"
              />
              <el-table-column
                prop="num"
                label="化解率"
              />
              <el-table-column
                prop="address"
                label="数量"
              />
            </el-table>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nowDateTime: '',
      level: '截止当前',
      levelList: ['截止当前', '按年', '按月'],
      tableData: [
        {
          date: '高新区',
          name: '98.5 %',
          address: '61060'
        },
        {
          date: '西湖区',
          name: '96.06 %',
          address: '135286'
        },
        {
          date: '青山湖区',
          name: '95.58 %',
          address: '92219'
        },
        {
          date: '青云谱区',
          name: '95.36 %',
          address: '76242'
        },
        {
          date: '经开区',
          name: '95.06 %',
          address: '36108'
        }
      ],
      tableData1: [
        {
          date: '邻里纠纷',
          name: '81.92 %',
          num: '98.89 %',
          address: '183798'
        },
        {
          date: '物权相关纠纷',
          name: '5.11 %',
          num: '99.63 %',
          address: '11475'
        },
        {
          date: '婚姻家庭纠纷',
          name: '3.89 %',
          num: '98.71 %',
          address: '8727'
        }
      ]
    }
  },
  created () {
    console.log(new Date())
    this.getTime()
  },
  methods: {
    tabLevel (item) {
      this.level = item
    },

    getTime () {
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      const ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      this.nowDateTime =
        yy + '年 ' + mm + '月' + dd + '日 ' + hh + ':' + mf + ':' + ss
    }
  }
}
</script>

<style lang="scss" scoped>
.conBottom {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    margin: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    line-height: 18px;
  }
  .drop {
    position: absolute;
    right: 15px;
    top: 13px;
    z-index: 40;
  }
  .el-dropdown {
    margin-right: 9px;
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
  .search-btn {
    width: 60px;
    height: 29px;
    border-radius: 5px;
    background-color: #2365af;
    border: 1px solid #16599d;
    color: #fff;
  }
  .btm-box {
    width: 100%;
    height: 410px;
    display: flex;
  }
  .box-left,
  .box-right {
    width: 50%;
    height: 95%;
  }
  .box-left,
  .box-right {
    background: url("~@/assets/image/intelligentService/left-line.png")
      no-repeat;
    background-size: 2px 100%;
    background-position: right;
    display: flex;
    align-items: center;
    .box-left-one {
      width: 200px;
      padding-bottom: 15px;
      margin-bottom: 20px;
      background: url("~@/assets/image/intelligentService/bottom-line.png")
        no-repeat;
      background-position: bottom;
      p {
        line-height: 30px;
        margin: 0;
        padding: 0;
      }
      p:nth-child(1) {
        font-size: 28px;
        font-weight: bold;
        color: #3b9afe;
        text-align: center;
      }
      p:nth-child(2) {
        font-size: 14px;
        font-weight: bold;
        color: #3b9afe;
        text-align: center;
      }
    }

    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    /deep/.el-table th {
      color: #fff;
      text-align: center;
      background: rgba(100, 180, 255, 0.3) !important;
    }
    /deep/.el-table__row td {
      background: rgba(46, 104, 206, 0.18) !important;
      text-align: center !important;
    }
    /deep/.el-table__body .el-table__row--striped td {
      background: rgba(6, 26, 62, 0.34) !important;
    }

    /deep/.el-table--border th,
    /deep/.el-table__fixed-right-patch {
      background: transparent !important;
    }
    /deep/.el-table .el-button {
      border: 1px solid rgba(59, 154, 254, 0.2) !important;
      background: transparent !important;
      color: #fff;
    }
  }
  .box-left .box-table {
    width: 690px;
    height: 90%;
    overflow-y: auto;
    margin-top: 95px;
    margin-left: 25px;
  }
  .box-right .box-table {
    width: 690px;
    height: 90%;
    overflow-y: auto;
    margin-top: 160px;
    margin-left: 25px;
  }
}
</style>

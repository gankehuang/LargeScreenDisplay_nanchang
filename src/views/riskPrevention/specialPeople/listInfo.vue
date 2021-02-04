<template>
  <div class="win-info">
    <div class="title">
      群体档案
    </div>
    <!-- <div class="tabs">
      <div class="tabItem">
        关注群体
      </div>
      <div class="tabItem" @click="nag()">
        禁渔禁捕
      </div>
    </div> -->
    <div class="form-page">
      <el-table
        :data="tableData"
        stripe
        max-height="240"
        style="width: 98%;height: 240px; margin: 30px auto 0;"
      >
        <el-table-column
          prop="name"
          label="群体"
        />
        <el-table-column
          prop="count"
          label="人数"
        />
        <el-table-column
          prop="key"
          label="骨干人数"
        />
        <el-table-column
          prop="activePrecent"
          label="活跃指数"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          name: '中华情',
          count: '3820',
          key: '42',
          activePrecent: '78'
        },
        {
          name: '老庆祥',
          count: '3309',
          key: '61',
          activePrecent: '32'
        },
        {
          name: '金三江',
          count: '3512',
          key: '64',
          activePrecent: '54'
        },
        {
          name: '农校委培生',
          count: '128',
          key: '24',
          activePrecent: '67'
        }
      ]
    }
  },
  methods: {
    nag () {
      this.$router.push('/riskPrevention/keyWaters')
    }
  }
}
</script>

<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 331px;
  background: url("~@/assets/image/specialPeople/left-bg1.png") no-repeat center;
  background-size: 100% 100%;
  .title {
    line-height: 40px;
    font-size: 16px;
    color: #7dbcff;
    margin-left: 10px;
    font-weight: bold;
  }
  .numbers {
    width: 420px;
    height: 660px;
  }
  .tabs {
    position: absolute;
    top: 13px;
    right: 16px;
    width: 162px;
    height: 30px;
    display: flex;
    background: url("~@/assets/image/interviewSituation/left-active.png")
      no-repeat center;
    background-size: 100% 100%;
    .tabItem {
      flex: 1;
      line-height: 30px;
      font-size: 16px;
      color: #7ebdff;
      text-align: center;
      cursor: pointer;
    }
    &.active {
      background: url("~@/assets/image/interviewSituation/right-active.png")
        no-repeat center;
    }
  }
  .header {
    background: #05438c;
    font-size: 16px;
    color: #a9daff;
    font-weight: bold;
  }
}
/deep/.el-table th {
  color: #a9daff;
  text-align: center;
  background: #05438c !important;
}
/deep/.el-table__row td {
  background: #021c3b !important;
  text-align: center !important;
  color: #a9daff;
}
/deep/.el-table__body .el-table__row--striped td {
  background: #062d5a !important;
  color: #a9daff;
}

/deep/.el-table--border th,
/deep/.el-table__fixed-right-patch {
  background: transparent !important;
}
</style>

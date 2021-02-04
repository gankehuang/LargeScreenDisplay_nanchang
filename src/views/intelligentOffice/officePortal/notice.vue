<template>
  <div class="systemConstruction">
    <div class="title">
      通知公告
    </div>
    <div class="shuaxins" />
    <div class="shuaxin">
      刷新
    </div>
    <div class="box">
      <el-scrollbar style="height:100%;width:100%;">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="box-list"
        >
          <p class="icon">
            <span />
            【最新通告】
          </p>
          <p class="name">
            {{
              item.title.length > 22
                ? item.title.substring(0, 20) + "..."
                : item.title
            }}
          </p>
          <p class="time">
            {{ item.time }}
          </p>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          title: '关于印发《2020年度市综治责任单...',
          time: '2020-10-19'
        },
        {
          title: '关于印发《2020年年度县区(开发区...',
          time: '2020-10-19'
        },
        {
          title: '南昌社会治理APP九月份运行通报...',
          time: '2020-10-13'
        },
        {
          title: '南昌社会治理APP八月份运行情况通报...',
          time: '2020-09-09'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.systemConstruction {
  position: relative;
  width: 100%;
  height: 257px;
  background: url("~@/assets/image/officePortal/left-two.png") no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 46px;
    padding-left: 24px;
  }
  .shuaxins {
    width: 30px;
    height: 25px;
    background: url("~@/assets/image/officePortal/shuaxin.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 18px;
    right: 80px;
  }
  .shuaxin {
    width: 43px;
    height: 19px;
    background-color: #02bed1;
    color: #fff;
    text-align: center;
    border-radius: 19px;
    line-height: 19px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .box {
    width: 100%;
    height: 196px;
    overflow: auto;
    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    .box-list {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 15px;
      position: relative;
      p {
        margin: 0;
        padding: 0;
        line-height: 48px;
      }
      .icon {
        display: flex;
        align-content: center;
        font-size: 18px;
        font-weight: 400;
        color: #fff;
        line-height: 18px;
        margin-right: 15px;
        span {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background-color: #fff;
          margin-left: 10px;
        }
      }
      .name {
        font-size: 18px;
        font-weight: 400;
        color: #8bbae0;
      }
      .time {
        font-size: 18px;
        font-weight: 400;
        color: #fff;
        position: absolute;
        right: 30px;
      }
    }
  }
}
</style>

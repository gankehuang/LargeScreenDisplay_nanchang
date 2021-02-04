<template>
  <div class="systemConstruction">
    <div class="title">
      待办文件
      <span>
        所有文件
      </span>
    </div>
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
          <p class="icon" />
          <p class="name">
            {{ item.title }}
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
          title: '关于进一步加强和改进全市严重精神障碍…',
          time: '2020-07-24'
        },
        {
          title: '关于请求注销部分社区综治专网的报告… ',
          time: '2020-06-11'
        },
        {
          title: ' 南昌市推进市域社会治理现代化试点工作… ',
          time: '2020-05-08'
        },
        {
          title: '南昌市推进市域社会治理现代化试点工作… ',
          time: '2020-05-08'
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
  margin-bottom: 15px;
  background: url("~@/assets/image/officePortal/left-one.png") no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 46px;
    padding-left: 24px;
    span {
      font-size: 16px;
      color: #5a88ab;
      display: inline-block;
      margin-left: 50px;
      line-height: 46px;
    }
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
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background-color: #fff;
        margin-right: 25px;
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

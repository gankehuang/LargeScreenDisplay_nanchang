<template>
  <div class="systemConstruction">
    <div class="title">
      工作动态
    </div>
    <div class="shuaxins"></div>
    <div class="shuaxin">
      刷新
    </div>
    <div class="box">
      <el-scrollbar style="height:100%;width:100%;">
        <div class="box-list" v-for="(item, index) in list" :key="index">
          <p class="icon"></p>
          <p class="name">
            {{
              item.title.length > 22
                ? item.title.substring(0, 22) + "..."
                : item.title
            }}
          </p>
          <p class="time">{{ item.time }}</p>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: '市常委市政法委书记胡晓海一行到南钢...',
          time: '11-04 20:15'
        },
        {
          title: '理小事理难事理怨事,理出一片新气象...',
          time: '11-02 15:15'
        },
        {
          title: '青山湖区一站式多元解纷”e”中心挂牌...',
          time: '10-15 20:15'
        },
        {
          title: '市工信局组织开展民法典专题宣讲活动...',
          time: '10-15 20:15'
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
    .box-list:nth-child(1) .icon,
    .box-list:nth-child(2) .icon {
      background-color: #f7cd07;
    }
  }
}
</style>

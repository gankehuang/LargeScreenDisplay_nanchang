<template>
  <div class="quickEntry">
    <div class="title">
      文件办理提醒
    </div>
    <div class="shuaxins"></div>
    <div class="shuaxin">
      刷新
    </div>
    <div class="box">
      <div class="box-list" v-for="(item, index) in list" :key="index">
        <svg-icon :icon-class="item.icon" class="icon" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          icon: 'Pending',
          title: '待办文件'
        },
        {
          icon: 'overtime',
          title: '超时文件'
        },
        {
          icon: 'Handled',
          title: '已办文件'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.quickEntry {
  position: relative;
  width: 100%;
  height: 257px;
  margin-bottom: 15px;
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
    height: 115px;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    .box-list {
      margin: 0 30px;
      width: 115px;
      height: 115px;
      background: #00225c;
      text-align: center;
      padding-top: 15px;
      p {
        font-size: 18px;
        font-weight: 400;
        color: #3b9afe;
      }
      .icon {
        width: 50px;
        height: 50px;
        color: #3b9afe;
      }
    }
    .box-list:nth-child(1),
    .box-list:nth-child(2) {
      background: url("~@/assets/image/officePortal/bg-left.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>

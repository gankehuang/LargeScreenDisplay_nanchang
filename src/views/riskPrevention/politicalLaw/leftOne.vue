<template>
  <div class="leftOne">
    <div class="title">
      舆情统计
    </div>
    <div class="con-top">
      <div class="con-top-left">
        <div class="con-top-left-num">
          94.2%
        </div>
        <div class="con-top-left-name">
          安全指数
        </div>
      </div>
      <div class="con-top-right">
        <div class="totals">
          <svg-icon
            icon-class="yuqing1"
            style="color:#17FBFF;font-size:16px"
          />
          今日预警舆情总数<span>1733</span>条
        </div>
        <div>
          <svg-icon
            icon-class="yuqing2"
            class="svg-icon"
            style="color:#3B9AFE;font-size:16px"
          />
          一般预警数<span>1721</span>条
        </div>
        <div>
          <svg-icon
            icon-class="yuqing2"
            class="svg-icon"
            style="color:#FECE3B;font-size:16px"
          />
          重点预警数<span>12</span>条
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.leftOne {
  position: relative;
  width: 420px;
  height: 240px;
  background: url("~@/assets/image/floatingPopulation/floatingPopulation-all.png")
    center center / 100% 100% no-repeat;
  padding: 80px 15px 10px 15px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
  .con-top {
    width: 350px;
    height: 130px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .con-top-left {
      width: 100px;
      height: 130px;
      .con-top-left-num {
        width: 100px;
        height: 100px;
        background: url("~@/assets/image/politicalLaw/椭圆.png") no-repeat
          center center;
        background-size: 100% 100%;
        text-align: center;
        line-height: 100px;
        font-size: 18px;
        font-weight: bold;
        color: #189aff;
        margin-bottom: 10px;
      }
      .con-top-left-name {
        font-size: 16px;
        font-weight: bold;
        color: #3497fb;
        line-height: 18px;
        text-align: center;
      }
    }
    .con-top-right {
      width: 260px;
      height: 175px;
      div {
        text-align: center;
        margin: 20px 0 40px 0;
        font-size: 16px;
        font-weight: bold;
        color: #a9daff;
        line-height: 18px;
        span {
          font-size: 16px;
          font-weight: bold;
          color: #a9daff;
          line-height: 18px;
          display: inline-block;
          margin: 0 4px 0px 10px;
        }
      }
      .totals {
        margin-bottom: 40px;
        span {
          font-size: 24px;
          font-weight: bold;
          color: #17fbff;
          line-height: 18px;
          display: inline-block;
          margin: 0 4px 0px 10px;
        }
      }
    }
  }
}
</style>
